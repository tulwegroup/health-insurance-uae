'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Pause, 
  Play, 
  Settings, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Zap, 
  Database, 
  FileText, 
  Shield, 
  Eye, 
  Terminal,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  RefreshCw,
  BarChart3,
  Users,
  Filter,
  Search,
  Download,
  Upload,
  MoreVertical
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  cardV, 
  staggerContainer, 
  staggerItem, 
  counterAnimation,
  badgePulse
} from '@/lib/motion'

// Enhanced agent data with more detailed metrics
const agentData = [
  {
    id: 'fraud-detection-01',
    name: 'Fraud Detection Alpha',
    type: 'fraud-detection',
    status: 'active',
    health: 98,
    accuracy: 97.5,
    throughput: 45,
    queueDepth: 12,
    uptime: 99.8,
    memoryUsage: 68,
    cpuUsage: 42,
    lastActivity: new Date(Date.now() - 1000 * 60 * 2),
    processedToday: 1250,
    errorsToday: 3,
    avgProcessingTime: 1.2,
    model: 'GPT-4-Turbo',
    version: '2.1.3',
    description: 'Primary fraud detection agent using advanced ML algorithms'
  },
  {
    id: 'compliance-checker-01',
    name: 'Compliance Guardian',
    type: 'compliance',
    status: 'active',
    health: 95,
    accuracy: 94.2,
    throughput: 38,
    queueDepth: 8,
    uptime: 99.5,
    memoryUsage: 55,
    cpuUsage: 38,
    lastActivity: new Date(Date.now() - 1000 * 60 * 5),
    processedToday: 980,
    errorsToday: 7,
    avgProcessingTime: 2.1,
    model: 'Claude-3.5-Sonnet',
    version: '1.8.2',
    description: 'Ensures compliance with UAE healthcare regulations'
  },
  {
    id: 'risk-scorer-01',
    name: 'Risk Assessor Pro',
    type: 'risk-assessment',
    status: 'active',
    health: 92,
    accuracy: 91.8,
    throughput: 52,
    queueDepth: 23,
    uptime: 98.9,
    memoryUsage: 72,
    cpuUsage: 58,
    lastActivity: new Date(Date.now() - 1000 * 60 * 1),
    processedToday: 1680,
    errorsToday: 12,
    avgProcessingTime: 0.8,
    model: 'GPT-4-Turbo',
    version: '3.0.1',
    description: 'Calculates risk scores for claims and providers'
  },
  {
    id: 'data-validator-01',
    name: 'Data Validator',
    type: 'validation',
    status: 'warning',
    health: 78,
    accuracy: 89.5,
    throughput: 28,
    queueDepth: 45,
    uptime: 96.2,
    memoryUsage: 85,
    cpuUsage: 72,
    lastActivity: new Date(Date.now() - 1000 * 60 * 15),
    processedToday: 620,
    errorsToday: 28,
    avgProcessingTime: 3.5,
    model: 'Claude-3.5-Sonnet',
    version: '1.5.4',
    description: 'Validates claim data against UAE standards'
  },
  {
    id: 'audit-trail-01',
    name: 'Audit Sentinel',
    type: 'audit',
    status: 'inactive',
    health: 45,
    accuracy: 0,
    throughput: 0,
    queueDepth: 0,
    uptime: 0,
    memoryUsage: 12,
    cpuUsage: 5,
    lastActivity: new Date(Date.now() - 1000 * 60 * 120),
    processedToday: 0,
    errorsToday: 0,
    avgProcessingTime: 0,
    model: 'GPT-4-Turbo',
    version: '2.0.0',
    description: 'Maintains comprehensive audit trails'
  },
  {
    id: 'report-generator-01',
    name: 'Report Builder',
    type: 'reporting',
    status: 'active',
    health: 88,
    accuracy: 96.2,
    throughput: 15,
    queueDepth: 4,
    uptime: 97.8,
    memoryUsage: 45,
    cpuUsage: 32,
    lastActivity: new Date(Date.now() - 1000 * 60 * 8),
    processedToday: 180,
    errorsToday: 2,
    avgProcessingTime: 8.2,
    model: 'Claude-3.5-Sonnet',
    version: '1.3.1',
    description: 'Generates regulatory and operational reports'
  }
]

// Console log entries for the activity console
const consoleLogs = [
  { timestamp: new Date(Date.now() - 1000 * 30), level: 'info', agent: 'fraud-detection-01', message: 'Processed claim #CLM-2024-0142 with risk score 3.2/10' },
  { timestamp: new Date(Date.now() - 1000 * 45), level: 'warning', agent: 'data-validator-01', message: 'High memory usage detected (85%) - consider scaling' },
  { timestamp: new Date(Date.now() - 1000 * 60), level: 'success', agent: 'compliance-checker-01', message: 'Batch validation completed: 150 claims passed' },
  { timestamp: new Date(Date.now() - 1000 * 90), level: 'error', agent: 'risk-scorer-01', message: 'API timeout connecting to Malaffi system' },
  { timestamp: new Date(Date.now() - 1000 * 120), level: 'info', agent: 'report-generator-01', message: 'Monthly compliance report generated successfully' },
  { timestamp: new Date(Date.now() - 1000 * 150), level: 'warning', agent: 'fraud-detection-01', message: 'Unusual pattern detected in provider PRV-0234 claims' },
  { timestamp: new Date(Date.now() - 1000 * 180), level: 'success', agent: 'compliance-checker-01', message: 'Daman integration health check passed' },
  { timestamp: new Date(Date.now() - 1000 * 210), level: 'info', agent: 'risk-scorer-01', message: 'Model updated to version 3.0.1 with improved accuracy' }
]

