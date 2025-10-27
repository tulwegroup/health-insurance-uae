import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const regulator = searchParams.get('regulator')
    const reportType = searchParams.get('reportType')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Generate regulator-specific reports
    const reports = await generateRegulatorReports(regulator, reportType, startDate, endDate)

    return NextResponse.json({
      success: true,
      data: reports,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error generating regulator reports:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate reports' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { regulator, reportType, parameters, format } = body

    // Generate comprehensive report using AI
    const report = await generateComprehensiveReport(regulator, reportType, parameters)

    // Create evidence package
    const evidencePackage = await createEvidencePackage(report, regulator)

    return NextResponse.json({
      success: true,
      data: {
        report,
        evidencePackage,
        downloadUrl: `/api/regulators/download/${evidencePackage.id}`,
      },
    })
  } catch (error) {
    console.error('Error creating regulator report:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create report' },
      { status: 500 }
    )
  }
}

async function generateRegulatorReports(regulator?: string, reportType?: string, startDate?: string, endDate?: string) {
  const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const end = endDate ? new Date(endDate) : new Date()

  const regulators = regulator ? [regulator] : ['DHA', 'DOH', 'MOHAP']
  const reports = {}

  for (const reg of regulators) {
    reports[reg] = await generateRegulatorSpecificReport(reg, start, end, reportType)
  }

  return reports
}

async function generateRegulatorSpecificReport(regulator: string, startDate: Date, endDate: Date, reportType?: string) {
  // Get claims data for the period
  const claimsData = await getClaimsDataForRegulator(regulator, startDate, endDate)
  
  // Get agent analyses
  const agentData = await getAgentDataForRegulator(regulator, startDate, endDate)
  
  // Get financial data
  const financialData = await getFinancialDataForRegulator(regulator, startDate, endDate)

  const baseReport = {
    regulator,
    period: {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    },
    summary: {
      totalClaims: claimsData.total,
      approvedClaims: claimsData.approved,
      heldClaims: claimsData.held,
      escalatedClaims: claimsData.escalated,
      rejectedClaims: claimsData.rejected,
      totalValue: claimsData.totalValue,
      preventedFraud: financialData.preventedFraud,
      savingsRate: financialData.savingsRate,
    },
    agentPerformance: agentData,
    complianceMetrics: await getComplianceMetrics(regulator, startDate, endDate),
    evidencePackages: await getEvidencePackageCount(regulator, startDate, endDate),
  }

  // Add regulator-specific sections
  switch (regulator) {
    case 'DHA':
      return {
        ...baseReport,
        dubaiSpecific: {
          eClaimLinkMetrics: await getEClaimLinkMetrics(startDate, endDate),
          dubaiProviderCompliance: await getDubaiProviderCompliance(startDate, endDate),
          dubaiAuditDirectives: await getDubaiAuditDirectives(startDate, endDate),
        },
      }
    
    case 'DOH':
      return {
        ...baseReport,
        abuDhabiSpecific: {
          shafafiyaMetrics: await getShafafiyaMetrics(startDate, endDate),
          malaffiIntegration: await getMalaffiIntegrationMetrics(startDate, endDate),
          abuDhabiProviderCompliance: await getAbuDhabiProviderCompliance(startDate, endDate),
        },
      }
    
    case 'MOHAP':
      return {
        ...baseReport,
        federalSpecific: {
          riayatiMetrics: await getRiayatiMetrics(startDate, endDate),
          federalCompliance: await getFederalComplianceMetrics(startDate, endDate),
          northernEmiratesData: await getNorthernEmiratesData(startDate, endDate),
        },
      }
    
    default:
      return baseReport
  }
}

async function getClaimsDataForRegulator(regulator: string, startDate: Date, endDate: Date) {
  // In a real system, this would filter by regulator jurisdiction
  const claims = await db.claim.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      status: true,
      claimAmount: true,
    },
  })

  const total = claims.length
  const approved = claims.filter(c => c.status === 'APPROVED').length
  const held = claims.filter(c => c.status === 'HELD').length
  const escalated = claims.filter(c => c.status === 'ESCALATED').length
  const rejected = claims.filter(c => c.status === 'REJECTED').length
  const totalValue = claims.reduce((sum, c) => sum + c.claimAmount, 0)

  return {
    total,
    approved,
    held,
    escalated,
    rejected,
    totalValue,
  }
}

async function getAgentDataForRegulator(regulator: string, startDate: Date, endDate: Date) {
  const agentAnalyses = await db.agentAnalysis.findMany({
    where: {
      startTime: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      agentType: true,
      status: true,
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
        avgScore: 0,
        avgConfidence: 0,
        highRiskCount: 0,
      }
    }

    agentStats[analysis.agentType].total++
    if (analysis.status === 'COMPLETED') {
      agentStats[analysis.agentType].completed++
      agentStats[analysis.agentType].avgScore += analysis.score || 0
      agentStats[analysis.agentType].avgConfidence += analysis.confidence || 0
      
      if (analysis.score > 7) {
        agentStats[analysis.agentType].highRiskCount++
      }
    }
  })

  // Calculate averages
  Object.keys(agentStats).forEach((agentType) => {
    const stats = agentStats[agentType]
    if (stats.completed > 0) {
      stats.avgScore = Math.round((stats.avgScore / stats.completed) * 100) / 100
      stats.avgConfidence = Math.round((stats.avgConfidence / stats.completed) * 100) / 100
    }
  })

  return agentStats
}

