// Mock data service for Netlify static deployment
// This replaces the database calls with static data

export const mockSystemMetrics = {
  totalClaims: 1247,
  processingClaims: 89,
  approvedClaims: 856,
  heldClaims: 45,
  escalatedClaims: 12,
  rejectedClaims: 31,
  totalSavings: 2847500,
  riskScore: 3.2,
  systemUptime: 99.97
}

export const mockAgentStatus = [
  { name: 'Member & Identity Agent', status: 'active', claimsProcessed: 423, accuracy: 98.2 },
  { name: 'Clinical Necessity Agent', status: 'active', claimsProcessed: 389, accuracy: 96.8 },
  { name: 'Provider Behavior Agent', status: 'active', claimsProcessed: 401, accuracy: 94.5 },
  { name: 'Pharmacy & Rx Agent', status: 'active', claimsProcessed: 367, accuracy: 97.1 },
  { name: 'Network Graph Agent', status: 'processing', claimsProcessed: 298, accuracy: 92.3 },
  { name: 'Financial & Leakage Agent', status: 'active', claimsProcessed: 445, accuracy: 95.7 }
]

export const mockIntegrationStatus = [
  { name: 'Shafafiya (Abu Dhabi)', status: 'connected', lastSync: '2 min ago' },
  { name: 'DHPO/eClaimLink (Dubai)', status: 'connected', lastSync: '1 min ago' },
  { name: 'Malaffi (Abu Dhabi HIE)', status: 'connected', lastSync: '3 min ago' },
  { name: 'NABIDH (Dubai)', status: 'connected', lastSync: '2 min ago' },
  { name: 'Riayati (Federal)', status: 'connected', lastSync: '4 min ago' },
  { name: 'DHA/DoH/MOHAP APIs', status: 'connected', lastSync: '1 min ago' }
]

export const mockRecentClaims = [
  { id: 'CLM-2024-0892', amount: 1250, status: 'approved', riskScore: 1.2, provider: 'Dubai Medical Center' },
  { id: 'CLM-2024-0891', amount: 3400, status: 'held', riskScore: 7.8, provider: 'Abu Dhabi Pharmacy' },
  { id: 'CLM-2024-0890', amount: 890, status: 'processing', riskScore: 3.1, provider: 'Al Ain Hospital' },
  { id: 'CLM-2024-0889', amount: 2100, status: 'escalated', riskScore: 8.9, provider: 'Sharjah Clinic' },
  { id: 'CLM-2024-0888', amount: 560, status: 'approved', riskScore: 0.8, provider: 'Fujairah Medical' }
]

export const mockRegulatorData = {
  dha: { evidencePackages: 234, complianceScore: 98.5, lastAudit: '2024-01-15' },
  doh: { evidencePackages: 189, complianceScore: 97.2, lastAudit: '2024-01-12' },
  mohap: { evidencePackages: 156, complianceScore: 96.8, lastAudit: '2024-01-10' }
}

export const mockVaultData = {
  heldClaims: 45,
  releasedToday: 127,
  escalated: 12,
  totalValue: 2847500,
  encryptionStatus: 'AES-256 Active'
}

export const mockAnalyticsData = {
  detectionPatterns: [
    { name: 'Identity Fraud Detection', improvement: 15 },
    { name: 'Clinical Necessity Validation', improvement: 8 },
    { name: 'Provider Behavior Analysis', improvement: 12 },
    { name: 'Network Collusion Detection', improvement: 22 }
  ],
  complianceMetrics: [
    { name: 'DHA Audit Directives', status: 'Compliant' },
    { name: 'DoH Standards', status: 'Compliant' },
    { name: 'MOHAP Guidelines', status: 'Compliant' },
    { name: 'UAE Data Law 45 (2021)', status: 'Compliant' }
  ]
}