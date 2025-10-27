'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database,
  Bot,
  Network,
  TrendingUp,
  Eye,
  Building,
  FileText,
  BarChart3,
  Zap,
  Lock,
  Users,
  Globe
} from 'lucide-react'

interface SystemMetrics {
  totalClaims: number
  processingClaims: number
  approvedClaims: number
  heldClaims: number
  escalatedClaims: number
  rejectedClaims: number
  totalSavings: number
  riskScore: number
  systemUptime: number
}

interface AgentStatus {
  name: string
  status: string
  claimsProcessed: number
  accuracy: number
}

interface IntegrationStatus {
  name: string
  status: string
  lastSync: string
}

interface RecentClaim {
  id: string
  amount: number
  status: string
  riskScore: number
  provider: string
}

export default function SystemOverview() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    totalClaims: 1247,
    processingClaims: 89,
    approvedClaims: 856,
    heldClaims: 45,
    escalatedClaims: 12,
    rejectedClaims: 31,
    totalSavings: 2847500,
    riskScore: 3.2,
    systemUptime: 99.97
  })

  const [agentStatus, setAgentStatus] = useState<AgentStatus[]>([
    { name: 'Member & Identity Agent', status: 'active', claimsProcessed: 423, accuracy: 98.2 },
    { name: 'Clinical Necessity Agent', status: 'active', claimsProcessed: 389, accuracy: 96.8 },
    { name: 'Provider Behavior Agent', status: 'active', claimsProcessed: 401, accuracy: 94.5 },
    { name: 'Pharmacy & Rx Agent', status: 'active', claimsProcessed: 367, accuracy: 97.1 },
    { name: 'Network Graph Agent', status: 'processing', claimsProcessed: 298, accuracy: 92.3 },
    { name: 'Financial & Leakage Agent', status: 'active', claimsProcessed: 445, accuracy: 95.7 }
  ])

  const [integrationStatus, setIntegrationStatus] = useState<IntegrationStatus[]>([
    { name: 'Shafafiya (Abu Dhabi)', status: 'connected', lastSync: '2 min ago' },
    { name: 'DHPO/eClaimLink (Dubai)', status: 'connected', lastSync: '1 min ago' },
    { name: 'Malaffi (Abu Dhabi HIE)', status: 'connected', lastSync: '3 min ago' },
    { name: 'NABIDH (Dubai)', status: 'connected', lastSync: '2 min ago' },
    { name: 'Riayati (Federal)', status: 'connected', lastSync: '4 min ago' },
    { name: 'DHA/DoH/MOHAP APIs', status: 'connected', lastSync: '1 min ago' }
  ])

  const [recentClaims, setRecentClaims] = useState<RecentClaim[]>([
    { id: 'CLM-2024-0892', amount: 1250, status: 'approved', riskScore: 1.2, provider: 'Dubai Medical Center' },
    { id: 'CLM-2024-0891', amount: 3400, status: 'held', riskScore: 7.8, provider: 'Abu Dhabi Pharmacy' },
    { id: 'CLM-2024-0890', amount: 890, status: 'processing', riskScore: 3.1, provider: 'Al Ain Hospital' },
    { id: 'CLM-2024-0889', amount: 2100, status: 'escalated', riskScore: 8.9, provider: 'Sharjah Clinic' },
    { id: 'CLM-2024-0888', amount: 560, status: 'approved', riskScore: 0.8, provider: 'Fujairah Medical' }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500'
      case 'held': return 'bg-yellow-500'
      case 'processing': return 'bg-blue-500'
      case 'escalated': return 'bg-red-500'
      case 'rejected': return 'bg-gray-500'
      case 'active': return 'bg-green-500'
      case 'connected': return 'bg-green-500'
      default: return 'bg-gray-400'
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 3) return 'text-green-600'
    if (score < 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getRiskBgColor = (score: number) => {
    if (score < 3) return 'bg-green-100 text-green-800'
    if (score < 6) return 'bg-yellow-100 text-yellow-800'
    return 'bg-red-100 text-red-800'
  }

  return (
    <div className="space-y-6">
      {/* System Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Overview</h2>
          <p className="text-slate-600">Real-time monitoring of HIIS-UAE integrity operations</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-3 h-3 mr-1" />
            System Active
          </Badge>
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            Uptime: {systemMetrics.systemUptime}%
          </Badge>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claims Processed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalClaims.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fraud Prevention</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">AED {systemMetrics.totalSavings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">3.2% of total value</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Score</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getRiskColor(systemMetrics.riskScore)}`}>
              {systemMetrics.riskScore}/10
            </div>
            <p className="text-xs text-muted-foreground">System-wide average</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Queue</CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemMetrics.processingClaims}</div>
            <p className="text-xs text-muted-foreground">Claims in verification</p>
          </CardContent>
        </Card>
      </div>

      {/* System Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Multi-Agent System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-600" />
              Multi-Agent System
            </CardTitle>
            <CardDescription>AI-powered verification agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {agentStatus.slice(0, 3).map((agent, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                  <span className="text-sm font-medium">{agent.name.split(' ')[0]}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-600">{agent.accuracy}%</div>
                  <div className="text-xs text-muted-foreground">{agent.claimsProcessed}</div>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              View All Agents
            </Button>
          </CardContent>
        </Card>

        {/* Integration Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-600" />
              Data Integrations
            </CardTitle>
            <CardDescription>UAE health systems connectivity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {integrationStatus.slice(0, 3).map((integration, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(integration.status)}`} />
                  <span className="text-sm font-medium">{integration.name.split(' ')[0]}</span>
                </div>
                <div className="text-xs text-muted-foreground">{integration.lastSync}</div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full">
              Manage Integrations
            </Button>
          </CardContent>
        </Card>

        {/* Digital Vault */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              Digital Vault
            </CardTitle>
            <CardDescription>Pre-payment claim holding</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-yellow-50 rounded">
                <div className="text-lg font-bold text-yellow-800">{systemMetrics.heldClaims}</div>
                <div className="text-xs text-yellow-600">Held</div>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <div className="text-lg font-bold text-green-800">127</div>
                <div className="text-xs text-green-600">Released</div>
              </div>
              <div className="p-2 bg-red-50 rounded">
                <div className="text-lg font-bold text-red-800">{systemMetrics.escalatedClaims}</div>
                <div className="text-xs text-red-600">Escalated</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              View Vault Details
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Recent Claim Activity
          </CardTitle>
          <CardDescription>Latest claim processing results and risk assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentClaims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(claim.status)}`} />
                  <div>
                    <div className="font-medium">{claim.id}</div>
                    <div className="text-sm text-muted-foreground">{claim.provider}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">AED {claim.amount.toLocaleString()}</div>
                    <div className={`text-xs ${getRiskColor(claim.riskScore)}`}>
                      Risk: {claim.riskScore}/10
                    </div>
                  </div>
                  <Badge className={getRiskBgColor(claim.riskScore)}>
                    {claim.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Response Time</span>
                <span className="text-green-600">124ms</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Agent Processing Speed</span>
                <span className="text-green-600">2.3s/claim</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database Performance</span>
                <span className="text-green-600">98.5%</span>
              </div>
              <Progress value={98.5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Compliance Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border rounded">
                <div className="text-lg font-bold text-green-600">DHA</div>
                <div className="text-xs text-muted-foreground">Compliant</div>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-lg font-bold text-green-600">DoH</div>
                <div className="text-xs text-muted-foreground">Compliant</div>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-lg font-bold text-green-600">MOHAP</div>
                <div className="text-xs text-muted-foreground">Compliant</div>
              </div>
              <div className="text-center p-3 border rounded">
                <div className="text-lg font-bold text-green-600">Data Law</div>
                <div className="text-xs text-muted-foreground">45/2021</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}