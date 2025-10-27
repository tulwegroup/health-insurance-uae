import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

export async function GET(request: NextRequest) {
  try {
    const integrations = await db.integrationConnection.findMany({
      orderBy: { systemName: 'asc' },
    })

    // Get connection health status
    const healthStatus = await checkIntegrationHealth(integrations)

    return NextResponse.json({
      success: true,
      data: integrations,
      health: healthStatus,
    })
  } catch (error) {
    console.error('Error fetching integrations:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch integrations' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { systemName, endpoint, apiKey, config, action } = body

    if (action === 'test-connection') {
      // Test connection to the integration system
      const testResult = await testIntegrationConnection(systemName, endpoint, apiKey)
      
      return NextResponse.json({
        success: true,
        data: testResult,
      })
    }

    if (action === 'sync') {
      // Trigger data synchronization
      const syncResult = await triggerDataSync(systemName)
      
      return NextResponse.json({
        success: true,
        data: syncResult,
      })
    }

    // Create new integration
    const newIntegration = await db.integrationConnection.create({
      data: {
        systemName,
        endpoint,
        apiKey,
        config: config ? JSON.stringify(config) : null,
        status: 'ACTIVE',
        lastSync: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      data: newIntegration,
    })
  } catch (error) {
    console.error('Error managing integration:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to manage integration' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    const updatedIntegration = await db.integrationConnection.update({
      where: { id },
      data: {
        ...updateData,
        config: updateData.config ? JSON.stringify(updateData.config) : undefined,
        lastSync: updateData.status === 'ACTIVE' ? new Date() : undefined,
      },
    })

    return NextResponse.json({
      success: true,
      data: updatedIntegration,
    })
  } catch (error) {
    console.error('Error updating integration:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update integration' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Integration ID required' },
        { status: 400 }
      )
    }

    await db.integrationConnection.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Integration deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting integration:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete integration' },
      { status: 500 }
    )
  }
}

async function checkIntegrationHealth(integrations: any[]) {
  const healthStatus = {}

  for (const integration of integrations) {
    try {
      // Simulate health check (in production, this would be actual API calls)
      const isHealthy = await simulateHealthCheck(integration.systemName)
      
      healthStatus[integration.systemName] = {
        status: isHealthy ? 'HEALTHY' : 'UNHEALTHY',
        lastCheck: new Date().toISOString(),
        responseTime: Math.random() * 500 + 50, // Mock response time
        error: isHealthy ? null : 'Connection timeout',
      }
    } catch (error) {
      healthStatus[integration.systemName] = {
        status: 'ERROR',
        lastCheck: new Date().toISOString(),
        responseTime: null,
        error: error.message,
      }
    }
  }

  return healthStatus
}

async function simulateHealthCheck(systemName: string): Promise<boolean> {
  // Simulate different health scenarios for different systems
  const healthProbability = {
    'SHAFAFIYA': 0.95,
    'DHPO_ECLAIMLINK': 0.92,
    'MALAFFI': 0.88,
    'NABIDH': 0.90,
    'RIAYATI': 0.85,
    'DHA_API': 0.93,
    'DOH_API': 0.94,
    'MOHAP_API': 0.87,
    'AMER': 0.91,
    'ICA': 0.89,
    'PBM_SYSTEMS': 0.86,
  }

  const probability = healthProbability[systemName] || 0.8
  return Math.random() < probability
}

async function testIntegrationConnection(systemName: string, endpoint: string, apiKey: string) {
  try {
    // Simulate connection test
    const responseTime = Math.random() * 1000 + 100
    const isSuccess = responseTime < 2000

    // In production, this would make actual API calls
    await new Promise(resolve => setTimeout(resolve, 100))

    return {
      success: isSuccess,
      responseTime,
      message: isSuccess 
        ? 'Connection successful' 
        : 'Connection failed - timeout',
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      responseTime: null,
      message: `Connection failed: ${error.message}`,
      timestamp: new Date().toISOString(),
    }
  }
}

async function triggerDataSync(systemName: string) {
  try {
    // Simulate data synchronization
    const syncResults = {
      'SHAFAFIYA': { recordsProcessed: 1247, newRecords: 89, updatedRecords: 156 },
      'DHPO_ECLAIMLINK': { recordsProcessed: 892, newRecords: 67, updatedRecords: 123 },
      'MALAFFI': { recordsProcessed: 2156, newRecords: 234, updatedRecords: 445 },
      'NABIDH': { recordsProcessed: 1876, newRecords: 198, updatedRecords: 367 },
      'RIAYATI': { recordsProcessed: 934, newRecords: 45, updatedRecords: 89 },
      'DHA_API': { recordsProcessed: 567, newRecords: 34, updatedRecords: 78 },
      'DOH_API': { recordsProcessed: 789, newRecords: 56, updatedRecords: 123 },
      'MOHAP_API': { recordsProcessed: 445, newRecords: 23, updatedRecords: 67 },
      'AMER': { recordsProcessed: 1234, newRecords: 145, updatedRecords: 234 },
      'ICA': { recordsProcessed: 1567, newRecords: 178, updatedRecords: 289 },
      'PBM_SYSTEMS': { recordsProcessed: 2345, newRecords: 267, updatedRecords: 456 },
    }

    const result = syncResults[systemName] || { 
      recordsProcessed: 0, 
      newRecords: 0, 
      updatedRecords: 0 
    }

    // Update integration with new sync timestamp
    await db.integrationConnection.updateMany({
      where: { systemName },
      data: { lastSync: new Date() },
    })

    return {
      success: true,
      syncResult: result,
      duration: Math.random() * 30 + 10, // Mock sync duration in seconds
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }
  }
}