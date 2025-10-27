'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  GitBranch, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Eye, 
  Download, 
  Upload, 
  Clock, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Activity,
  Database,
  Shield,
  FileText,
  Users,
  Building,
  BarChart3,
  Filter,
  Search,
  MoreVertical,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Layers,
  Workflow,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  Lock,
  Key,
  Certificate
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

// Workflow data for the Sankey diagram
const workflowData = {
  nodes: [
    { id: 'input', name: 'Claims Input', type: 'input', x: 50, y: 200, value: 1500 },
    { id: 'validation', name: 'Data Validation', type: 'process', x: 200, y: 200, value: 1450 },
    { id: 'fraud-detection', name: 'Fraud Detection', type: 'process', x: 350, y: 150, value: 980 },
    { id: 'compliance', name: 'Compliance Check', type: 'process', x: 350, y: 250, value: 470 },
    { id: 'risk-scoring', name: 'Risk Scoring', type: 'process', x: 500, y: 200, value: 1420 },
    { id: 'approval', name: 'Auto-Approval', type: 'decision', x: 650, y: 150, value: 890 },
    { id: 'manual-review', name: 'Manual Review', type: 'decision', x: 650, y: 250, value: 530 },
    { id: 'payment', name: 'Payment Processing', type: 'output', x: 800, y: 200, value: 1200 },
    { id: 'rejection', name: 'Rejection', type: 'output', x: 800, y: 300, value: 220 },
    { id: 'audit', name: 'Audit Trail', type: 'output', x: 800, y: 100, value: 80 }
  ],
  links: [
    { source: 'input', target: 'validation', value: 1450, status: 'active' },
    { source: 'validation', target: 'fraud-detection', value: 980, status: 'active' },
    { source: 'validation', target: 'compliance', value: 470, status: 'active' },
    { source: 'fraud-detection', target: 'risk-scoring', value: 920, status: 'active' },
    { source: 'compliance', target: 'risk-scoring', value: 450, status: 'active' },
    { source: 'risk-scoring', target: 'approval', value: 890, status: 'active' },
    { source: 'risk-scoring', target: 'manual-review', value: 530, status: 'active' },
    { source: 'approval', target: 'payment', value: 820, status: 'active' },
    { source: 'approval', target: 'audit', value: 70, status: 'active' },
    { source: 'manual-review', target: 'payment', value: 380, status: 'warning' },
    { source: 'manual-review', target: 'rejection', value: 150, status: 'active' },
    { source: 'manual-review', target: 'audit', value: 10, status: 'active' }
  ]
}

// Workflow execution data
const workflowExecutions = [
  { id: 'exec-001', name: 'Daily Batch Processing', status: 'running', progress: 78, startTime: '09:00:00', estimatedEnd: '09:45:00', processed: 1170, total: 1500 },
  { id: 'exec-002', name: 'High Priority Claims', status: 'completed', progress: 100, startTime: '08:30:00', endTime: '08:52:00', processed: 245, total: 245 },
  { id: 'exec-003', name: 'UAE Provider Validation', status: 'queued', progress: 0, startTime: '-', estimatedEnd: '10:15:00', processed: 0, total: 500 },
  { id: 'exec-004', name: 'Fraud Detection Batch', status: 'failed', progress: 45, startTime: '07:45:00', endTime: '08:12:00', processed: 225, total: 500, error: 'API timeout with Malaffi' }
]

