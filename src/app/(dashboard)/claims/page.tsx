'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
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
  BarChart3,
  DollarSign,
  Shield,
  Activity,
  Zap
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

// Mock data for claims
const claimsData = [
  {
    id: "CLM-2024-001",
    patientName: "Ahmed Mohammed",
    provider: "MedCare Hospital Dubai",
    amount: 15000,
    status: "approved",
    submissionDate: "2024-01-15",
    processingTime: "2.3 hours",
    type: "Inpatient",
    urgency: "normal"
  },
  {
    id: "CLM-2024-002",
    patientName: "Fatima Al Rashid",
    provider: "Al Zahra Medical Center",
    amount: 3500,
    status: "pending",
    submissionDate: "2024-01-15",
    processingTime: "1.1 hours",
    type: "Outpatient",
    urgency: "high"
  },
  {
    id: "CLM-2024-003",
    patientName: "Khalid Hassan",
    provider: "Emirates Clinic Abu Dhabi",
    amount: 8500,
    status: "review",
    submissionDate: "2024-01-14",
    processingTime: "4.5 hours",
    type: "Specialty",
    urgency: "normal"
  },
  {
    id: "CLM-2024-004",
    patientName: "Mariam Al Qassimi",
    provider: "UAE Health Network",
    amount: 22000,
    status: "approved",
    submissionDate: "2024-01-14",
    processingTime: "1.8 hours",
    type: "Inpatient",
    urgency: "urgent"
  }
]

// Claim Card Component
function ClaimCard({ claim }: { claim: typeof claimsData[0] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600'
      case 'pending': return 'text-yellow-600'
      case 'review': return 'text-blue-600'
      case 'rejected': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return 'default'
      case 'pending': return 'secondary'
      case 'review': return 'outline'
      case 'rejected': return 'destructive'
      default: return 'outline'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600'
      case 'high': return 'text-orange-600'
      case 'normal': return 'text-green-600'
      default: return 'text-gray-600'
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
            <div className={`p-2 rounded-lg bg-accent/50 ${getStatusColor(claim.status)}`}>
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm">{claim.id}</CardTitle>
              <CardDescription className="text-xs">{claim.patientName}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusBadge(claim.status)}>
              {claim.status}
            </Badge>
            <div className={`text-xs font-medium ${getUrgencyColor(claim.urgency)}`}>
              {claim.urgency}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Amount</span>
          <span className="text-sm font-bold text-gold">AED {claim.amount.toLocaleString()}</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Provider:</span>
            <span className="font-medium">{claim.provider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Type:</span>
            <span className="font-medium">{claim.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Processing Time:</span>
            <span className="font-medium">{claim.processingTime}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Submitted: {claim.submissionDate}</span>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Eye className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </motion.div>
  )
}

export default function ClaimsPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Claims Management</h1>
        <p className="text-muted-foreground">
          Process and track insurance claims across the healthcare network
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
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <FileText className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">71.5% approval rate</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="text-xs text-muted-foreground">Under review</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">AED 2.4M</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Claims Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-gold" />
            Recent Claims
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search claims..."
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <FileText className="h-4 w-4 mr-2" />
              New Claim
            </Button>
          </div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {claimsData.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </motion.div>
      </div>

      {/* Claims Analytics */}
      <motion.div
        variants={cardV}
        initial="hidden"
        animate="show"
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-gold" />
            Claims Analytics
          </CardTitle>
          <CardDescription>
            Comprehensive claims processing metrics and trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">71.5%</div>
                  <div className="text-sm text-muted-foreground">Approval Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">2.3h</div>
                  <div className="text-sm text-muted-foreground">Avg Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">AED 1,925</div>
                  <div className="text-sm text-muted-foreground">Avg Claim Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">98.2%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="processing" className="space-y-3">
              <div className="text-sm text-muted-foreground">Processing time analytics available</div>
            </TabsContent>
            <TabsContent value="fraud" className="space-y-3">
              <div className="text-sm text-muted-foreground">Fraud detection metrics available</div>
            </TabsContent>
            <TabsContent value="trends" className="space-y-3">
              <div className="text-sm text-muted-foreground">Claims trend analysis available</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </motion.div>
    </div>
  )
}