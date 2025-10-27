'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  TrendingUp,
  Eye,
  Database,
  Bot,
  FileText,
  BarChart3,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  CheckCircle,
  XCircle,
  Pause,
  Play
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  cardV, 
  staggerContainer, 
  staggerItem, 
  counterAnimation,
  badgePulse
} from '@/lib/motion'
import { systemMetrics, agentPerformance, uaeIntegrations, liveEvents } from '@/lib/seed-data'

// Animated Counter Component
function AnimatedCounter({ value, prefix = '', suffix = '' }: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
}) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const duration = 2000
    const steps = 60
    const stepValue = value / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += stepValue
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [value])
  
  return (
    <motion.div variants={counterAnimation}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </motion.div>
  )
}

// KPI Card Component
function KpiCard({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  delta, 
  icon: Icon, 
  color = 'text-gold',
  trend 
}: {
  title: string
  value: number
  prefix?: string
  suffix?: string
  delta?: number
  icon: any
  color?: string
  trend?: 'up' | 'down' | 'neutral'
}) {
  return (
    <motion.div
      variants={cardV}
      whileHover="hover"
      className="glass-card hover-lift"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </div>
        {delta !== undefined && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            {trend === 'up' && <ArrowUpRight className="h-3 w-3 text-green-500" />}
            {trend === 'down' && <ArrowDownRight className="h-3 w-3 text-red-500" />}
            <span className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : ''}>
              {delta > 0 ? '+' : ''}{delta}%
            </span>
            <span>from last month</span>
          </div>
        )}
      </CardContent>
    </motion.div>
  )
}

// Live Stream Ticker Component
function LiveStreamTicker() {
  const [isPaused, setIsPaused] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-gold" />
          <span className="text-sm font-medium">Live Activity Stream</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
        </Button>
      </div>
      <div className="relative overflow-hidden h-20">
        <motion.div
          animate={!isPaused ? { x: [0, -50] } : {}}
          transition={{ 
            repeat: Infinity, 
            repeatType: "loop", 
            duration: 20,
            ease: "linear"
          }}
          className="flex items-center gap-8 p-3 whitespace-nowrap"
        >
          {liveEvents.concat(liveEvents).map((event, index) => (
            <div key={`${event.id}-${index}`} className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                event.severity === 'success' ? 'bg-green-500' :
                event.severity === 'warning' ? 'bg-yellow-500' :
                event.severity === 'error' ? 'bg-red-500' : 'bg-blue-500'
              }`} />
              <span className="text-muted-foreground">
                {event.timestamp.toLocaleTimeString()}
              </span>
              <span>{event.message}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Agent Status Grid Component
function AgentStatusGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {agentPerformance.map((agent, index) => (
        <motion.div key={agent.id} variants={staggerItem}>
          <Card className="glass-card hover-lift border-l-4 border-l-gold">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{agent.name}</CardTitle>
                <motion.div variants={badgePulse} animate="animate">
                  <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                    {agent.status}
                  </Badge>
                </motion.div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Accuracy:</span>
                <span className="font-medium text-green-600">{agent.accuracy}%</span>
              </div>
              <Progress value={agent.accuracy} className="h-2" />
              <div className="flex justify-between text-sm">
                <span>Throughput:</span>
                <span className="font-medium">{agent.throughput}/min</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Queue Depth:</span>
                <span className="font-medium">{agent.queueDepth}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Uptime:</span>
                <span className="font-medium text-green-600">{agent.uptime}%</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Integration Health Row Component
function IntegrationHealthRow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {uaeIntegrations.map((integration) => (
        <motion.div
          key={integration.id}
          variants={cardV}
          whileHover="hover"
          className="glass-card"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">{integration.name}</CardTitle>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  integration.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <Badge variant="outline" className="text-xs">
                  {integration.latency}ms
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uptime:</span>
              <span className="font-medium text-green-600">{integration.uptime}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Messages/min:</span>
              <span className="font-medium">{integration.messagesPerMinute}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Last sync:</span>
              <span className="font-medium">{integration.lastSync}</span>
            </div>
          </CardContent>
        </motion.div>
      ))}
    </div>
  )
}

export default function OverviewDashboard() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Mission Control</h1>
        <p className="text-muted-foreground">
          Real-time overview of HIIS-UAE system performance and integrity operations
        </p>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={staggerItem}>
          <KpiCard
            title="Total Claims Processed"
            value={systemMetrics.totalClaims}
            icon={FileText}
            delta={12}
            trend="up"
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <KpiCard
            title="Fraud Prevention Savings"
            value={systemMetrics.totalSavings}
            prefix="AED "
            icon={TrendingUp}
            delta={8}
            trend="up"
            color="text-green-600"
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <KpiCard
            title="Average Risk Score"
            value={systemMetrics.averageRiskScore}
            suffix="/10"
            icon={AlertTriangle}
            delta={-2}
            trend="down"
            color="text-yellow-600"
          />
        </motion.div>
        <motion.div variants={staggerItem}>
          <KpiCard
            title="Active Agents"
            value={systemMetrics.activeAgents}
            icon={Bot}
            delta={0}
            trend="neutral"
            color="text-blue-600"
          />
        </motion.div>
      </motion.div>

      {/* Live Stream Ticker */}
      <LiveStreamTicker />

      {/* Status Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agent Status */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-gold" />
            Multi-Agent System Status
          </h2>
          <AgentStatusGrid />
        </div>

        {/* Integration Health */}
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-gold" />
            UAE Integration Health
          </h2>
          <IntegrationHealthRow />
        </div>
      </div>

      {/* System Status Overview */}
      <motion.div
        variants={cardV}
        initial="hidden"
        animate="show"
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gold" />
            System Integrity Overview
          </CardTitle>
          <CardDescription>
            Real-time system health and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.97%</div>
              <div className="text-sm text-muted-foreground">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">98.5%</div>
              <div className="text-sm text-muted-foreground">Integration Health</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.8s</div>
              <div className="text-sm text-muted-foreground">Avg Processing Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-muted-foreground">Evidence Packages Generated</div>
            </div>
          </div>
        </CardContent>
      </motion.div>
    </div>
  )
}