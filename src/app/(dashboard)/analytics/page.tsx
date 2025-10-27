'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  LineChart, 
  Activity, 
  Calendar, 
  Download, 
  Filter, 
  Search, 
  RefreshCw, 
  Settings, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Target, 
  Award, 
  Shield, 
  Database, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Globe, 
  Building, 
  MapPin, 
  Phone, 
  Mail,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  BarChart,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  AreaChart,
  ScatterChart,
  RadarChart,
  TreemapChart,
  FunnelChart,
  Sunburst,
  Sankey,
  Timeline,
  CalendarDays,
  Timer,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Minus,
  Plus,
  Filter as FilterIcon,
  X,
  Check,
  AlertCircle,
  Info,
  HelpCircle,
  Lightbulb,
  Zap as ZapIcon,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  BatteryWarning,
  Signal,
  SignalHigh,
  SignalLow,
  SignalMedium,
  SignalZero,
  Wifi as WifiIcon,
  WifiOff,
  Cloud,
  CloudDownload,
  CloudUpload,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  CloudMoon,
  CloudSun,
  Thermometer,
  ThermometerSun,
  ThermometerSnow,
  ThermometerCold,
  ThermometerHot,
  Wind,
  Droplets,
  Gauge,
  GaugeHigh,
  GaugeLow,
  GaugeMedium,
  Speed,
  TimerOff,
  TimerReset,
  TimerSand,
  TimerSandEmpty,
  TimerSandFull,
  Stopwatch,
  StopwatchOff,
  AlarmClock,
  AlarmClockCheck,
  AlarmClockOff,
  AlarmClockPlus,
  AlarmClockMinus,
  Clock as ClockIcon,
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  Hourglass,
  HourglassEmpty,
  HourglassFull,
  HourglassHalf,
  HourglassLow,
  HourglassMedium,
  HourglassHigh,
  HourglassSimple,
  HourglassSimpleEmpty,
  HourglassSimpleFull,
  HourglassSimpleHalf,
  HourglassSimpleLow,
  HourglassSimpleMedium,
  HourglassSimpleHigh,
  TimerSand as TimerSandIcon,
  TimerSandEmpty as TimerSandEmptyIcon,
  TimerSandFull as TimerSandFullIcon,
  TimerSandHalf as TimerSandHalfIcon,
  TimerSandLow as TimerSandLowIcon,
  TimerSandMedium as TimerSandMediumIcon,
  TimerSandHigh as TimerSandHighIcon,
  TimerSandSimple as TimerSandSimpleIcon,
  TimerSandSimpleEmpty as TimerSandSimpleEmptyIcon,
  TimerSandSimpleFull as TimerSandSimpleFullIcon,
  TimerSandSimpleHalf as TimerSandSimpleHalfIcon,
  TimerSandSimpleLow as TimerSandSimpleLowIcon,
  TimerSandSimpleMedium as TimerSandSimpleMediumIcon,
  TimerSandSimpleHigh as TimerSandSimpleHighIcon
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

// Recharts imports
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  AreaChart as ReAreaChart,
  Area,
  RadarChart as ReRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap as ReTreemap,
  ComposedChart,
  Scatter,
  ScatterChart as ReScatterChart,
  FunnelChart as ReFunnelChart,
  Funnel,
  LabelList
} from 'recharts'

// Analytics data
const claimsTrendData = [
  { month: 'Jan', claims: 1200, approved: 1080, rejected: 120, pending: 0 },
  { month: 'Feb', claims: 1350, approved: 1215, rejected: 108, pending: 27 },
  { month: 'Mar', claims: 1480, approved: 1332, rejected: 133, pending: 15 },
  { month: 'Apr', claims: 1620, approved: 1458, rejected: 146, pending: 16 },
  { month: 'May', claims: 1750, approved: 1575, rejected: 158, pending: 17 },
  { month: 'Jun', claims: 1890, approved: 1701, rejected: 170, pending: 19 },
  { month: 'Jul', claims: 1980, approved: 1782, rejected: 178, pending: 20 },
  { month: 'Aug', claims: 2100, approved: 1890, rejected: 189, pending: 21 },
  { month: 'Sep', claims: 2250, approved: 2025, rejected: 203, pending: 22 },
  { month: 'Oct', claims: 2400, approved: 2160, rejected: 216, pending: 24 }
]

