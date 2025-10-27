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
  Activity,
  Globe,
  Eye,
  Download
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

// Mock data for real UAE healthcare providers
const providerData = [
  {
    id: 1,
    name: "Mediclinic City Hospital",
    status: "active",
    rating: 4.7,
    specialization: "Multi-Specialty",
    location: "Dubai Healthcare City",
    claimsProcessed: 3247,
    responseTime: "1.2 hours",
    contact: "+971-4-449-5000",
    email: "info@mediclinic.ae",
    type: "Hospital",
    established: "2008",
    beds: 240,
    website: "https://www.mediclinic.ae",
    accreditation: "JCI",
    specialties: ["Cardiology", "Oncology", "Neurology", "Orthopedics", "Pediatrics"]
  },
  {
    id: 2,
    name: "American Hospital Dubai",
    status: "active",
    rating: 4.8,
    specialization: "Multi-Specialty",
    location: "Oud Metha, Dubai",
    claimsProcessed: 2891,
    responseTime: "1.0 hours",
    contact: "+971-4-336-7777",
    email: "info@ahdubai.com",
    type: "Hospital",
    established: "1996",
    beds: 254,
    website: "https://www.ahdubai.com",
    accreditation: "JCI",
    specialties: ["Cardiology", "Surgery", "Obstetrics", "Emergency Medicine", "Radiology"]
  },
  {
    id: 3,
    name: "Al Zahra Hospital Dubai",
    status: "active",
    rating: 4.5,
    specialization: "Multi-Specialty",
    location: "Al Barsha, Dubai",
    claimsProcessed: 1876,
    responseTime: "1.5 hours",
    contact: "+971-4-378-0000",
    email: "info@alzahrahospital.com",
    type: "Hospital",
    established: "2013",
    beds: 187,
    website: "https://www.alzahrahospital.com",
    accreditation: "JCI",
    specialties: ["Internal Medicine", "Surgery", "Pediatrics", "Gynecology", "ICU"]
  },
  {
    id: 4,
    name: "Saudi German Hospital Dubai",
    status: "active",
    rating: 4.6,
    specialization: "Multi-Specialty",
    location: "Al Qusais, Dubai",
    claimsProcessed: 2156,
    responseTime: "1.3 hours",
    contact: "+971-4-259-7000",
    email: "info@sghdubai.com",
    type: "Hospital",
    established: "2012",
    beds: 300,
    website: "https://www.sghdubai.com",
    accreditation: "JCI",
    specialties: ["Cardiology", "Neurosurgery", "Oncology", "Transplant", "Emergency"]
  },
  {
    id: 5,
    name: "NMC Royal Hospital Dubai",
    status: "active",
    rating: 4.4,
    specialization: "Multi-Specialty",
    location: "Al Nahda, Dubai",
    claimsProcessed: 1654,
    responseTime: "1.8 hours",
    contact: "+971-4-240-8000",
    email: "info@nmcdubai.com",
    type: "Hospital",
    established: "2015",
    beds: 145,
    website: "https://www.nmchealthcare.com",
    accreditation: "JCI",
    specialties: ["General Medicine", "Surgery", "Maternity", "Pediatrics", "Dentistry"]
  },
  {
    id: 6,
    name: "Aster Hospital Mankhool",
    status: "active",
    rating: 4.6,
    specialization: "Multi-Specialty",
    location: "Bur Dubai, Dubai",
    claimsProcessed: 1923,
    responseTime: "1.4 hours",
    contact: "+971-4-440-0000",
    email: "info@asterhospital.com",
    type: "Hospital",
    established: "2016",
    beds: 100,
    website: "https://www.asterhospitals.com",
    accreditation: "JCI",
    specialties: ["Cardiology", "Neurology", "Gastroenterology", "Orthopedics", "Internal Medicine"]
  },
  {
    id: 7,
    name: "Zulekha Hospital Dubai",
    status: "active",
    rating: 4.3,
    specialization: "Multi-Specialty",
    location: "Al Qusais, Dubai",
    claimsProcessed: 1432,
    responseTime: "2.1 hours",
    contact: "+971-4-259-9999",
    email: "info@zulekhahospitals.com",
    type: "Hospital",
    established: "2004",
    beds: 179,
    website: "https://www.zulekhahospitals.com",
    accreditation: "JCI",
    specialties: ["Cardiology", "Oncology", "Neurosurgery", "Urology", "Laparoscopic Surgery"]
  },
  {
    id: 8,
    name: "Prime Medical Center",
    status: "active",
    rating: 4.2,
    specialization: "Primary Care",
    location: "Multiple Locations - Dubai",
    claimsProcessed: 987,
    responseTime: "2.3 hours",
    contact: "+971-4-704-0500",
    email: "info@primehealth.ae",
    type: "Medical Center",
    established: "2002",
    beds: 0,
    website: "https://www.primehealth.ae",
    accreditation: "DHCC",
    specialties: ["Family Medicine", "Dentistry", "Dermatology", "Pediatrics", "Internal Medicine"]
  },
  {
    id: 9,
    name: "Emirates Hospital Dubai",
    status: "active",
    rating: 4.5,
    specialization: "Multi-Specialty",
    location: "Jumeirah, Dubai",
    claimsProcessed: 1543,
    responseTime: "1.6 hours",
    contact: "+971-4-349-6666",
    email: "info@emirateshospital.ae",
    type: "Hospital",
    established: "2003",
    beds: 127,
    website: "https://www.emirateshospital.ae",
    accreditation: "JCI",
    specialties: ["Cardiology", "Surgery", "Orthopedics", "Emergency", "ICU"]
  },
  {
    id: 10,
    name: "Canadian Specialist Hospital",
    status: "active",
    rating: 4.4,
    specialization: "Multi-Specialty",
    location: "Abu Hail, Dubai",
    claimsProcessed: 1789,
    responseTime: "1.7 hours",
    contact: "+971-4-707-2222",
    email: "info@csh.ae",
    type: "Hospital",
    established: "2006",
    beds: 200,
    website: "https://www.csh.ae",
    accreditation: "JCI",
    specialties: ["Cardiology", "Neurosurgery", "Oncology", "Pediatrics", "Maternity"]
  },
  {
    id: 11,
    name: "Al Baraha Hospital",
    status: "active",
    rating: 4.1,
    specialization: "Multi-Specialty",
    location: "Deira, Dubai",
    claimsProcessed: 2234,
    responseTime: "2.5 hours",
    contact: "+971-4-272-0000",
    email: "info@dha.gov.ae",
    type: "Government Hospital",
    established: "1982",
    beds: 400,
    website: "https://www.dha.gov.ae",
    accreditation: "DHCC",
    specialties: ["Emergency Medicine", "Surgery", "Internal Medicine", "Pediatrics", "Obstetrics"]
  },
  {
    id: 12,
    name: "Dubai Hospital",
    status: "active",
    rating: 4.2,
    specialization: "Multi-Specialty",
    location: "Oud Metha, Dubai",
    claimsProcessed: 3121,
    responseTime: "2.2 hours",
    contact: "+971-4-219-5000",
    email: "info@dha.gov.ae",
    type: "Government Hospital",
    established: "1983",
    beds: 626,
    website: "https://www.dha.gov.ae",
    accreditation: "DHCC",
    specialties: ["Cardiology", "Oncology", "Neurosurgery", "Transplant", "Emergency"]
  },
  {
    id: 13,
    name: "Rashid Hospital",
    status: "active",
    rating: 4.3,
    specialization: "Trauma & Emergency",
    location: "Bur Dubai, Dubai",
    claimsProcessed: 1987,
    responseTime: "1.1 hours",
    contact: "+971-4-219-3000",
    email: "info@dha.gov.ae",
    type: "Government Hospital",
    established: "1973",
    beds: 750,
    website: "https://www.dha.gov.ae",
    accreditation: "DHCC",
    specialties: ["Trauma", "Emergency Medicine", "Surgery", "ICU", "Burn Unit"]
  },
  {
    id: 14,
    name: "Latifa Hospital",
    status: "active",
    rating: 4.4,
    specialization: "Women & Children",
    location: "Oud Metha, Dubai",
    claimsProcessed: 1456,
    responseTime: "1.9 hours",
    contact: "+971-4-219-4000",
    email: "info@dha.gov.ae",
    type: "Government Hospital",
    established: "1987",
    beds: 342,
    website: "https://www.dha.gov.ae",
    accreditation: "DHCC",
    specialties: ["Obstetrics", "Gynecology", "Pediatrics", "Neonatology", "Fertility"]
  },
  {
    id: 15,
    name: "Hatta Hospital",
    status: "active",
    rating: 3.9,
    specialization: "Multi-Specialty",
    location: "Hatta, Dubai",
    claimsProcessed: 876,
    responseTime: "3.1 hours",
    contact: "+971-4-852-5000",
    email: "info@dha.gov.ae",
    type: "Government Hospital",
    established: "1981",
    beds: 100,
    website: "https://www.dha.gov.ae",
    accreditation: "DHCC",
    specialties: ["General Medicine", "Surgery", "Pediatrics", "Emergency", "Maternity"]
  },
  {
    id: 16,
    name: "Welcare Hospital Dubai",
    status: "active",
    rating: 4.3,
    specialization: "Multi-Specialty",
    location: "Al Quoz, Dubai",
    claimsProcessed: 1234,
    responseTime: "1.8 hours",
    contact: "+971-4-382-4000",
    email: "info@welcarehospital.com",
    type: "Hospital",
    established: "1998",
    beds: 140,
    website: "https://www.welcarehospital.com",
    accreditation: "JCI",
    specialties: ["Cardiology", "Surgery", "Internal Medicine", "Pediatrics", "Emergency"]
  },
  {
    id: 17,
    name: "Burjeel Hospital Dubai",
    status: "active",
    rating: 4.5,
    specialization: "Multi-Specialty",
    location: "Al Wasl Road, Dubai",
    claimsProcessed: 1567,
    responseTime: "1.4 hours",
    contact: "+971-4-246-4000",
    email: "info@burjeel.com",
    type: "Hospital",
    established: "2018",
    beds: 120,
    website: "https://www.burjeel.com",
    accreditation: "JCI",
    specialties: ["Cardiology", "Oncology", "Orthopedics", "Neurology", "Fertility"]
  },
  {
    id: 18,
    name: "City Hospital Dubai",
    status: "active",
    rating: 4.6,
    specialization: "Multi-Specialty",
    location: "Dubai Healthcare City",
    claimsProcessed: 1890,
    responseTime: "1.2 hours",
    contact: "+971-4-449-9000",
    email: "info@cityhospital.ae",
    type: "Hospital",
    established: "2008",
    beds: 210,
    website: "https://www.cityhospital.ae",
    accreditation: "JCI",
    specialties: ["Cardiology", "Surgery", "Internal Medicine", "Pediatrics", "Emergency"]
  }
]

