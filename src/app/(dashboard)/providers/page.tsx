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
  Download,
  Upload,
  Database,
  Shield,
  FileText,
  RefreshCw,
  Settings,
  ExternalLink
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

// Provider data imported from various sources
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
    specialties: ["Cardiology", "Oncology", "Neurology", "Orthopedics", "Pediatrics"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-15",
    insurerNetworks: ["ADNIC", "AXA Gulf", "Oman Insurance", "MetLife"],
    licenseNumber: "DHA-H-001",
    regulatoryStatus: "Compliant"
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
    specialties: ["Cardiology", "Surgery", "Obstetrics", "Emergency Medicine", "Radiology"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-14",
    insurerNetworks: ["ADNIC", "Oman Insurance", "AXA Gulf", "Noor Takaful"],
    licenseNumber: "DHA-H-002",
    regulatoryStatus: "Compliant"
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
    specialties: ["Internal Medicine", "Surgery", "Pediatrics", "Gynecology", "ICU"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-13",
    insurerNetworks: ["ADNIC", "Union Insurance", "Watania"],
    licenseNumber: "DHA-H-003",
    regulatoryStatus: "Compliant"
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
    specialties: ["Cardiology", "Neurosurgery", "Oncology", "Transplant", "Emergency"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-12",
    insurerNetworks: ["AXA Gulf", "Oman Insurance", "MetLife"],
    licenseNumber: "DHA-H-004",
    regulatoryStatus: "Compliant"
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
    specialties: ["General Medicine", "Surgery", "Maternity", "Pediatrics", "Dentistry"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-11",
    insurerNetworks: ["ADNIC", "Oman Insurance", "Allied Insurance"],
    licenseNumber: "DHA-H-005",
    regulatoryStatus: "Compliant"
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
    specialties: ["Cardiology", "Neurology", "Gastroenterology", "Orthopedics", "Internal Medicine"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-10",
    insurerNetworks: ["AXA Gulf", "Oman Insurance", "MetLife"],
    licenseNumber: "DHA-H-006",
    regulatoryStatus: "Compliant"
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
    specialties: ["Cardiology", "Oncology", "Neurosurgery", "Urology", "Laparoscopic Surgery"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-09",
    insurerNetworks: ["ADNIC", "Union Insurance", "Watania"],
    licenseNumber: "DHA-H-007",
    regulatoryStatus: "Compliant"
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
    specialties: ["Family Medicine", "Dentistry", "Dermatology", "Pediatrics", "Internal Medicine"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-08",
    insurerNetworks: ["AXA Gulf", "Oman Insurance", "Noor Takaful"],
    licenseNumber: "DHA-MC-001",
    regulatoryStatus: "Compliant"
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
    specialties: ["Cardiology", "Surgery", "Orthopedics", "Emergency", "ICU"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-07",
    insurerNetworks: ["ADNIC", "Oman Insurance", "MetLife"],
    licenseNumber: "DHA-H-008",
    regulatoryStatus: "Compliant"
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
    specialties: ["Cardiology", "Neurosurgery", "Oncology", "Pediatrics", "Maternity"],
    dataSource: "DHA Registry",
    lastUpdated: "2024-01-06",
    insurerNetworks: ["AXA Gulf", "Oman Insurance", "Union Insurance"],
    licenseNumber: "DHA-H-009",
    regulatoryStatus: "Compliant"
  }
]

// Data sources for provider imports
const dataSources = [
  {
    id: 1,
    name: "Dubai Health Authority (DHA)",
    type: "Regulatory",
    status: "connected",
    lastSync: "2024-01-15 08:30",
    providersCount: 245,
    description: "Dubai healthcare facilities registry",
    icon: Shield,
    color: "text-blue-600"
  },
  {
    id: 2,
    name: "Abu Dhabi Health Authority (DOH)",
    type: "Regulatory",
    status: "connected",
    lastSync: "2024-01-15 09:15",
    providersCount: 189,
    description: "Abu Dhabi healthcare facilities registry",
    icon: Shield,
    color: "text-green-600"
  },
  {
    id: 3,
    name: "Ministry of Health (MOHAP)",
    type: "Regulatory",
    status: "connected",
    lastSync: "2024-01-15 07:45",
    providersCount: 156,
    description: "Northern Emirates healthcare facilities",
    icon: Shield,
    color: "text-purple-600"
  },
  {
    id: 4,
    name: "ADNIC Provider Network",
    type: "Insurer",
    status: "connected",
    lastSync: "2024-01-15 10:00",
    providersCount: 145,
    description: "ADNIC approved healthcare providers",
    icon: Building,
    color: "text-orange-600"
  },
  {
    id: 5,
    name: "AXA Gulf Provider Network",
    type: "Insurer",
    status: "connected",
    lastSync: "2024-01-15 10:30",
    providersCount: 160,
    description: "AXA Gulf approved healthcare providers",
    icon: Building,
    color: "text-red-600"
  },
  {
    id: 6,
    name: "Oman Insurance Provider Network",
    type: "Insurer",
    status: "connected",
    lastSync: "2024-01-15 11:00",
    providersCount: 125,
    description: "Oman Insurance approved healthcare providers",
    icon: Building,
    color: "text-cyan-600"
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
              <div>
                <span className="text-muted-foreground">Data Source:</span>
                <div className="font-medium">{provider.dataSource}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Last Updated:</span>
                <div className="font-medium">{provider.lastUpdated}</div>
              </div>
              <div>
                <span className="text-muted-foreground">License:</span>
                <div className="font-medium text-xs">{provider.licenseNumber}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Regulatory Status:</span>
                <div className="font-medium text-xs text-green-600">{provider.regulatoryStatus}</div>
              </div>
            </div>

            {provider.insurerNetworks && provider.insurerNetworks.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm">Insurer Networks:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {provider.insurerNetworks.slice(0, 3).map((insurer, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {insurer}
                    </Badge>
                  ))}
                  {provider.insurerNetworks.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{provider.insurerNetworks.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {provider.specialties && provider.specialties.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm">Specialties:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {provider.specialties.slice(0, 4).map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
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
          <span>Source: {provider.dataSource}</span>
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

// Data Source Card Component
function DataSourceCard({ source }: { source: typeof dataSources[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const handleSync = async () => {
    setIsSyncing(true)
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSyncing(false)
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
            <div className={`p-2 rounded-lg bg-accent/50 ${source.color}`}>
              <source.icon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm">{source.name}</CardTitle>
              <CardDescription className="text-xs">{source.description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={source.status === 'connected' ? 'default' : 'secondary'}>
              {source.status}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {source.type}
            </Badge>
            <div className="text-xs text-muted-foreground">
              {source.providersCount} providers
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={isSyncing}
            className="text-xs"
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync'}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground">
          Last sync: {source.lastSync}
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-3 border-t border-border space-y-2"
          >
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs flex-1">
                <Settings className="h-3 w-3 mr-1" />
                Configure
              </Button>
              <Button variant="outline" size="sm" className="text-xs flex-1">
                <ExternalLink className="h-3 w-3 mr-1" />
                Portal
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </motion.div>
  )
}

export default function ProvidersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [activeTab, setActiveTab] = useState('providers')

  const filteredProviders = providerData.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || provider.status === filterStatus
    const matchesType = filterType === 'all' || provider.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Healthcare Providers</h1>
          <p className="text-muted-foreground">Import and manage healthcare providers from regulators and insurers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-gold hover:bg-gold/90 text-black">
            <Upload className="h-4 w-4 mr-2" />
            Import Providers
          </Button>
          <Button className="bg-gold hover:bg-gold/90 text-black">
            <Users className="h-4 w-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
              <Users className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
              <p className="text-xs text-muted-foreground">Active providers</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Sources</CardTitle>
              <Database className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Connected sources</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Import Success</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">Data accuracy</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <p className="text-xs text-muted-foreground">Since last update</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="providers">Providers</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search providers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Tabs value={filterStatus} onValueChange={setFilterStatus}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                </TabsList>
              </Tabs>
              <Tabs value={filterType} onValueChange={setFilterType}>
                <TabsList>
                  <TabsTrigger value="all">All Types</TabsTrigger>
                  <TabsTrigger value="Hospital">Hospitals</TabsTrigger>
                  <TabsTrigger value="Medical Center">Clinics</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Providers Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </motion.div>

          {filteredProviders.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No providers found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Data Sources</h3>
              <p className="text-sm text-muted-foreground">Manage connections to regulatory bodies and insurer networks</p>
            </div>
            <Button variant="outline" className="bg-gold hover:bg-gold/90 text-black">
              <Database className="h-4 w-4 mr-2" />
              Add Source
            </Button>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {dataSources.map((source) => (
              <DataSourceCard key={source.id} source={source} />
            ))}
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}