// Agent Performance Card Component
function AgentPerformanceCard({ agent }: { agent: typeof agentData[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'inactive': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'default'
      case 'warning': return 'secondary'
      case 'inactive': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <motion.div
      variants={staggerItem}
      whileHover="hover"
      className="glass-card hover-lift"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-accent/50 ${getStatusColor(agent.status)}`}>
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm">{agent.name}</CardTitle>
              <CardDescription className="text-xs">{agent.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div variants={badgePulse} animate="animate">
              <Badge variant={getStatusBadge(agent.status)}>
                {agent.status}
              </Badge>
            </motion.div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Restart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Health and Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Health</span>
              <span className={`font-medium ${getStatusColor(agent.status)}`}>{agent.health}%</span>
            </div>
            <Progress value={agent.health} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Accuracy</span>
              <span className="font-medium text-green-600">{agent.accuracy}%</span>
            </div>
            <Progress value={agent.accuracy} className="h-2" />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center">
            <div className="font-medium">{agent.throughput}</div>
            <div className="text-xs text-muted-foreground">/min</div>
          </div>
          <div className="text-center">
            <div className="font-medium">{agent.queueDepth}</div>
            <div className="text-xs text-muted-foreground">Queue</div>
          </div>
          <div className="text-center">
            <div className="font-medium text-green-600">{agent.uptime}%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>

        {/* Resource Usage */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <Cpu className="h-3 w-3" />
              CPU
            </span>
            <span className="font-medium">{agent.cpuUsage}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1">
              <HardDrive className="h-3 w-3" />
              Memory
            </span>
            <span className="font-medium">{agent.memoryUsage}%</span>
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-3 border-t border-border space-y-2"
          >
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Model:</span>
                <div className="font-medium">{agent.model}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Version:</span>
                <div className="font-medium">{agent.version}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Processed Today:</span>
                <div className="font-medium">{agent.processedToday.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Errors Today:</span>
                <div className="font-medium text-red-600">{agent.errorsToday}</div>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Avg Processing Time:</span>
              <div className="font-medium">{agent.avgProcessingTime}s</div>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
          <Button
            variant={agent.status === 'active' ? 'secondary' : 'default'}
            size="sm"
            className="flex-1"
          >
            {agent.status === 'active' ? (
              <>
                <Pause className="h-3 w-3 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-3 w-3 mr-1" />
                Start
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </motion.div>
  )
}

// Activity Console Component
function ActivityConsole() {
  const [logs, setLogs] = useState(consoleLogs)
  const [filter, setFilter] = useState('all')

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.level === filter)

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-600'
      case 'warning': return 'text-yellow-600'
      case 'success': return 'text-green-600'
      default: return 'text-blue-600'
    }
  }

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case 'error': return <XCircle className="h-3 w-3" />
      case 'warning': return <AlertTriangle className="h-3 w-3" />
      case 'success': return <CheckCircle className="h-3 w-3" />
      default: return <Activity className="h-3 w-3" />
    }
  }

  return (
    <motion.div
      variants={cardV}
      initial="hidden"
      animate="show"
      className="glass-card"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5 text-gold" />
            Agent Activity Console
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-black/50 rounded-lg p-4 font-mono text-sm max-h-96 overflow-y-auto">
          {filteredLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-3 mb-2 text-xs">
              <span className="text-muted-foreground">
                {log.timestamp.toLocaleTimeString()}
              </span>
              <span className={getLogLevelColor(log.level)}>
                {getLogLevelIcon(log.level)}
              </span>
              <span className="text-gold">
                [{log.agent}]
              </span>
              <span className="text-foreground">
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </motion.div>
  )
}

// System Overview Component
function SystemOverview() {
  const activeAgents = agentData.filter(a => a.status === 'active').length
  const totalProcessed = agentData.reduce((sum, agent) => sum + agent.processedToday, 0)
  const totalErrors = agentData.reduce((sum, agent) => sum + agent.errorsToday, 0)
  const avgHealth = Math.round(agentData.reduce((sum, agent) => sum + agent.health, 0) / agentData.length)

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAgents}/{agentData.length}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>All systems operational</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProcessed.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Last 24 hours</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalErrors}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>{((totalErrors / totalProcessed) * 100).toFixed(2)}% error rate</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{avgHealth}%</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>Excellent performance</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default function MultiAgentOps() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredAgents = agentData.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Multi-Agent Operations</h1>
        <p className="text-muted-foreground">
          Monitor and manage the AI agent fleet powering the HIIS-UAE system
        </p>
      </div>

      {/* System Overview */}
      <SystemOverview />

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="agents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="agents">Agent Performance</TabsTrigger>
          <TabsTrigger value="console">Activity Console</TabsTrigger>
        </TabsList>

        <TabsContent value="agents" className="space-y-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {filteredAgents.map((agent) => (
              <AgentPerformanceCard key={agent.id} agent={agent} />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="console" className="space-y-6">
          <ActivityConsole />
        </TabsContent>
      </Tabs>
    </div>
  )
}