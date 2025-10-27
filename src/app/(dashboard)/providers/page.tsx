'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Building, 
  Star, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  Calendar,
  Award,
  Activity
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

// Mock data for providers
const providerData = [
  {
    id: 1,
    name: "MedCare Hospital Dubai",
    status: "active",
    rating: 4.8,
    specialization: "Multi-Specialty",
    location: "Dubai Healthcare City",
    claimsProcessed: 1247,
    responseTime: "1.2 hours",
    contact: "+971-4-123-4567",
    email: "info@medcare.ae",
    type: "Hospital"
  },
  {
    id: 2,
    name: "Al Zahra Medical Center",
    status: "active",
    rating: 4.6,
    specialization: "Primary Care",
    location: "Sharjah",
    claimsProcessed: 892,
    responseTime: "2.1 hours",
    contact: "+971-6-234-5678",
    email: "contact@alzahra.ae",
    type: "Medical Center"
  },
  {
    id: 3,
    name: "Emirates Clinic Abu Dhabi",
    status: "warning",
    rating: 4.2,
    specialization: "Dermatology",
    location: "Abu Dhabi",
    claimsProcessed: 456,
    responseTime: "4.5 hours",
    contact: "+971-2-345-6789",
    email: "info@emiratesclinic.ae",
    type: "Specialty Clinic"
  },
  {
    id: 4,
    name: "UAE Health Network",
    status: "active",
    rating: 4.7,
    specialization: "Multi-Specialty",
    location: "Multiple Locations",
    claimsProcessed: 2156,
    responseTime: "1.8 hours",
    contact: "+971-800-HEALTH",
    email: "network@uaehealth.ae",
    type: "Network"
  }
]

// Provider Card Component
function ProviderCard({ provider }: { provider: typeof providerData[0] }) {
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
            <div className={`p-2 rounded-lg bg-accent/50 ${getStatusColor(provider.status)}`}>
              <Building className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm">{provider.name}</CardTitle>
              <CardDescription className="text-xs">{provider.specialization}</CardDescription>
            </div>
          </div>
          <Badge variant={getStatusBadge(provider.status)}>
            {provider.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(provider.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {provider.rating}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {provider.type}
          </Badge>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{provider.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span className="text-xs">{provider.contact}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="text-xs">{provider.email}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Claims Processed:</span>
            <div className="font-medium">{provider.claimsProcessed.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Response Time:</span>
            <div className="font-medium">{provider.responseTime}</div>
          </div>
        </div>
      </CardContent>
    </motion.div>
  )
}

export default function ProvidersPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Healthcare Providers</h1>
        <p className="text-muted-foreground">
          Manage and monitor healthcare providers across the UAE network
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
              <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
              <Users className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Active providers</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.6</div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Claims Processed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7K</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={staggerItem}>
          <Card className="glass-card hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4h</div>
              <p className="text-xs text-muted-foreground">Response time</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Providers Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-gold" />
            Provider Network
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search providers..."
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
          {providerData.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </motion.div>
      </div>

      {/* Provider Analytics */}
      <motion.div
        variants={cardV}
        initial="hidden"
        animate="show"
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-gold" />
            Provider Performance Analytics
          </CardTitle>
          <CardDescription>
            Key performance indicators for provider network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="claims">Claims</TabsTrigger>
              <TabsTrigger value="quality">Quality</TabsTrigger>
            </TabsList>
            <TabsContent value="performance" className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">98.2%</div>
                  <div className="text-sm text-muted-foreground">Claim Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">4.6/5</div>
                  <div className="text-sm text-muted-foreground">Patient Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2.4h</div>
                  <div className="text-sm text-muted-foreground">Avg Response Time</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="claims" className="space-y-3">
              <div className="text-sm text-muted-foreground">Claims processing metrics available</div>
            </TabsContent>
            <TabsContent value="quality" className="space-y-3">
              <div className="text-sm text-muted-foreground">Quality assurance metrics available</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </motion.div>
    </div>
  )
}