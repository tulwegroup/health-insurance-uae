// UAE Demo Seed Data for HIIS-UAE System

export const uaePayers = [
  {
    id: "PYR-Daman",
    name: "Daman Health Insurance",
    country: "UAE",
    emirate: "Abu Dhabi",
    tier: "A",
    status: "active",
    members: 2500000,
    claimsProcessed: 45000,
    logo: "/logos/daman.png"
  },
  {
    id: "PYR-Oman",
    name: "Oman Insurance Company",
    country: "UAE", 
    emirate: "Dubai",
    tier: "A",
    status: "active",
    members: 1800000,
    claimsProcessed: 32000,
    logo: "/logos/oman.png"
  },
  {
    id: "PYR-NextCare",
    name: "NextCare Insurance",
    country: "UAE",
    emirate: "Dubai", 
    tier: "B",
    status: "active",
    members: 950000,
    claimsProcessed: 18000,
    logo: "/logos/nextcare.png"
  },
  {
    id: "PYR-NAS",
    name: "National Health Insurance Company",
    country: "UAE",
    emirate: "Abu Dhabi",
    tier: "B", 
    status: "active",
    members: 1200000,
    claimsProcessed: 22000,
    logo: "/logos/nas.png"
  },
  {
    id: "PYR-Thiqa",
    name: "Thiqa Program",
    country: "UAE",
    emirate: "Abu Dhabi",
    tier: "A",
    status: "active",
    members: 350000,
    claimsProcessed: 8500,
    logo: "/logos/thiqa.png"
  },
  {
    id: "PYR-Enaya",
    name: "Enaya Insurance",
    country: "UAE",
    emirate: "Dubai",
    tier: "A",
    status: "active",
    members: 680000,
    claimsProcessed: 14500,
    logo: "/logos/enaya.png"
  }
]

export const uaeProviders = [
  {
    id: "HOS-01",
    name: "Cleveland Clinic Abu Dhabi",
    type: "Hospital",
    emirate: "Abu Dhabi",
    network: "A",
    beds: 364,
    specialties: ["Cardiology", "Oncology", "Neurology"],
    claimsCount: 2500,
    rating: 4.8,
    logo: "/providers/cleveland.png"
  },
  {
    id: "HOS-02", 
    name: "Sheikh Khalifa Medical City",
    type: "Hospital",
    emirate: "Abu Dhabi",
    network: "A",
    beds: 568,
    specialties: ["Multi-specialty", "Emergency", "Surgery"],
    claimsCount: 4200,
    rating: 4.6,
    logo: "/providers/skmc.png"
  },
  {
    id: "HOS-03",
    name: "Rashid Hospital",
    type: "Hospital", 
    emirate: "Dubai",
    network: "A",
    beds: 750,
    specialties: ["Trauma", "Emergency", "Surgery"],
    claimsCount: 3800,
    rating: 4.5,
    logo: "/providers/rashid.png"
  },
  {
    id: "HOS-04",
    name: "Dubai Hospital",
    type: "Hospital",
    emirate: "Dubai", 
    network: "A",
    beds: 630,
    specialties: ["Multi-specialty", "Oncology", "Cardiology"],
    claimsCount: 3500,
    rating: 4.4,
    logo: "/providers/dubai.png"
  },
  {
    id: "CLN-05",
    name: "Mediclinic City Hospital",
    type: "Clinic",
    emirate: "Dubai",
    network: "B",
    beds: 240,
    specialties: ["Family Medicine", "Pediatrics", "Obstetrics"],
    claimsCount: 1800,
    rating: 4.3,
    logo: "/providers/mediclinic.png"
  },
  {
    id: "CLN-06",
    name: "American Hospital Dubai",
    type: "Clinic",
    emirate: "Dubai",
    network: "A",
    beds: 180,
    specialties: ["Orthopedics", "Cardiology", "Surgery"],
    claimsCount: 2200,
    rating: 4.7,
    logo: "/providers/american.png"
  },
  {
    id: "PHM-07",
    name: "BinSina Pharmacy",
    type: "Pharmacy",
    emirate: "Dubai",
    network: "Open",
    branches: 45,
    specialties: ["Retail", "Compounding", "Clinical"],
    claimsCount: 8500,
    rating: 4.2,
    logo: "/providers/binsina.png"
  },
  {
    id: "PHM-08",
    name: "Aster Pharmacy",
    type: "Pharmacy",
    emirate: "Dubai",
    network: "Open",
    branches: 120,
    specialties: ["Retail", "Home Delivery", "Clinical"],
    claimsCount: 12000,
    rating: 4.4,
    logo: "/providers/aster.png"
  },
  {
    id: "HOS-09",
    name: "Al Ain Hospital",
    type: "Hospital",
    emirate: "Al Ain",
    network: "B",
    beds: 420,
    specialties: ["Multi-specialty", "Pediatrics", "Emergency"],
    claimsCount: 2100,
    rating: 4.1,
    logo: "/providers/alain.png"
  },
  {
    id: "CLN-10",
    name: "Healthpoint Abu Dhabi",
    type: "Clinic",
    emirate: "Abu Dhabi",
    network: "A",
    beds: 80,
    specialties: ["Primary Care", "Dentistry", "Dermatology"],
    claimsCount: 950,
    rating: 4.6,
    logo: "/providers/healthpoint.png"
  }
]

