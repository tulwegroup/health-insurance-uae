'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
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
  Users,
  FileText,
  DollarSign,
  Handshake,
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

// Comprehensive UAE Health Insurance Companies Database
const insurerData = [
  {
    id: 1,
    name: "Abu Dhabi National Insurance Company (ADNIC)",
    status: "active",
    rating: 4.7,
    type: "National Insurer",
    location: "Abu Dhabi",
    ceo: "Mr. Khalifa Salem Al Dhaheri",
    established: "1972",
    employees: 1200,
    marketShare: "12.5%",
    grossPremium: "AED 4.2B",
    claimsProcessed: 45678,
    responseTime: "24 hours",
    contact: "+971-2-672-2222",
    email: "info@adnic.ae",
    website: "https://www.adnic.ae",
    licenseNumber: "IC-001",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 145,
    networkClinics: 320,
    specialties: ["Health", "Life", "Motor", "Property"],
    takafulProducts: false,
    digitalServices: ["Mobile App", "Online Portal", "WhatsApp Support"],
    accreditation: ["ISO 9001", "CMA"],
    customerSatisfaction: 87,
    claimSettlementRatio: 94,
    solvencyRatio: 185,
    branches: 25,
    countries: 5
  },
  {
    id: 2,
    name: "Dubai National Insurance & Reinsurance (DNIR)",
    status: "active",
    rating: 4.5,
    type: "National Insurer",
    location: "Dubai",
    ceo: "Mr. Ali Saeed Bin Harmal",
    established: "1991",
    employees: 450,
    marketShare: "8.3%",
    grossPremium: "AED 2.8B",
    claimsProcessed: 32145,
    responseTime: "48 hours",
    contact: "+971-4-330-4444",
    email: "info@dnir.ae",
    website: "https://www.dnir.ae",
    licenseNumber: "IC-015",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 98,
    networkClinics: 210,
    specialties: ["Health", "Motor", "Engineering", "Aviation"],
    takafulProducts: false,
    digitalServices: ["Online Portal", "Mobile App"],
    accreditation: ["ISO 9001"],
    customerSatisfaction: 84,
    claimSettlementRatio: 91,
    solvencyRatio: 172,
    branches: 12,
    countries: 3
  },
  {
    id: 3,
    name: "Oman Insurance Company",
    status: "active",
    rating: 4.8,
    type: "International Insurer",
    location: "Dubai",
    ceo: "Mr. Jean-Louis Laurent Josi",
    established: "1975",
    employees: 800,
    marketShare: "10.2%",
    grossPremium: "AED 3.4B",
    claimsProcessed: 38923,
    responseTime: "18 hours",
    contact: "+971-4-262-7777",
    email: "info@omaninsurance.com",
    website: "https://www.omaninsurance.com",
    licenseNumber: "IC-003",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 125,
    networkClinics: 280,
    specialties: ["Health", "Motor", "Home", "Travel"],
    takafulProducts: false,
    digitalServices: ["Mobile App", "Online Portal", "AI Chatbot"],
    accreditation: ["ISO 9001", "CMA"],
    customerSatisfaction: 89,
    claimSettlementRatio: 96,
    solvencyRatio: 195,
    branches: 18,
    countries: 8
  },
  {
    id: 4,
    name: "Al Ain Ahlia Insurance Company",
    status: "active",
    rating: 4.4,
    type: "National Insurer",
    location: "Al Ain",
    ceo: "Mr. Sultan Al Dhaheri",
    established: "1975",
    employees: 350,
    marketShare: "6.8%",
    grossPremium: "AED 2.3B",
    claimsProcessed: 28765,
    responseTime: "36 hours",
    contact: "+971-3-766-4444",
    email: "info@aaainsurance.ae",
    website: "https://www.aaainsurance.ae",
    licenseNumber: "IC-004",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 85,
    networkClinics: 180,
    specialties: ["Health", "Motor", "Property"],
    takafulProducts: false,
    digitalServices: ["Online Portal", "Mobile App"],
    accreditation: ["ISO 9001"],
    customerSatisfaction: 82,
    claimSettlementRatio: 88,
    solvencyRatio: 165,
    branches: 15,
    countries: 2
  },
  {
    id: 5,
    name: "AXA Gulf",
    status: "active",
    rating: 4.6,
    type: "International Insurer",
    location: "Dubai",
    ceo: "Mr. Jerome Droch",
    established: "1950",
    employees: 900,
    marketShare: "11.4%",
    grossPremium: "AED 3.8B",
    claimsProcessed: 42341,
    responseTime: "12 hours",
    contact: "+971-4-703-0000",
    email: "customerservice@axa-gulf.com",
    website: "https://www.axa-gulf.com",
    licenseNumber: "IC-007",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 160,
    networkClinics: 350,
    specialties: ["Health", "Life", "Motor", "Travel", "Home"],
    takafulProducts: false,
    digitalServices: ["Mobile App", "Online Portal", "AI Assistant", "Telemedicine"],
    accreditation: ["ISO 9001", "Global AXA Standards"],
    customerSatisfaction: 86,
    claimSettlementRatio: 93,
    solvencyRatio: 188,
    branches: 22,
    countries: 12
  },
  {
    id: 6,
    name: "MetLife Alico",
    status: "active",
    rating: 4.5,
    type: "International Insurer",
    location: "Dubai",
    ceo: "Mr. Michel Khalaf",
    established: "1868",
    employees: 650,
    marketShare: "9.1%",
    grossPremium: "AED 3.1B",
    claimsProcessed: 35678,
    responseTime: "24 hours",
    contact: "+971-4-450-7700",
    email: "customerservice@metlife.ae",
    website: "https://www.metlife.ae",
    licenseNumber: "IC-008",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 110,
    networkClinics: 240,
    specialties: ["Health", "Life", "Accident", "Group Insurance"],
    takafulProducts: false,
    digitalServices: ["Mobile App", "Online Portal", "Wellness Programs"],
    accreditation: ["ISO 9001", "Global MetLife Standards"],
    customerSatisfaction: 85,
    claimSettlementRatio: 92,
    solvencyRatio: 178,
    branches: 16,
    countries: 15
  },
  {
    id: 7,
    name: "Noor Takaful",
    status: "active",
    rating: 4.3,
    type: "Takaful Insurer",
    location: "Dubai",
    ceo: "Mr. Othman Al Ali",
    established: "2006",
    employees: 280,
    marketShare: "5.2%",
    grossPremium: "AED 1.8B",
    claimsProcessed: 19876,
    responseTime: "48 hours",
    contact: "+971-4-702-8000",
    email: "info@noortakaful.ae",
    website: "https://www.noortakaful.ae",
    licenseNumber: "IC-012",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 75,
    networkClinics: 160,
    specialties: ["Health", "Motor", "Family Takaful", "General Takaful"],
    takafulProducts: true,
    digitalServices: ["Online Portal", "Mobile App"],
    accreditation: ["ISO 9001", "AAOIFI"],
    customerSatisfaction: 81,
    claimSettlementRatio: 87,
    solvencyRatio: 158,
    branches: 10,
    countries: 3
  },
  {
    id: 8,
    name: "Dar Al Takaful",
    status: "active",
    rating: 4.2,
    type: "Takaful Insurer",
    location: "Dubai",
    ceo: "Mr. Hassan Ali Al Shamsi",
    established: "2008",
    employees: 220,
    marketShare: "4.1%",
    grossPremium: "AED 1.4B",
    claimsProcessed: 15432,
    responseTime: "72 hours",
    contact: "+971-4-434-9000",
    email: "info@daraltakaful.ae",
    website: "https://www.daraltakaful.ae",
    licenseNumber: "IC-018",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 65,
    networkClinics: 140,
    specialties: ["Health", "Motor", "Family Takaful"],
    takafulProducts: true,
    digitalServices: ["Online Portal"],
    accreditation: ["ISO 9001", "AAOIFI"],
    customerSatisfaction: 79,
    claimSettlementRatio: 85,
    solvencyRatio: 152,
    branches: 8,
    countries: 2
  },
  {
    id: 9,
    name: "Islamic Arab Insurance Company (SALAMA)",
    status: "active",
    rating: 4.1,
    type: "Takaful Insurer",
    location: "Dubai",
    ceo: "Mr. Waleed Al Muhairi",
    established: "1979",
    employees: 200,
    marketShare: "3.8%",
    grossPremium: "AED 1.3B",
    claimsProcessed: 14567,
    responseTime: "72 hours",
    contact: "+971-4-295-6000",
    email: "info@salama.ae",
    website: "https://www.salama.ae",
    licenseNumber: "IC-005",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 60,
    networkClinics: 130,
    specialties: ["Health", "Motor", "Family Takaful", "General Takaful"],
    takafulProducts: true,
    digitalServices: ["Online Portal"],
    accreditation: ["ISO 9001", "AAOIFI"],
    customerSatisfaction: 78,
    claimSettlementRatio: 84,
    solvencyRatio: 148,
    branches: 7,
    countries: 2
  },
  {
    id: 10,
    name: "Union Insurance Company",
    status: "active",
    rating: 4.4,
    type: "National Insurer",
    location: "Dubai",
    ceo: "Mr. Moustafa Abdel Motaal",
    established: "1998",
    employees: 320,
    marketShare: "5.6%",
    grossPremium: "AED 1.9B",
    claimsProcessed: 21345,
    responseTime: "36 hours",
    contact: "+971-4-331-9000",
    email: "info@unioninsurance.ae",
    website: "https://www.unioninsurance.ae",
    licenseNumber: "IC-014",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 80,
    networkClinics: 170,
    specialties: ["Health", "Motor", "Property", "Engineering"],
    takafulProducts: false,
    digitalServices: ["Online Portal", "Mobile App"],
    accreditation: ["ISO 9001"],
    customerSatisfaction: 83,
    claimSettlementRatio: 89,
    solvencyRatio: 162,
    branches: 12,
    countries: 4
  },
  {
    id: 11,
    name: "Watania International Insurance",
    status: "active",
    rating: 4.3,
    type: "National Insurer",
    location: "Abu Dhabi",
    ceo: "Mr. Mohammed Saif Al Mazrouei",
    established: "2005",
    employees: 280,
    marketShare: "4.9%",
    grossPremium: "AED 1.7B",
    claimsProcessed: 19234,
    responseTime: "48 hours",
    contact: "+971-2-633-4444",
    email: "info@watania.ae",
    website: "https://www.watania.ae",
    licenseNumber: "IC-016",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 70,
    networkClinics: 150,
    specialties: ["Health", "Motor", "Property"],
    takafulProducts: false,
    digitalServices: ["Online Portal", "Mobile App"],
    accreditation: ["ISO 9001"],
    customerSatisfaction: 80,
    claimSettlementRatio: 86,
    solvencyRatio: 155,
    branches: 10,
    countries: 3
  },
  {
    id: 12,
    name: "Qatar Insurance Company (QIC) - UAE",
    status: "active",
    rating: 4.5,
    type: "International Insurer",
    location: "Dubai",
    ceo: "Mr. Khalifa Al Kuwari",
    established: "1964",
    employees: 400,
    marketShare: "6.2%",
    grossPremium: "AED 2.1B",
    claimsProcessed: 24567,
    responseTime: "30 hours",
    contact: "+971-4-375-5000",
    email: "info@qic.com",
    website: "https://www.qic.com",
    licenseNumber: "IC-020",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 90,
    networkClinics: 190,
    specialties: ["Health", "Motor", "Property", "Energy"],
    takafulProducts: false,
    digitalServices: ["Online Portal", "Mobile App"],
    accreditation: ["ISO 9001", "AM Best"],
    customerSatisfaction: 84,
    claimSettlementRatio: 90,
    solvencyRatio: 168,
    branches: 14,
    countries: 25
  },
  {
    id: 13,
    name: "RSA Insurance (UAE)",
    status: "active",
    rating: 4.4,
    type: "International Insurer",
    location: "Dubai",
    ceo: "Mr. David McElroy",
    established: "1996",
    employees: 350,
    marketShare: "5.8%",
    grossPremium: "AED 2.0B",
    claimsProcessed: 22345,
    responseTime: "36 hours",
    contact: "+971-4-332-4400",
    email: "info@rsa.ae",
    website: "https://www.rsagroup.ae",
    licenseNumber: "IC-021",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 85,
    networkClinics: 175,
    specialties: ["Health", "Motor", "Property", "Engineering"],
    takafulProducts: false,
    digitalServices: ["Online Portal", "Mobile App"],
    accreditation: ["ISO 9001"],
    customerSatisfaction: 82,
    claimSettlementRatio: 88,
    solvencyRatio: 160,
    branches: 11,
    countries: 8
  },
  {
    id: 14,
    name: "Allied Insurance",
    status: "active",
    rating: 4.2,
    type: "National Insurer",
    location: "Dubai",
    ceo: "Mr. Abdul Muttalib",
    established: "1975",
    employees: 250,
    marketShare: "4.5%",
    grossPremium: "AED 1.5B",
    claimsProcessed: 16789,
    responseTime: "48 hours",
    contact: "+971-4-398-9000",
    email: "info@allied.ae",
    website: "https://www.allied.ae",
    licenseNumber: "IC-009",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 68,
    networkClinics: 145,
    specialties: ["Health", "Motor", "Property"],
    takafulProducts: false,
    digitalServices: ["Online Portal"],
    accreditation: ["ISO 9001"],
    customerSatisfaction: 79,
    claimSettlementRatio: 85,
    solvencyRatio: 150,
    branches: 9,
    countries: 3
  },
  {
    id: 15,
    name: "Arabian Scandinavian Insurance (ASCO)",
    status: "active",
    rating: 4.3,
    type: "National Insurer",
    location: "Dubai",
    ceo: "Mr. Rami Abu Ghazaleh",
    established: "1975",
    employees: 200,
    marketShare: "3.9%",
    grossPremium: "AED 1.3B",
    claimsProcessed: 14567,
    responseTime: "48 hours",
    contact: "+971-4-343-8000",
    email: "info@asco.ae",
    website: "https://www.asco.ae",
    licenseNumber: "IC-010",
    regulatoryBody: "Insurance Authority",
    networkHospitals: 62,
    networkClinics: 135,
    specialties: ["Health", "Motor", "Property", "Marine"],
    takafulProducts: false,
    digitalServices: ["Online Portal"],
    accreditation: ["ISO 9001"],
    customerSatisfaction: 80,
    claimSettlementRatio: 86,
    solvencyRatio: 152,
    branches: 8,
    countries: 4
  }
]