const fraudDetectionData = [
  { month: 'Jan', detected: 45, prevented: 38, falsePositive: 7 },
  { month: 'Feb', detected: 52, prevented: 44, falsePositive: 8 },
  { month: 'Mar', detected: 58, prevented: 49, falsePositive: 9 },
  { month: 'Apr', detected: 63, prevented: 53, falsePositive: 10 },
  { month: 'May', detected: 68, prevented: 57, falsePositive: 11 },
  { month: 'Jun', detected: 72, prevented: 61, falsePositive: 11 },
  { month: 'Jul', detected: 75, prevented: 63, falsePositive: 12 },
  { month: 'Aug', detected: 78, prevented: 66, falsePositive: 12 },
  { month: 'Sep', detected: 82, prevented: 69, falsePositive: 13 },
  { month: 'Oct', detected: 85, prevented: 72, falsePositive: 13 }
]

const providerPerformanceData = [
  { name: 'Cleveland Clinic', claims: 450, approvalRate: 95, avgProcessingTime: 2.1, satisfaction: 4.8 },
  { name: 'Sheikh Khalifa', claims: 380, approvalRate: 92, avgProcessingTime: 2.8, satisfaction: 4.6 },
  { name: 'Rashid Hospital', claims: 320, approvalRate: 88, avgProcessingTime: 3.2, satisfaction: 4.4 },
  { name: 'Mediclinic', claims: 280, approvalRate: 90, avgProcessingTime: 2.5, satisfaction: 4.5 },
  { name: 'American Hospital', claims: 250, approvalRate: 93, avgProcessingTime: 2.3, satisfaction: 4.7 },
  { name: 'Al Zahra', claims: 220, approvalRate: 87, avgProcessingTime: 3.5, satisfaction: 4.3 }
]

const riskDistributionData = [
  { name: 'Low Risk', value: 45, color: '#10b981' },
  { name: 'Medium Risk', value: 30, color: '#f59e0b' },
  { name: 'High Risk', value: 20, color: '#ef4444' },
  { name: 'Critical Risk', value: 5, color: '#7c3aed' }
]

const systemPerformanceData = [
  { metric: 'Accuracy', current: 97.5, target: 98, previous: 96.8 },
  { metric: 'Processing Speed', current: 2.8, target: 2.5, previous: 3.2 },
  { metric: 'System Uptime', current: 99.97, target: 99.9, previous: 99.95 },
  { metric: 'Error Rate', current: 0.8, target: 1.0, previous: 1.2 },
  { metric: 'Customer Satisfaction', current: 4.6, target: 4.5, previous: 4.4 },
  { metric: 'Cost Efficiency', current: 85, target: 90, previous: 82 }
]

const monthlySavingsData = [
  { month: 'Jan', savings: 125000, claimsProcessed: 1200 },
  { month: 'Feb', savings: 142000, claimsProcessed: 1350 },
  { month: 'Mar', savings: 158000, claimsProcessed: 1480 },
  { month: 'Apr', savings: 175000, claimsProcessed: 1620 },
  { month: 'May', savings: 192000, claimsProcessed: 1750 },
  { month: 'Jun', savings: 210000, claimsProcessed: 1890 },
  { month: 'Jul', savings: 225000, claimsProcessed: 1980 },
  { month: 'Aug', savings: 242000, claimsProcessed: 2100 },
  { month: 'Sep', savings: 258000, claimsProcessed: 2250 },
  { month: 'Oct', savings: 275000, claimsProcessed: 2400 }
]

const integrationHealthData = [
  { name: 'Shafafiya', health: 98, uptime: 99.7, latency: 45, messages: 125 },
  { name: 'Malaffi', health: 95, uptime: 99.2, latency: 62, messages: 89 },
  { name: 'NABIDH', health: 92, uptime: 98.8, latency: 78, messages: 156 },
  { name: 'Riayati', health: 88, uptime: 97.2, latency: 95, messages: 43 },
  { name: 'DHA APIs', health: 94, uptime: 98.9, latency: 38, messages: 234 },
  { name: 'DHPO', health: 90, uptime: 97.8, latency: 55, messages: 67 }
]