export const uaeIntegrations = [
  {
    id: "SHAFAFIYA",
    name: "Shafafiya Health Information Exchange",
    emirate: "Abu Dhabi",
    type: "HIE",
    status: "connected",
    latency: 45,
    uptime: 99.8,
    lastSync: "2 min ago",
    messagesPerMinute: 1250,
    dataTypes: ["Eligibility", "Claims", "Clinical"],
    logo: "/integrations/shafafiya.png"
  },
  {
    id: "DHPO",
    name: "DHPO/eClaimLink",
    emirate: "Dubai", 
    type: "Claims Processing",
    status: "connected",
    latency: 38,
    uptime: 99.9,
    lastSync: "1 min ago",
    messagesPerMinute: 2100,
    dataTypes: ["Claims", "Eligibility", "Provider Data"],
    logo: "/integrations/dhpo.png"
  },
  {
    id: "MALAFFI",
    name: "Malaffi Abu Dhabi HIE",
    emirate: "Abu Dhabi",
    type: "HIE",
    status: "connected",
    latency: 52,
    uptime: 99.7,
    lastSync: "3 min ago", 
    messagesPerMinute: 890,
    dataTypes: ["Clinical Records", "Lab Results", "Radiology"],
    logo: "/integrations/malaffi.png"
  },
  {
    id: "NABIDH",
    name: "NABIDH Dubai Health Platform",
    emirate: "Dubai",
    type: "HIE",
    status: "connected",
    latency: 41,
    uptime: 99.6,
    lastSync: "2 min ago",
    messagesPerMinute: 1680,
    dataTypes: ["Clinical Records", "Pharmacy", "Lab Results"],
    logo: "/integrations/nabidh.png"
  },
  {
    id: "RIAYATI",
    name: "Riayati Federal Health Platform",
    emirate: "Federal",
    type: "HIE",
    status: "connected",
    latency: 67,
    uptime: 98.9,
    lastSync: "4 min ago",
    messagesPerMinute: 450,
    dataTypes: ["Federal Records", "Public Health", "Regulatory"],
    logo: "/integrations/riayati.png"
  },
  {
    id: "DHA_API",
    name: "Dubai Health Authority API",
    emirate: "Dubai",
    type: "Regulatory",
    status: "connected",
    latency: 29,
    uptime: 99.95,
    lastSync: "1 min ago",
    messagesPerMinute: 320,
    dataTypes: ["Licensing", "Audit", "Compliance"],
    logo: "/integrations/dha.png"
  }
]

export const syntheticClaims = Array.from({ length: 1500 }, (_, i) => ({
  id: `CLM-2024-${String(i + 1).padStart(4, '0')}`,
  memberId: `MEM-${Math.floor(Math.random() * 500000) + 100000}`,
  providerId: uaeProviders[Math.floor(Math.random() * uaeProviders.length)].id,
  payerId: uaePayers[Math.floor(Math.random() * uaePayers.length)].id,
  amount: Math.floor(Math.random() * 10000) + 100,
  submissionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  serviceDate: new Date(Date.now() - Math.random() * 35 * 24 * 60 * 60 * 1000).toISOString(),
  status: ['approved', 'held', 'processing', 'escalated', 'rejected'][Math.floor(Math.random() * 5)],
  riskScore: Math.random() * 10,
  priority: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
  cptCodes: [`992${Math.floor(Math.random() * 9) + 1}`, `J${Math.floor(Math.random() * 9000) + 1000}`],
  icdCodes: [`I${Math.floor(Math.random() * 99) + 10}.${Math.floor(Math.random() * 9)}`],
  agentVerdicts: {
    memberIdentity: Math.random() > 0.3 ? 'pass' : 'flag',
    clinicalNecessity: Math.random() > 0.2 ? 'pass' : 'flag',
    providerBehavior: Math.random() > 0.15 ? 'pass' : 'flag',
    pharmacyRx: Math.random() > 0.25 ? 'pass' : 'flag',
    networkGraph: Math.random() > 0.1 ? 'pass' : 'flag',
    financialLeakage: Math.random() > 0.18 ? 'pass' : 'flag'
  }
}))

