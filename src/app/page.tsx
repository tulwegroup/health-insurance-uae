'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Building, 
  Pill,
  Network,
  TrendingUp,
  Eye,
  Database,
  Bot,
  FileText,
  BarChart3
} from 'lucide-react'

export default function HIISDashboard() {
  const [systemMetrics, setSystemMetrics] = useState({
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

  const [agentStatus, setAgentStatus] = useState([
    { name: 'Member & Identity Agent', status: 'active', claimsProcessed: 423, accuracy: 98.2 },
    { name: 'Clinical Necessity Agent', status: 'active', claimsProcessed: 389, accuracy: 96.8 },
    { name: 'Provider Behavior Agent', status: 'active', claimsProcessed: 401, accuracy: 94.5 },
    { name: 'Pharmacy & Rx Agent', status: 'active', claimsProcessed: 367, accuracy: 97.1 },
    { name: 'Network Graph Agent', status: 'processing', claimsProcessed: 298, accuracy: 92.3 },
    { name: 'Financial & Leakage Agent', status: 'active', claimsProcessed: 445, accuracy: 95.7 }
  ])

  const [integrationStatus, setIntegrationStatus] = useState([
    { name: 'Shafafiya (Abu Dhabi)', status: 'connected', lastSync: '2 min ago' },
    { name: 'DHPO/eClaimLink (Dubai)', status: 'connected', lastSync: '1 min ago' },
    { name: 'Malaffi (Abu Dhabi HIE)', status: 'connected', lastSync: '3 min ago' },
    { name: 'NABIDH (Dubai)', status: 'connected', lastSync: '2 min ago' },
    { name: 'Riayati (Federal)', status: 'connected', lastSync: '4 min ago' },
    { name: 'DHA/DoH/MOHAP APIs', status: 'connected', lastSync: '1 min ago' }
  ])

  const [recentClaims, setRecentClaims] = useState([
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
      default: return 'bg-gray-400'
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 3) return 'text-green-600'
    if (score < 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
              <Shield className="w-10 h-10 text-emerald-600" />
              HIIS-UAE
            </h1>
            <p className="text-slate-600 mt-2">Health Integrity Intelligence System - UAE</p>
            <p className="text-sm text-slate-500">Unified Pre-Payment Integrity Engine for Public & Private Health Payers</p>
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
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Multi-Agents</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="vault">Digital Vault</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="regulators">Regulators</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Claims Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Claims Status Distribution
                </CardTitle>
                <CardDescription>Real-time claim processing status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Approved</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(systemMetrics.approvedClaims / systemMetrics.totalClaims) * 100} className="w-24" />
                    <span className="text-sm font-medium">{systemMetrics.approvedClaims}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Processing</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(systemMetrics.processingClaims / systemMetrics.totalClaims) * 100} className="w-24" />
                    <span className="text-sm font-medium">{systemMetrics.processingClaims}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Held</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(systemMetrics.heldClaims / systemMetrics.totalClaims) * 100} className="w-24" />
                    <span className="text-sm font-medium">{systemMetrics.heldClaims}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Escalated</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(systemMetrics.escalatedClaims / systemMetrics.totalClaims) * 100} className="w-24" />
                    <span className="text-sm font-medium">{systemMetrics.escalatedClaims}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rejected</span>
                  <div className="flex items-center gap-2">
                    <Progress value={(systemMetrics.rejectedClaims / systemMetrics.totalClaims) * 100} className="w-24" />
                    <span className="text-sm font-medium">{systemMetrics.rejectedClaims}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Claims */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Recent Claims Activity
                </CardTitle>
                <CardDescription>Latest claim processing results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {recentClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{claim.id}</span>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(claim.status)}`} />
                        </div>
                        <p className="text-xs text-muted-foreground">{claim.provider}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">AED {claim.amount.toLocaleString()}</div>
                        <div className={`text-xs ${getRiskColor(claim.riskScore)}`}>
                          Risk: {claim.riskScore}/10
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Multi-Agent System Status
              </CardTitle>
              <CardDescription>Real-time status of all autonomous verification agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agentStatus.map((agent, index) => (
                  <Card key={index} className="border-l-4 border-l-emerald-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{agent.name}</CardTitle>
                        <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                          {agent.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Claims Processed:</span>
                        <span className="font-medium">{agent.claimsProcessed}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Accuracy:</span>
                        <span className="font-medium text-green-600">{agent.accuracy}%</span>
                      </div>
                      <Progress value={agent.accuracy} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Integration Layer
              </CardTitle>
              <CardDescription>Connection status with UAE national health data infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrationStatus.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${integration.status === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <div>
                        <div className="font-medium text-sm">{integration.name}</div>
                        <div className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vault" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Digital Vault
              </CardTitle>
              <CardDescription>Pre-payment claim holding environment with AES-256 encryption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-yellow-800">Held Claims</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-800">{systemMetrics.heldClaims}</div>
                    <p className="text-xs text-yellow-600">Awaiting verification</p>
                  </CardContent>
                </Card>
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-green-800">Released Today</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-800">127</div>
                    <p className="text-xs text-green-600">Approved for payment</p>
                  </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-red-800">Escalated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-800">{systemMetrics.escalatedClaims}</div>
                    <p className="text-xs text-red-600">SIU investigation</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Intelligence & Learning Layer
              </CardTitle>
              <CardDescription>Adaptive policy evolution and behavioral analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Detection Pattern Evolution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Identity Fraud Detection</span>
                      <span className="text-green-600">+15% accuracy</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Clinical Necessity Validation</span>
                      <span className="text-green-600">+8% accuracy</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Provider Behavior Analysis</span>
                      <span className="text-green-600">+12% accuracy</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Network Collusion Detection</span>
                      <span className="text-green-600">+22% accuracy</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Regulatory Compliance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>DHA Audit Directives</span>
                      <Badge variant="default">Compliant</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>DoH Standards</span>
                      <Badge variant="default">Compliant</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>MOHAP Guidelines</span>
                      <Badge variant="default">Compliant</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>UAE Data Law 45 (2021)</span>
                      <Badge variant="default">Compliant</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Regulator Integration & Reporting
              </CardTitle>
              <CardDescription>Real-time dashboards for DHA, DoH, and MOHAP oversight</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Dubai Health Authority</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs text-muted-foreground">Evidence Packages Generated</div>
                    <div className="text-xl font-bold">234</div>
                    <Button variant="outline" size="sm" className="w-full">
                      Export Report
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Department of Health Abu Dhabi</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs text-muted-foreground">Evidence Packages Generated</div>
                    <div className="text-xl font-bold">189</div>
                    <Button variant="outline" size="sm" className="w-full">
                      Export Report
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">MOHAP Federal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-xs text-muted-foreground">Evidence Packages Generated</div>
                    <div className="text-xl font-bold">156</div>
                    <Button variant="outline" size="sm" className="w-full">
                      Export Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}