async function getFinancialDataForRegulator(regulator: string, startDate: Date, endDate: Date) {
  const heldClaims = await db.claim.findMany({
    where: {
      status: 'HELD',
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      claimAmount: true,
    },
  })

  const preventedFraud = heldClaims.reduce((sum, claim) => sum + claim.claimAmount, 0)
  
  const totalClaims = await db.claim.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      claimAmount: true,
    },
  })

  const totalValue = totalClaims.reduce((sum, claim) => sum + claim.claimAmount, 0)
  const savingsRate = totalValue > 0 ? (preventedFraud / totalValue) * 100 : 0

  return {
    preventedFraud,
    totalValue,
    savingsRate: Math.round(savingsRate * 100) / 100,
  }
}

async function getComplianceMetrics(regulator: string, startDate: Date, endDate: Date) {
  // Mock compliance metrics
  const complianceData = {
    'DHA': {
      auditDirectiveCompliance: 94.5,
      dataQualityScore: 96.2,
      responseTimeCompliance: 98.1,
      documentationCompleteness: 92.8,
    },
    'DOH': {
      auditDirectiveCompliance: 93.8,
      dataQualityScore: 95.6,
      responseTimeCompliance: 97.4,
      documentationCompleteness: 93.2,
    },
    'MOHAP': {
      auditDirectiveCompliance: 92.1,
      dataQualityScore: 94.3,
      responseTimeCompliance: 96.8,
      documentationCompleteness: 91.7,
    },
  }

  return complianceData[regulator] || complianceData['DHA']
}

async function getEvidencePackageCount(regulator: string, startDate: Date, endDate: Date) {
  const count = await db.evidence.count({
    where: {
      timestamp: {
        gte: startDate,
        lte: endDate,
      },
    },
  })

  return {
    total: count,
    readyForExport: Math.floor(count * 0.8), // 80% ready for export
    exported: Math.floor(count * 0.6), // 60% already exported
  }
}

async function generateComprehensiveReport(regulator: string, reportType: string, parameters: any) {
  try {
    const zai = await ZAI.create()

    const prompt = `
      Generate a comprehensive ${reportType} report for the ${regulator} regulator.
      
      Parameters: ${JSON.stringify(parameters)}
      
      The report should include:
      1. Executive Summary
      2. Key Metrics and KPIs
      3. Fraud Detection Analysis
      4. Compliance Assessment
      5. Recommendations
      6. Action Items
      
      Format the report in a professional structure suitable for regulatory submission.
    `

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert healthcare compliance analyst generating reports for UAE health regulators.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    })

    return {
      content: completion.choices[0]?.message?.content || 'Report generation failed',
      metadata: {
        regulator,
        reportType,
        generatedAt: new Date().toISOString(),
        parameters,
      },
    }
  } catch (error) {
    console.error('AI report generation error:', error)
    throw error
  }
}

async function createEvidencePackage(report: any, regulator: string) {
  // Create evidence package record
  const evidencePackage = await db.evidence.create({
    data: {
      claimId: 'system-report', // Special ID for system reports
      evidenceType: 'REGULATORY_ALERT',
      description: `${regulator} Regulatory Report - ${report.metadata.reportType}`,
      data: JSON.stringify(report),
      createdBy: 'system',
    },
  })

  return evidencePackage
}

// Mock functions for regulator-specific metrics
async function getEClaimLinkMetrics(startDate: Date, endDate: Date) {
  return {
    totalTransactions: 1247,
    successfulTransactions: 1198,
    errorRate: 3.9,
    avgResponseTime: 245,
  }
}

async function getDubaiProviderCompliance(startDate: Date, endDate: Date) {
  return {
    totalProviders: 234,
    compliantProviders: 218,
    complianceRate: 93.2,
    violations: 16,
  }
}

async function getDubaiAuditDirectives(startDate: Date, endDate: Date) {
  return {
    activeDirectives: 12,
    compliedDirectives: 11,
    pendingDirectives: 1,
    complianceRate: 91.7,
  }
}

async function getShafafiyaMetrics(startDate: Date, endDate: Date) {
  return {
    totalTransactions: 1876,
    successfulTransactions: 1823,
    errorRate: 2.8,
    avgResponseTime: 198,
  }
}

async function getMalaffiIntegrationMetrics(startDate: Date, endDate: Date) {
  return {
    totalQueries: 892,
    successfulQueries: 867,
    errorRate: 2.8,
    avgResponseTime: 156,
  }
}

async function getAbuDhabiProviderCompliance(startDate: Date, endDate: Date) {
  return {
    totalProviders: 189,
    compliantProviders: 178,
    complianceRate: 94.2,
    violations: 11,
  }
}

async function getRiayatiMetrics(startDate: Date, endDate: Date) {
  return {
    totalTransactions: 567,
    successfulTransactions: 543,
    errorRate: 4.2,
    avgResponseTime: 287,
  }
}

async function getFederalComplianceMetrics(startDate: Date, endDate: Date) {
  return {
    totalProviders: 145,
    compliantProviders: 132,
    complianceRate: 91.0,
    violations: 13,
  }
}

async function getNorthernEmiratesData(startDate: Date, endDate: Date) {
  return {
    totalClaims: 234,
    totalValue: 145000,
    fraudDetection: 8,
    complianceRate: 89.4,
  }
}