export const agentPerformance = [
  {
    id: "member-identity",
    name: "Member & Identity Agent",
    status: "active",
    accuracy: 98.2,
    throughput: 45,
    queueDepth: 12,
    uptime: 99.8,
    recentDecisions: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 5 * 60 * 1000),
      score: Math.random() * 10,
      verdict: Math.random() > 0.3 ? 'pass' : 'flag'
    }))
  },
  {
    id: "clinical-necessity", 
    name: "Clinical Necessity Agent",
    status: "active",
    accuracy: 96.8,
    throughput: 38,
    queueDepth: 18,
    uptime: 99.5,
    recentDecisions: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 6 * 60 * 1000),
      score: Math.random() * 10,
      verdict: Math.random() > 0.2 ? 'pass' : 'flag'
    }))
  },
  {
    id: "provider-behavior",
    name: "Provider Behavior Agent", 
    status: "active",
    accuracy: 94.5,
    throughput: 42,
    queueDepth: 8,
    uptime: 99.2,
    recentDecisions: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 4 * 60 * 1000),
      score: Math.random() * 10,
      verdict: Math.random() > 0.15 ? 'pass' : 'flag'
    }))
  },
  {
    id: "pharmacy-rx",
    name: "Pharmacy & Rx Agent",
    status: "active", 
    accuracy: 97.1,
    throughput: 52,
    queueDepth: 5,
    uptime: 99.7,
    recentDecisions: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 3 * 60 * 1000),
      score: Math.random() * 10,
      verdict: Math.random() > 0.25 ? 'pass' : 'flag'
    }))
  },
  {
    id: "network-graph",
    name: "Network Graph Agent",
    status: "processing",
    accuracy: 92.3,
    throughput: 28,
    queueDepth: 35,
    uptime: 98.8,
    recentDecisions: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 8 * 60 * 1000),
      score: Math.random() * 10,
      verdict: Math.random() > 0.1 ? 'pass' : 'flag'
    }))
  },
  {
    id: "financial-leakage",
    name: "Financial & Leakage Agent",
    status: "active",
    accuracy: 95.7,
    throughput: 48,
    queueDepth: 15,
    uptime: 99.4,
    recentDecisions: Array.from({ length: 10 }, (_, i) => ({
      timestamp: new Date(Date.now() - i * 5 * 60 * 1000),
      score: Math.random() * 10,
      verdict: Math.random() > 0.18 ? 'pass' : 'flag'
    }))
  }
]

export const systemMetrics = {
  totalClaims: syntheticClaims.length,
  processingClaims: syntheticClaims.filter(c => c.status === 'processing').length,
  approvedClaims: syntheticClaims.filter(c => c.status === 'approved').length,
  heldClaims: syntheticClaims.filter(c => c.status === 'held').length,
  escalatedClaims: syntheticClaims.filter(c => c.status === 'escalated').length,
  rejectedClaims: syntheticClaims.filter(c => c.status === 'rejected').length,
  totalSavings: syntheticClaims
    .filter(c => c.riskScore > 6)
    .reduce((sum, c) => sum + c.amount * 0.85, 0),
  averageRiskScore: syntheticClaims.reduce((sum, c) => sum + c.riskScore, 0) / syntheticClaims.length,
  systemUptime: 99.97,
  activeAgents: agentPerformance.filter(a => a.status === 'active').length,
  integrationHealth: uaeIntegrations.filter(i => i.status === 'connected').length / uaeIntegrations.length * 100
}

export const regulatorTemplates = {
  DHA: {
    name: "Dubai Health Authority",
    logo: "/regulators/dha.png",
    requiredSections: ["Executive Summary", "Claim Details", "Clinical Justification", "Provider Analysis", "Compliance Status"],
    format: "PDF",
    branding: {
      primaryColor: "#0066CC",
      secondaryColor: "#FFD700"
    }
  },
  DOH: {
    name: "Department of Health Abu Dhabi",
    logo: "/regulators/doh.png", 
    requiredSections: ["Overview", "Investigation Findings", "Evidence Package", "Recommendations", "Action Plan"],
    format: "PDF",
    branding: {
      primaryColor: "#003366",
      secondaryColor: "#FFD700"
    }
  },
  MOHAP: {
    name: "Ministry of Health & Prevention",
    logo: "/regulators/mohap.png",
    requiredSections: ["Federal Compliance", "National Standards", "Cross-Emirate Analysis", "Policy Impact", "Statistical Summary"],
    format: "PDF",
    branding: {
      primaryColor: "#004080",
      secondaryColor: "#FFD700"
    }
  }
}

export const liveEvents = [
  {
    id: "evt-001",
    type: "claim_flagged",
    message: "High-risk claim CLM-2024-0892 flagged by Network Graph Agent",
    timestamp: new Date(),
    severity: "warning",
    claimId: "CLM-2024-0892",
    agentId: "network-graph"
  },
  {
    id: "evt-002", 
    type: "agent_decision",
    message: "Member & Identity Agent verified identity for claim CLM-2024-0891",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    severity: "success",
    claimId: "CLM-2024-0891",
    agentId: "member-identity"
  },
  {
    id: "evt-003",
    type: "integration_sync",
    message: "Shafafiya HIE synchronized successfully - 1,250 records processed",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    severity: "info",
    integrationId: "SHAFAFIYA"
  },
  {
    id: "evt-004",
    type: "vault_release",
    message: "Digital Vault released 45 claims for payment processing",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    severity: "success",
    count: 45
  },
  {
    id: "evt-005",
    type: "regulator_export",
    message: "DHA evidence package generated for 23 escalated claims",
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    severity: "info",
    regulator: "DHA",
    count: 23
  }
]