import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '24h'
    const metric = searchParams.get('metric')

    // Calculate time range based on timeframe
    const now = new Date()
    let startDate = new Date()

    switch (timeframe) {
      case '1h':
        startDate.setHours(now.getHours() - 1)
        break
      case '24h':
        startDate.setDate(now.getDate() - 1)
        break
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      default:
        startDate.setDate(now.getDate() - 1)
    }

    // Get comprehensive system metrics
    const metrics = await calculateSystemMetrics(startDate, now)

    // If specific metric requested, return only that
    if (metric) {
      return NextResponse.json({
        success: true,
        data: metrics[metric] || null,
      })
    }

    return NextResponse.json({
      success: true,
      data: metrics,
      timeframe,
      generatedAt: now.toISOString(),
    })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { metricName, metricValue, metricUnit, metadata } = body

    // Store new metric
    const newMetric = await db.systemMetrics.create({
      data: {
        metricName,
        metricValue,
        metricUnit,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    })

    return NextResponse.json({
      success: true,
      data: newMetric,
    })
  } catch (error) {
    console.error('Error storing metric:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to store metric' },
      { status: 500 }
    )
  }
}

async function calculateSystemMetrics(startDate: Date, endDate: Date) {
  // Claims metrics
  const claimsStats = await getClaimsMetrics(startDate, endDate)
  
  // Agent performance metrics
  const agentStats = await getAgentMetrics(startDate, endDate)
  
  // Vault metrics
  const vaultStats = await getVaultMetrics(startDate, endDate)
  
  // Integration metrics
  const integrationStats = await getIntegrationMetrics()
  
  // Financial metrics
  const financialStats = await getFinancialMetrics(startDate, endDate)

  return {
    claims: claimsStats,
    agents: agentStats,
    vault: vaultStats,
    integrations: integrationStats,
    financial: financialStats,
    system: {
      uptime: 99.97, // This would come from system monitoring
      responseTime: Math.random() * 100 + 50, // Mock response time
      errorRate: Math.random() * 2, // Mock error rate
    },
  }
}

async function getClaimsMetrics(startDate: Date, endDate: Date) {
  const totalClaims = await db.claim.count({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  const claimsByStatus = await db.claim.groupBy({
    by: ['status'],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      id: true,
    },
    _sum: {
      claimAmount: true,
    },
  })

  const statusBreakdown = {}
  let totalValue = 0

  claimsByStatus.forEach((status) => {
    statusBreakdown[status.status.toLowerCase()] = {
      count: status._count.id,
      value: status._sum.claimAmount || 0,
    }
    totalValue += status._sum.claimAmount || 0
  })

  // Calculate average processing time
  const processedClaims = await db.claim.findMany({
    where: {
      processingStartTime: { not: null },
      processingEndTime: { not: null },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      processingStartTime: true,
      processingEndTime: true,
    },
  })

  const avgProcessingTime = processedClaims.length > 0
    ? processedClaims.reduce((sum, claim) => {
        const start = new Date(claim.processingStartTime!)
        const end = new Date(claim.processingEndTime!)
        return sum + (end.getTime() - start.getTime())
      }, 0) / processedClaims.length / 1000 / 60 // Convert to minutes
    : 0

  return {
    total: totalClaims,
    totalValue,
    statusBreakdown,
    avgProcessingTime: Math.round(avgProcessingTime),
    approvalRate: totalClaims > 0 ? (statusBreakdown.approved?.count || 0) / totalClaims * 100 : 0,
    rejectionRate: totalClaims > 0 ? (statusBreakdown.rejected?.count || 0) / totalClaims * 100 : 0,
  }
}

async function getAgentMetrics(startDate: Date, endDate: Date) {
  const agentAnalyses = await db.agentAnalysis.groupBy({
    by: ['agentType', 'status'],
    where: {
      startTime: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      id: true,
    },
    _avg: {
      score: true,
      confidence: true,
    },
  })

  const agentStats = {}

  agentAnalyses.forEach((analysis) => {
    if (!agentStats[analysis.agentType]) {
      agentStats[analysis.agentType] = {
        total: 0,
        completed: 0,
        failed: 0,
        avgScore: 0,
        avgConfidence: 0,
      }
    }

    agentStats[analysis.agentType].total += analysis._count.id
    agentStats[analysis.agentType][analysis.status.toLowerCase()] = analysis._count.id
    agentStats[analysis.agentType].avgScore = analysis._avg.score || 0
    agentStats[analysis.agentType].avgConfidence = analysis._avg.confidence || 0
  })

  return agentStats
}

async function getVaultMetrics(startDate: Date, endDate: Date) {
  const vaultStats = await db.digitalVault.groupBy({
    by: ['status'],
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    _count: {
      id: true,
    },
  })

  const statusBreakdown = {}
  let total = 0

  vaultStats.forEach((stat) => {
    statusBreakdown[stat.status.toLowerCase()] = stat._count.id
    total += stat._count.id
  })

  // Calculate average hold time
  const releasedClaims = await db.digitalVault.findMany({
    where: {
      status: 'RELEASED',
      releaseDate: { not: null },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      createdAt: true,
      releaseDate: true,
    },
  })

  const avgHoldTime = releasedClaims.length > 0
    ? releasedClaims.reduce((sum, vault) => {
        const created = new Date(vault.createdAt)
        const released = new Date(vault.releaseDate!)
        return sum + (released.getTime() - created.getTime())
      }, 0) / releasedClaims.length / 1000 / 60 / 60 // Convert to hours
    : 0

  return {
    total,
    statusBreakdown,
    avgHoldTime: Math.round(avgHoldTime * 10) / 10,
  }
}

async function getIntegrationMetrics() {
  const integrations = await db.integrationConnection.findMany({
    select: {
      systemName: true,
      status: true,
      lastSync: true,
    },
  })

  const activeIntegrations = integrations.filter(i => i.status === 'ACTIVE').length
  const totalIntegrations = integrations.length

  return {
    total: totalIntegrations,
    active: activeIntegrations,
    inactive: totalIntegrations - activeIntegrations,
    healthScore: totalIntegrations > 0 ? (activeIntegrations / totalIntegrations) * 100 : 0,
    systems: integrations,
  }
}

async function getFinancialMetrics(startDate: Date, endDate: Date) {
  // Calculate prevented fraud amount
  const heldAndEscalatedClaims = await db.claim.findMany({
    where: {
      status: {
        in: ['HELD', 'ESCALATED'],
      },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      claimAmount: true,
    },
  })

  const preventedFraudAmount = heldAndEscalatedClaims.reduce(
    (sum, claim) => sum + claim.claimAmount,
    0
  )

  // Calculate total processed amount
  const processedClaims = await db.claim.findMany({
    where: {
      status: {
        in: ['APPROVED', 'PAID'],
      },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      claimAmount: true,
    },
  })

  const totalProcessedAmount = processedClaims.reduce(
    (sum, claim) => sum + claim.claimAmount,
    0
  )

  return {
    totalProcessed: totalProcessedAmount,
    preventedFraud: preventedFraudAmount,
    savingsRate: totalProcessedAmount + preventedFraudAmount > 0 
      ? (preventedFraudAmount / (totalProcessedAmount + preventedFraudAmount)) * 100 
      : 0,
    avgClaimValue: processedClaims.length > 0 ? totalProcessedAmount / processedClaims.length : 0,
  }
}