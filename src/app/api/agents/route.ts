import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const claimId = searchParams.get('claimId')

    const whereClause: any = {}
    if (status) whereClause.status = status.toUpperCase()
    if (claimId) whereClause.claimId = claimId

    const agents = await db.agentAnalysis.findMany({
      where: whereClause,
      include: {
        claim: {
          select: {
            claimId: true,
            status: true,
            riskScore: true,
          },
        },
      },
      orderBy: { startTime: 'desc' },
    })

    // Calculate agent statistics
    const stats = await calculateAgentStats()

    return NextResponse.json({
      success: true,
      data: agents,
      stats,
    })
  } catch (error) {
    console.error('Error fetching agents:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentId, action, parameters } = body

    if (action === 'process') {
      // Trigger agent processing using AI
      const result = await processAgentWithAI(agentId, parameters)
      
      return NextResponse.json({
        success: true,
        data: result,
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error processing agent:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process agent' },
      { status: 500 }
    )
  }
}

async function calculateAgentStats() {
  const agents = await db.agentAnalysis.groupBy({
    by: ['agentType', 'status'],
    _count: {
      id: true,
    },
  })

  const stats = {}
  
  agents.forEach((agent) => {
    if (!stats[agent.agentType]) {
      stats[agent.agentType] = {
        total: 0,
        completed: 0,
        pending: 0,
        processing: 0,
        failed: 0,
        accuracy: 0,
      }
    }
    
    stats[agent.agentType].total += agent._count.id
    stats[agent.agentType][agent.status.toLowerCase()] = agent._count.id
  })

  // Calculate accuracy for completed agents
  for (const agentType in stats) {
    const completed = await db.agentAnalysis.findMany({
      where: {
        agentType,
        status: 'COMPLETED',
      },
      select: { score: true },
    })

    if (completed.length > 0) {
      const avgScore = completed.reduce((sum, agent) => sum + (agent.score || 0), 0) / completed.length
      stats[agentType].accuracy = Math.round(avgScore * 100) / 100
    }
  }

  return stats
}

async function processAgentWithAI(agentId: string, parameters: any) {
  try {
    // Get agent analysis record
    const agentAnalysis = await db.agentAnalysis.findUnique({
      where: { id: agentId },
      include: {
        claim: true,
      },
    })

    if (!agentAnalysis) {
      throw new Error('Agent analysis not found')
    }

    // Update status to processing
    await db.agentAnalysis.update({
      where: { id: agentId },
      data: { status: 'PROCESSING' },
    })

    // Initialize ZAI SDK
    const zai = await ZAI.create()

    // Create agent-specific prompt
    const prompt = createAgentPrompt(agentAnalysis.agentType, agentAnalysis.claim, parameters)

    // Process with AI
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a specialized AI agent for the UAE Health Integrity Intelligence System (HIIS-UAE). 
          Your role is to analyze health insurance claims for fraud detection and compliance verification.
          Provide detailed analysis with risk scores and specific recommendations.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 1000,
    })

    const aiResult = completion.choices[0]?.message?.content

    if (!aiResult) {
      throw new Error('AI processing failed')
    }

    // Parse AI result and extract score and confidence
    const { score, confidence, result, details } = parseAIResult(aiResult)

    // Update agent analysis with results
    const updatedAgent = await db.agentAnalysis.update({
      where: { id: agentId },
      data: {
        status: 'COMPLETED',
        score,
        confidence,
        result,
        details: JSON.stringify(details),
        endTime: new Date(),
      },
    })

    // Create evidence record
    await db.evidence.create({
      data: {
        claimId: agentAnalysis.claimId,
        evidenceType: mapAgentToEvidenceType(agentAnalysis.agentType),
        description: `${agentAnalysis.agentName} analysis completed`,
        data: JSON.stringify({
          agentId,
          score,
          confidence,
          result,
          details,
        }),
        createdBy: 'system',
      },
    })

    return updatedAgent
  } catch (error) {
    console.error('AI processing error:', error)
    
    // Update agent status to failed
    await db.agentAnalysis.update({
      where: { id: agentId },
      data: {
        status: 'FAILED',
        endTime: new Date(),
      },
    })

    throw error
  }
}