// KPI Card Component
function KpiCard({ 
  title, 
  value, 
  prefix = '', 
  suffix = '', 
  delta, 
  icon: Icon, 
  color = 'text-gold',
  trend,
  description 
}: {
  title: string
  value: number | string
  prefix?: string
  suffix?: string
  delta?: number
  icon: any
  color?: string
  trend?: 'up' | 'down' | 'neutral'
  description?: string
}) {
  return (
    <motion.div
      variants={staggerItem}
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
          {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
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
        {description && (
          <div className="text-xs text-muted-foreground mt-1">
            {description}
          </div>
        )}
      </CardContent>
    </motion.div>
  )
}

// Chart Component Wrapper
function ChartCard({ 
  title, 
  description, 
  children, 
  actions 
}: { 
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover="hover"
      className="glass-card hover-lift"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </motion.div>
  )
}

// System Overview Component
function SystemOverview() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      <motion.div variants={staggerItem}>
        <KpiCard
          title="Total Claims Processed"
          value={2400}
          icon={FileText}
          delta={12}
          trend="up"
          description="This month"
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <KpiCard
          title="Fraud Prevention Savings"
          value={275000}
          prefix="AED "
          icon={DollarSign}
          delta={8}
          trend="up"
          description="This month"
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <KpiCard
          title="Detection Accuracy"
          value={97.5}
          suffix="%"
          icon={Target}
          delta={0.7}
          trend="up"
          description="Current rate"
        />
      </motion.div>
      <motion.div variants={staggerItem}>
        <KpiCard
          title="Avg Processing Time"
          value={2.8}
          suffix="s"
          icon={Clock}
          delta={-12.5}
          trend="down"
          description="Per claim"
        />
      </motion.div>
    </motion.div>
  )
}

export default function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false)
  const [timeRange, setTimeRange] = useState('6m')
  const [selectedChart, setSelectedChart] = useState('overview')
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive analytics and insights for the HIIS-UAE system
        </p>
      </div>

      {/* System Overview */}
      <SystemOverview />

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Main Charts */}
      <Tabs value={selectedChart} onValueChange={setSelectedChart} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
          <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Claims Trend Chart */}
            <ChartCard
              title="Claims Processing Trend"
              description="Monthly claims processed and approval rates"
              actions={
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download Data
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              }
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReLineChart data={claimsTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="claims" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
                </ReLineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Risk Distribution Chart */}
            <ChartCard
              title="Risk Distribution"
              description="Distribution of claims by risk level"
            >
              <ResponsiveContainer width="100%" height={300}>
                <RePieChart>
                  <Pie
                    data={riskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Monthly Savings Chart */}
            <ChartCard
              title="Monthly Savings"
              description="Fraud prevention savings over time"
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReAreaChart data={monthlySavingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="savings" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </ReAreaChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* System Performance Radar */}
            <ChartCard
              title="System Performance"
              description="Key performance metrics comparison"
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReRadarChart data={systemPerformanceData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Current" dataKey="current" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                  <Legend />
                </ReRadarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Claims Volume Chart */}
            <ChartCard
              title="Claims Volume by Provider"
              description="Number of claims processed by each provider"
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReBarChart data={providerPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="claims" fill="#3b82f6" />
                </ReBarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Approval Rate Chart */}
            <ChartCard
              title="Approval Rates"
              description="Approval rates by provider"
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReBarChart data={providerPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="approvalRate" fill="#10b981" />
                </ReBarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="fraud" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Fraud Detection Trend */}
            <ChartCard
              title="Fraud Detection Trend"
              description="Fraud cases detected and prevented over time"
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReLineChart data={fraudDetectionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="detected" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="prevented" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="falsePositive" stroke="#f59e0b" strokeWidth={2} />
                </ReLineChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Fraud Prevention Impact */}
            <ChartCard
              title="Fraud Prevention Impact"
              description="Financial impact of fraud prevention measures"
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReAreaChart data={monthlySavingsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="savings" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </ReAreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Integration Health */}
            <ChartCard
              title="Integration Health"
              description="Health metrics for all system integrations"
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReBarChart data={integrationHealthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="health" fill="#10b981" />
                  <Bar dataKey="uptime" fill="#3b82f6" />
                </ReBarChart>
              </ResponsiveContainer>
            </ChartCard>

            {/* Processing Performance */}
            <ChartCard
              title="Processing Performance"
              description="Average processing times by provider"
            >
              <ResponsiveContainer width="100%" height={300}>
                <ReBarChart data={providerPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgProcessingTime" fill="#f59e0b" />
                </ReBarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}