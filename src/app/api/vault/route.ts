import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const whereClause = status ? { status: status.toUpperCase() } : {}

    const vaultEntries = await db.digitalVault.findMany({
      where: whereClause,
      include: {
        claim: {
          select: {
            claimId: true,
            memberId: true,
            providerId: true,
            claimAmount: true,
            status: true,
            riskScore: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    })

    const total = await db.digitalVault.count({ where: whereClause })

    // Calculate vault statistics
    const stats = await calculateVaultStats()

    return NextResponse.json({
      success: true,
      data: vaultEntries,
      stats,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching vault entries:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vault entries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { vaultId, action, claimId, reason } = body

    if (action === 'release') {
      // Release claim from vault
      const vaultEntry = await db.digitalVault.update({
        where: { vaultId },
        data: {
          status: 'RELEASED',
          releaseDate: new Date(),
          holdReason: null,
        },
      })

      // Update claim status
      await db.claim.update({
        where: { id: claimId },
        data: {
          status: 'APPROVED',
          decision: 'APPROVE',
          processingEndTime: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        data: vaultEntry,
        message: 'Claim released from vault and approved',
      })
    }

    if (action === 'escalate') {
      // Escalate claim for investigation
      const vaultEntry = await db.digitalVault.update({
        where: { vaultId },
        data: {
          status: 'ESCALATED',
          holdReason: reason || 'Escalated for SIU investigation',
        },
      })

      // Update claim status
      await db.claim.update({
        where: { id: claimId },
        data: {
          status: 'ESCALATED',
          decision: 'ESCALATE',
          processingEndTime: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        data: vaultEntry,
        message: 'Claim escalated for investigation',
      })
    }

    if (action === 'reject') {
      // Reject claim
      const vaultEntry = await db.digitalVault.update({
        where: { vaultId },
        data: {
          status: 'REJECTED',
          holdReason: reason || 'Claim rejected',
        },
      })

      // Update claim status
      await db.claim.update({
        where: { id: claimId },
        data: {
          status: 'REJECTED',
          decision: 'REJECT',
          processingEndTime: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        data: vaultEntry,
        message: 'Claim rejected',
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error updating vault entry:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update vault entry' },
      { status: 500 }
    )
  }
}

async function calculateVaultStats() {
  const stats = await db.digitalVault.groupBy({
    by: ['status'],
    _count: {
      id: true,
    },
  })

  const result = {
    total: 0,
    held: 0,
    released: 0,
    escalated: 0,
    rejected: 0,
  }

  stats.forEach((stat) => {
    result.total += stat._count.id
    result[stat.status.toLowerCase()] = stat._count.id
  })

  // Calculate total value of held claims
  const heldClaimsValue = await db.digitalVault.findMany({
    where: { status: 'HELD' },
    include: {
      claim: {
        select: { claimAmount: true },
      },
    },
  })

  const totalHeldValue = heldClaimsValue.reduce(
    (sum, vault) => sum + (vault.claim?.claimAmount || 0),
    0
  )

  return {
    ...result,
    totalHeldValue,
    averageHeldValue: heldClaimsValue.length > 0 ? totalHeldValue / heldClaimsValue.length : 0,
  }
}