function createAgentPrompt(agentType: string, claim: any, parameters: any) {
  const basePrompt = `
    Analyze the following health insurance claim for ${agentType.replace('_', ' ').toLowerCase()} verification:
    
    Claim Details:
    - Claim ID: ${claim.claimId}
    - Member ID: ${claim.memberId}
    - Provider ID: ${claim.providerId}
    - Payer ID: ${claim.payerId}
    - Claim Amount: AED ${claim.claimAmount}
    - Service Date: ${claim.serviceDate}
    - Submission Date: ${claim.submissionDate}
    
    Additional Parameters: ${JSON.stringify(parameters)}
    
    Please provide:
    1. Risk score (0-10, where 10 is highest risk)
    2. Confidence level (0-100%)
    3. Analysis result (APPROVE/HOLD/ESCALATE/REJECT)
    4. Detailed explanation and any red flags identified
    
    Format your response as JSON:
    {
      "score": <number>,
      "confidence": <number>,
      "result": "<string>",
      "details": {
        "analysis": "<string>",
        "riskFactors": ["<string>"],
        "recommendations": ["<string>"]
      }
    }
  `

  // Add agent-specific context
  switch (agentType) {
    case 'MEMBER_IDENTITY':
      return basePrompt + `
        Focus on:
        - Member identity verification
        - Eligibility validation
        - Sponsor linkage verification
        - Benefit limits compliance
        - Detection of ghost patients or card misuse
      `
    
    case 'CLINICAL_NECESSITY':
      return basePrompt + `
        Focus on:
        - Diagnosis-procedure coherence
        - Medical necessity validation
        - Historical clinical data analysis
        - Upcoding and unbundling detection
        - Compliance with DHA/DoH guidelines
      `
    
    case 'PROVIDER_BEHAVIOR':
      return basePrompt + `
        Focus on:
        - Provider risk scoring
        - Peer benchmarking analysis
        - Regulatory history review
        - Behavioral deviation detection
        - Practice pattern analysis
      `
    
    case 'PHARMACY_RX':
      return basePrompt + `
        Focus on:
        - Formulary compliance
        - Prescription validation
        - Controlled substance rules
        - Prescriber-pharmacy linkages
        - e-prescription data verification
      `
    
    case 'NETWORK_GRAPH':
      return basePrompt + `
        Focus on:
        - Referral circle detection
        - Ownership collusion analysis
        - Network relationship mapping
        - Unusual pattern identification
        - Cluster analysis
      `
    
    case 'FINANCIAL_LEAKAGE':
      return basePrompt + `
        Focus on:
        - Pre-payment scoring
        - Financial anomaly detection
        - Cost pattern analysis
        - Billing irregularities
        - Payment optimization recommendations
      `
    
    default:
      return basePrompt
  }
}

function parseAIResult(aiResult: string) {
  try {
    const parsed = JSON.parse(aiResult)
    return {
      score: parsed.score || 0,
      confidence: parsed.confidence || 0,
      result: parsed.result || 'HOLD',
      details: parsed.details || {},
    }
  } catch (error) {
    // Fallback parsing if JSON is malformed
    return {
      score: 5,
      confidence: 50,
      result: 'HOLD',
      details: {
        analysis: aiResult,
        riskFactors: ['Unable to parse AI response'],
        recommendations: ['Manual review required'],
      },
    }
  }
}

function mapAgentToEvidenceType(agentType: string): string {
  const mapping = {
    'MEMBER_IDENTITY': 'IDENTITY_VERIFICATION',
    'CLINICAL_NECESSITY': 'CLINICAL_RECORD',
    'PROVIDER_BEHAVIOR': 'PROVIDER_HISTORY',
    'PHARMACY_RX': 'FORMULARY_CHECK',
    'NETWORK_GRAPH': 'NETWORK_ANALYSIS',
    'FINANCIAL_LEAKAGE': 'FINANCIAL_ANALYSIS',
  }
  
  return mapping[agentType] || 'REGULATORY_ALERT'
}