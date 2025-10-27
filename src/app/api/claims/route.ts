import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const whereClause = status ? { status: status.toUpperCase() } : {}

    const claims = await db.claim.findMany({
      where: whereClause,
      include: {
        agentAnalyses: true,
        evidences: true,
        networkNodes: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    })

    const total = await db.claim.count({ where: whereClause })

    return NextResponse.json({
      success: true,
      data: claims,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    })
  } catch (error) {
    console.error('Error fetching claims:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch claims' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      claimId,
      memberId,
      providerId,
      payerId,
      claimAmount,
      submissionDate,
      serviceDate,
    } = body

    // Create new claim
    const claim = await db.claim.create({
      data: {
        claimId,
        memberId,
        providerId,
        payerId,
        claimAmount,
        submissionDate: new Date(submissionDate),
        serviceDate: new Date(serviceDate),
        processingStartTime: new Date(),
      },
    })

    // Create Digital Vault entry
    const vaultEntry = await db.digitalVault.create({
      data: {
        vaultId: `VAULT-${claimId}`,
        claimId: claim.id,
        encryptedData: JSON.stringify(body), // In production, this would be encrypted
        dataHash: `hash-${claimId}`, // In production, this would be a real hash
        createdBy: 'system',
      },
    })

    // Update claim with vault reference
    await db.claim.update({
      where: { id: claim.id },
      data: { digitalVaultId: vaultEntry.id },
    })

    // Trigger agent analyses (in a real system, this would be queued)
    await triggerAgentAnalyses(claim.id)

    return NextResponse.json({
      success: true,
      data: {
        claim,
        vaultEntry,
      },
    })
  } catch (error) {
    console.error('Error creating claim:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create claim' },
      { status: 500 }
    )
  }
}

async function triggerAgentAnalyses(claimId: string) {
  const agentTypes = [
    'MEMBER_IDENTITY',
    'CLINICAL_NECESSITY',
    'PROVIDER_BEHAVIOR',
    'PHARMACY_RX',
    'NETWORK_GRAPH',
    'FINANCIAL_LEAKAGE',
  ]

  for (const agentType of agentTypes) {
    await db.agentAnalysis.create({
      data: {
        claimId,
        agentType,
        agentName: `${agentType.replace('_', ' ')} Agent`,
        status: 'PENDING',
      },
    })
  }
}