// Insurer Card Component
function InsurerCard({ insurer }: { insurer: typeof insurerData[0] }) {
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
            <div className={`p-2 rounded-lg bg-accent/50 ${getStatusColor(insurer.status)}`}>
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm">{insurer.name}</CardTitle>
              <CardDescription className="text-xs">{insurer.type}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getStatusBadge(insurer.status)}>
              {insurer.status}
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
                  i < Math.floor(insurer.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              {insurer.rating}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {insurer.marketShare}
          </Badge>
          {insurer.takafulProducts && (
            <Badge variant="outline" className="text-xs text-green-600">
              Takaful
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{insurer.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="h-3 w-3" />
            <span className="text-xs">{insurer.contact}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-3 w-3" />
            <span className="text-xs truncate">{insurer.email}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Claims Processed:</span>
            <div className="font-medium">{insurer.claimsProcessed.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Response Time:</span>
            <div className="font-medium">{insurer.responseTime}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Network Hospitals:</span>
            <div className="font-medium">{insurer.networkHospitals}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Network Clinics:</span>
            <div className="font-medium">{insurer.networkClinics}</div>
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
                <span className="text-muted-foreground">Established:</span>
                <div className="font-medium">{insurer.established}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Employees:</span>
                <div className="font-medium">{insurer.employees.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">CEO:</span>
                <div className="font-medium text-xs">{insurer.ceo}</div>
              </div>
              <div>
                <span className="text-muted-foreground">License:</span>
                <div className="font-medium text-xs">{insurer.licenseNumber}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Gross Premium:</span>
                <div className="font-medium">{insurer.grossPremium}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Customer Satisfaction:</span>
                <div className="font-medium">{insurer.customerSatisfaction}%</div>
              </div>
              <div>
                <span className="text-muted-foreground">Claim Settlement:</span>
                <div className="font-medium">{insurer.claimSettlementRatio}%</div>
              </div>
              <div>
                <span className="text-muted-foreground">Solvency Ratio:</span>
                <div className="font-medium">{insurer.solvencyRatio}%</div>
              </div>
            </div>

            {insurer.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-3 w-3 text-muted-foreground" />
                <a 
                  href={insurer.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-xs truncate"
                >
                  {insurer.website}
                </a>
              </div>
            )}

            {insurer.specialties && insurer.specialties.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm">Specialties:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {insurer.specialties.slice(0, 4).map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                  {insurer.specialties.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{insurer.specialties.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {insurer.digitalServices && insurer.digitalServices.length > 0 && (
              <div>
                <span className="text-muted-foreground text-sm">Digital Services:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {insurer.digitalServices.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>License: {insurer.licenseNumber}</span>
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

export default function InsurersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const filteredInsurers = insurerData.filter(insurer => {
    const matchesSearch = insurer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         insurer.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || insurer.status === filterStatus
    const matchesType = filterType === 'all' || insurer.type === filterType
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Insurance Companies</h1>
          <p className="text-muted-foreground">Manage UAE health insurance providers and their networks</p>
        </div>
        <Button className="bg-gold hover:bg-gold/90 text-black">
          <Shield className="h-4 w-4 mr-2" />
          Add Insurer
        </Button>
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
              <CardTitle className="text-sm font-medium">Active Insurers</CardTitle>
              <Shield className="h-4 w-4 text-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">Licensed companies</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.4</div>
              <p className="text-xs text-muted-foreground">Out of 5.0</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">423.5K</div>
              <p className="text-xs text-muted-foreground">Processed annually</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Market Coverage</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">AED 38.5B</div>
              <p className="text-xs text-muted-foreground">Total premiums</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search insurers..."
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
              <TabsTrigger value="National Insurer">National</TabsTrigger>
              <TabsTrigger value="International Insurer">International</TabsTrigger>
              <TabsTrigger value="Takaful Insurer">Takaful</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Insurers Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredInsurers.map((insurer) => (
          <InsurerCard key={insurer.id} insurer={insurer} />
        ))}
      </motion.div>

      {filteredInsurers.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">No insurers found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}