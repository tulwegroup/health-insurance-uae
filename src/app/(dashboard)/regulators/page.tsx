'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Building, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  Users,
  Eye,
  Download,
  Search,
  Filter,
  Calendar,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  cardV, 
  staggerContainer, 
  staggerItem 
} from '@/lib/motion'

// Mock data for regulators
const regulatorData = [
  {
    id: 1,
    name: "Dubai Health Authority (DHA)",
    status: "active",
    complianceScore: 98,
    lastReport: "2024-01-15",
    activeCases: 12,
    responseTime: "2.3 hours",
    type: "Emirate Authority"
  },
  {
    id: 2,
    name: "Ministry of Health and Prevention (MOHAP)",
    status: "active",
    complianceScore: 95,
    lastReport: "2024-01-14",
    activeCases: 8,
    responseTime: "4.1 hours",
    type: "Federal Authority"
  },
  {
    id: 3,
    name: "Abu Dhabi Department of Health (DOH)",
    status: "active",
    complianceScore: 97,
    lastReport: "2024-01-15",
    activeCases: 6,
    responseTime: "1.8 hours",
    type: "Emirate Authority"
  },
  {
    id: 4,
    name: "Health Authority - Abu Dhabi (HAAD)",
    status: "warning",
    complianceScore: 88,
    lastReport: "2024-01-13",
    activeCases: 3,
    responseTime: "6.2 hours",
    type: "Emirate Authority"
  }
]

// Compliance Report Card Component
function ComplianceReportCard({ regulator }: { regulator: typeof regulatorData[0] }) {
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
            <div className={`p-2 rounded-lg bg-accent/50 ${getStatusColor(regulator.status)}`}>
              <Building className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm">{regulator.name}</CardTitle>
              <CardDescription className="text-xs">{regulator.type}</CardDescription>
            </div>
          </div>
          <Badge variant={getStatusBadge(regulator.status)}>
            {regulator.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Compliance Score</span>
          <span className="text-sm font-bold text-green-600">{regulator.complianceScore}%</span>
        </div>
        <Progress value={regulator.complianceScore} className="h-2" />
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Active Cases:</span>
            <div className="font-medium">{regulator.activeCases}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Response Time:</span>
            <div className="font-medium">{regulator.responseTime}</div>
          </div>
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Last Report:</span>
          <span>{regulator.lastReport}</span>
        </div>
      </CardContent>
    </motion.div>
  )
}

export default function RegulatorsPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Regulatory Compliance</h1>
        <p className="text-muted-foreground">
          Monitor compliance with UAE health authorities and regulatory bodies
        </p>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Regulators</CardTitle>
              <Building className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Connected authorities</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Compliance</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.5%</div>
              <p className="text-xs text-muted-foreground">+2.3% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">29</div>
              <p className="text-xs text-muted-foreground">Under review</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.6h</div>
              <p className="text-xs text-muted-foreground">-1.2h improvement</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Regulators Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-gold" />
            Regulatory Authorities
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search regulators..."
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {regulatorData.map((regulator) => (
            <ComplianceReportCard key={regulator.id} regulator={regulator} />
          ))}
        </motion.div>
      </div>

      {/* Compliance Reports */}
      <motion.div
        variants={cardV}
        initial="hidden"
        animate="show"
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gold" />
            Recent Compliance Reports
          </CardTitle>
          <CardDescription>
            Latest submissions to regulatory authorities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="space-y-3">
              <div className="text-sm text-muted-foreground">No pending reports</div>
            </TabsContent>
            <TabsContent value="approved" className="space-y-3">
              <div className="text-sm text-muted-foreground">All reports approved</div>
            </TabsContent>
            <TabsContent value="rejected" className="space-y-3">
              <div className="text-sm text-muted-foreground">No rejected reports</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </motion.div>
    </div>
  )
}