// Sankey Diagram Component
function SankeyDiagram() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [animatedLinks, setAnimatedLinks] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedLinks(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'input': return '#3b82f6'
      case 'process': return '#8b5cf6'
      case 'decision': return '#f59e0b'
      case 'output': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getLinkColor = (status: string) => {
    switch (status) {
      case 'active': return '#3b82f6'
      case 'warning': return '#f59e0b'
      case 'error': return '#ef4444'
      default: return '#6b7280'
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
            <GitBranch className="h-5 w-5 text-gold" />
            Claims Processing Workflow
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Play className="h-3 w-3 mr-1" />
              Simulate
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-3 w-3 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative bg-card/50 rounded-lg p-4 overflow-hidden" style={{ height: '400px' }}>
          <svg width="100%" height="100%" viewBox="0 0 900 400">
            {/* Render links */}
            {workflowData.links.map((link, index) => {
              const sourceNode = workflowData.nodes.find(n => n.id === link.source)
              const targetNode = workflowData.nodes.find(n => n.id === link.target)
              if (!sourceNode || !targetNode) return null

              const midX = (sourceNode.x + targetNode.x) / 2
              const midY = (sourceNode.y + targetNode.y) / 2
              
              return (
                <g key={index}>
                  <motion.path
                    d={`M ${sourceNode.x + 40} ${sourceNode.y} Q ${midX} ${midY} ${targetNode.x - 40} ${targetNode.y}`}
                    stroke={getLinkColor(link.status)}
                    strokeWidth={Math.max(2, link.value / 100)}
                    fill="none"
                    opacity={0.6}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: animatedLinks ? 1 : 0 }}
                    transition={{ duration: 2, delay: index * 0.1 }}
                  />
                  <motion.circle
                    cx={midX}
                    cy={midY}
                    r="4"
                    fill={getLinkColor(link.status)}
                    initial={{ scale: 0 }}
                    animate={{ scale: animatedLinks ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 2 + index * 0.1 }}
                  />
                  <motion.text
                    x={midX}
                    y={midY - 10}
                    textAnchor="middle"
                    className="text-xs fill-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: animatedLinks ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 2.2 + index * 0.1 }}
                  >
                    {link.value}
                  </motion.text>
                </g>
              )
            })}
            
            {/* Render nodes */}
            {workflowData.nodes.map((node, index) => (
              <g key={node.id}>
                <motion.rect
                  x={node.x - 40}
                  y={node.y - 20}
                  width="80"
                  height="40"
                  rx="8"
                  fill={getNodeColor(node.type)}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                />
                <motion.text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  className="text-xs fill-white font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  {node.name}
                </motion.text>
                {selectedNode === node.id && (
                  <motion.rect
                    x={node.x - 45}
                    y={node.y - 25}
                    width="90"
                    height="50"
                    rx="10"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-2">
            <div className="text-xs font-medium mb-2">Node Types</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs">Input</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-xs">Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded"></div>
                <span className="text-xs">Decision</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs">Output</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected Node Details */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 p-4 bg-accent/50 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">
                {workflowData.nodes.find(n => n.id === selectedNode)?.name}
              </h4>
              <Button variant="ghost" size="sm" onClick={() => setSelectedNode(null)}>
                ×
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <div className="font-medium">
                  {workflowData.nodes.find(n => n.id === selectedNode)?.type}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Volume:</span>
                <div className="font-medium">
                  {workflowData.nodes.find(n => n.id === selectedNode)?.value} claims
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </motion.div>
  )
}

// Workflow Execution Card Component
function WorkflowExecutionCard({ execution }: { execution: typeof workflowExecutions[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-blue-600'
      case 'completed': return 'text-green-600'
      case 'failed': return 'text-red-600'
      case 'queued': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'running': return 'default'
      case 'completed': return 'default'
      case 'failed': return 'destructive'
      case 'queued': return 'secondary'
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
          <div>
            <CardTitle className="text-sm">{execution.name}</CardTitle>
            <CardDescription className="text-xs">ID: {execution.id}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <motion.div variants={badgePulse} animate="animate">
              <Badge variant={getStatusBadge(execution.status)}>
                {execution.status}
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
                  <Download className="mr-2 h-4 w-4" />
                  Export Logs
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Restart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span className={`font-medium ${getStatusColor(execution.status)}`}>
              {execution.progress}%
            </span>
          </div>
          <Progress value={execution.progress} className="h-2" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Processed:</span>
            <div className="font-medium">{execution.processed.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Total:</span>
            <div className="font-medium">{execution.total.toLocaleString()}</div>
          </div>
        </div>

        {/* Timing */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Start Time
            </span>
            <span className="font-medium">{execution.startTime}</span>
          </div>
          {execution.endTime && (
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                End Time
              </span>
              <span className="font-medium">{execution.endTime}</span>
            </div>
          )}
          {execution.estimatedEnd && (
            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Est. End
              </span>
              <span className="font-medium">{execution.estimatedEnd}</span>
            </div>
          )}
        </div>

        {/* Error Message */}
        {execution.error && (
          <div className="p-2 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span className="font-medium">Error:</span>
            </div>
            <div className="mt-1">{execution.error}</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          {execution.status === 'running' && (
            <Button variant="outline" size="sm" className="flex-1">
              <Pause className="h-3 w-3 mr-1" />
              Pause
            </Button>
          )}
          {execution.status === 'failed' && (
            <Button variant="outline" size="sm" className="flex-1">
              <RotateCcw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
          {execution.status === 'queued' && (
            <Button variant="outline" size="sm" className="flex-1">
              <Play className="h-3 w-3 mr-1" />
              Start
            </Button>
          )}
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            Details
          </Button>
        </div>
      </CardContent>
    </motion.div>
  )
}

// System Overview Component
function SystemOverview() {
  const runningExecutions = workflowExecutions.filter(e => e.status === 'running').length
  const totalProcessed = workflowExecutions.reduce((sum, execution) => sum + execution.processed, 0)
  const completedExecutions = workflowExecutions.filter(e => e.status === 'completed').length
  const avgProgress = Math.round(workflowExecutions.reduce((sum, execution) => sum + execution.progress, 0) / workflowExecutions.length)

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
            <CardTitle className="text-sm font-medium">Running Workflows</CardTitle>
            <Activity className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{runningExecutions}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Play className="h-3 w-3 text-blue-500" />
              <span>Active executions</span>
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
              <span>Claims processed</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedExecutions}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>Successful executions</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgProgress}%</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>Across all workflows</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default function OrchestrationFlow() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredExecutions = workflowExecutions.filter(execution => {
    const matchesSearch = execution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || execution.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Workflow Orchestration</h1>
        <p className="text-muted-foreground">
          Monitor and manage automated claims processing workflows
        </p>
      </div>

      {/* System Overview */}
      <SystemOverview />

      {/* Main Content */}
      <Tabs defaultValue="workflow" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workflow">Workflow Diagram</TabsTrigger>
          <TabsTrigger value="executions">Executions</TabsTrigger>
        </TabsList>

        <TabsContent value="workflow" className="space-y-6">
          <SankeyDiagram />
        </TabsContent>

        <TabsContent value="executions" className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search executions..."
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
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="queued">Queued</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Execution Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {filteredExecutions.map((execution) => (
              <WorkflowExecutionCard key={execution.id} execution={execution} />
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}