// Provider Card Component
function ProviderCard({ provider }: { provider: typeof providerData[0] }) {
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
            <div className={`p-2 rounded-lg bg-accent/50 ${getStatusColor(provider.status)}`}>
              <Building className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm">{provider.name}</CardTitle>
              <CardDescription className="text-xs">{provider.specialization}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusBadge(provider.status)}>
              {provider.status}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0"
            >
              <span className="text-xs">{isExpanded ? '−' : '+'}</span>
            </Button>
          </div>
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
          {provider.accreditation && (
            <Badge variant="outline" className="text-xs text-green-600">
              {provider.accreditation}
            </Badge>
          )}
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
            <span className="text-xs truncate">{provider.email}</span>
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

        {/* Expanded Details */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-3 border-t border-border space-y-2"
          >
            <div className="grid grid-cols-2 gap-3 text-sm">
              {provider.established && (
                <div>
                  <span className="text-muted-foreground">Established:</span>
                  <div className="font-medium">{provider.established}</div>
                </div>
              )}
              {provider.beds > 0 && (
                <div>
                  <span className="text-muted-foreground">Beds:</span>
                  <div className="font-medium">{provider.beds}</div>
                </div>
              )}
            </div>
            
            {provider.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-3 w-3 text-muted-foreground" />
                <a 
                  href={provider.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs truncate"
                >
                  {provider.website}
                </a>
              </div>
            )}

            {provider.specialties && provider.specialties.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm">Specialties:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {provider.specialties.slice(0, 4).map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {provider.specialties.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{provider.specialties.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Provider ID: {provider.id.toString().padStart(3, '0')}</span>
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
              <div className="text-2xl font-bold">18</div>
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
              <div className="text-2xl font-bold">4.4</div>
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
              <div className="text-2xl font-bold">38.2K</div>
              <p className="text-xs text-muted-foreground">Total processed</p>
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
              <div className="text-2xl font-bold">1.8h</div>
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