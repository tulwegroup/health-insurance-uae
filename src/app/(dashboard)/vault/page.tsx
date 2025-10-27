'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Lock, 
  Key, 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  Search, 
  Filter, 
  MoreVertical, 
  Calendar, 
  Clock, 
  User, 
  Building, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Badge as BadgeIcon,
  FolderOpen,
  Archive,
  Trash2,
  Share,
  Copy,
  Edit,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Database,
  HardDrive,
  Cloud,
  Fingerprint,
  ShieldCheck,
  ShieldAlert,
  FileSignature,
  FileCheck,
  FileX,
  FileWarning,
  FileImage,
  FileVideo,
  FileAudio,
  FileCode,
  FilePlus,
  FolderPlus,
  Settings,
  DownloadCloud,
  UploadCloud,
  Link,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Wallet,
  Banknote,
  Receipt,
  Invoice,
  FileSearch,
  FileBarChart,
  FileSpreadsheet,
  FileQuestion,
  FileLock,
  FileUnlock,
  FileKey,

  FileMedical,
  FileInsurance,
  FileBank,
  FileTax,
  FileLegal,

  FileCompliance,
  FileRegulation,
  FilePolicy,
  FileProcedure,
  FileGuideline,
  FileStandard,
  FileProtocol,
  FileMethod,
  FileTechnique,
  FileProcess,
  FileWorkflow,
  FileSystem,
  FileArchitecture,
  FileDesign,
  FilePlan,
  FileReport,
  FileSummary,
  FileAnalysis,
  FileEvaluation,

  FileReview,
  FileInspection,
  FileInvestigation,
  FileExamination,
  FileTest,
  FileVerification,
  FileValidation,
  FileAuthentication,
  FileAuthorization,
  FilePermission,
  FileAccess,
  FileSecurity,
  FilePrivacy,
  FileConfidentiality,
  FileIntegrity,
  FileAvailability,
  FileReliability,
  FilePerformance,
  FileEfficiency,
  FileEffectiveness,
  FileQuality,
  FileCompliance as FileComplianceIcon,
  FileRegulation as FileRegulationIcon,
  FilePolicy as FilePolicyIcon,
  FileProcedure as FileProcedureIcon,
  FileGuideline as FileGuidelineIcon,
  FileStandard as FileStandardIcon,
  FileProtocol as FileProtocolIcon,
  FileMethod as FileMethodIcon,
  FileTechnique as FileTechniqueIcon,
  FileProcess as FileProcessIcon,
  FileWorkflow as FileWorkflowIcon,
  FileSystem as FileSystemIcon,
  FileArchitecture as FileArchitectureIcon,
  FileDesign as FileDesignIcon,
  FilePlan as FilePlanIcon,
  FileReport as FileReportIcon,
  FileSummary as FileSummaryIcon,
  FileAnalysis as FileAnalysisIcon,
  FileEvaluation as FileEvaluationIcon,

  FileReview as FileReviewIcon,
  FileInspection as FileInspectionIcon,
  FileInvestigation as FileInvestigationIcon,
  FileExamination as FileExaminationIcon,
  FileTest as FileTestIcon,
  FileVerification as FileVerificationIcon,
  FileValidation as FileValidationIcon,
  FileAuthentication as FileAuthenticationIcon,
  FileAuthorization as FileAuthorizationIcon,
  FilePermission as FilePermissionIcon,
  FileAccess as FileAccessIcon,
  FileSecurity as FileSecurityIcon,
  FilePrivacy as FilePrivacyIcon,
  FileConfidentiality as FileConfidentialityIcon,
  FileIntegrity as FileIntegrityIcon,
  FileAvailability as FileAvailabilityIcon,
  FileReliability as FileReliabilityIcon,
  FilePerformance as FilePerformanceIcon,
  FileEfficiency as FileEfficiencyIcon,
  FileEffectiveness as FileEffectivenessIcon,
  FileQuality as FileQualityIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { 
  cardV, 
  staggerContainer, 
  staggerItem, 
  counterAnimation,
  badgePulse
} from '@/lib/motion'

// Digital vault data
const vaultData = [
  {
    id: 'DOC-001',
    name: 'Fraud Detection Report - Q3 2024',
    type: 'report',
    category: 'fraud-analysis',
    status: 'verified',
    size: '2.4 MB',
    created: '2024-10-15',
    modified: '2024-10-18',
    owner: 'System Admin',
    department: 'Compliance',
    classification: 'confidential',
    encryption: 'AES-256',
    checksum: 'SHA-256:abc123...',
    accessCount: 45,
    lastAccessed: '2024-10-20',
    location: 'Primary Vault',
    backup: 'Yes',
    retention: '7 years',
    tags: ['fraud', 'Q3-2024', 'detection', 'analysis'],
    description: 'Comprehensive fraud detection analysis for Q3 2024 including pattern recognition and anomaly detection results.',
    relatedDocuments: ['DOC-002', 'DOC-003'],
    approvals: ['Ahmed Hassan', 'Fatima Al-Mansouri'],
    version: '1.2',
    language: 'English',
    format: 'PDF',
    pages: 24,
    words: 8500,
    readingTime: '15 min'
  },
  {
    id: 'DOC-002',
    name: 'Daman Integration Compliance Certificate',
    type: 'certificate',
    category: 'compliance',
    status: 'verified',
    size: '1.2 MB',
    created: '2024-09-20',
    modified: '2024-09-20',
    owner: 'Integration Team',
    department: 'Technical',
    classification: 'public',
    encryption: 'AES-256',
    checksum: 'SHA-256:def456...',
    accessCount: 128,
    lastAccessed: '2024-10-19',
    location: 'Primary Vault',
    backup: 'Yes',
    retention: '5 years',
    tags: ['daman', 'integration', 'compliance', 'certificate'],
    description: 'Official compliance certificate for Daman health insurance integration system.',
    relatedDocuments: ['DOC-001', 'DOC-004'],
    approvals: ['Mohammed Al-Khouri', 'Sara Abdullah'],
    version: '1.0',
    language: 'English',
    format: 'PDF',
    pages: 8,
    words: 3200,
    readingTime: '8 min'
  },
  {
    id: 'DOC-003',
    name: 'Provider Network Agreement - Cleveland Clinic',
    type: 'contract',
    category: 'provider-relations',
    status: 'pending',
    size: '3.8 MB',
    created: '2024-10-10',
    modified: '2024-10-22',
    owner: 'Legal Department',
    department: 'Legal',
    classification: 'confidential',
    encryption: 'AES-256',
    checksum: 'SHA-256:ghi789...',
    accessCount: 23,
    lastAccessed: '2024-10-22',
    location: 'Primary Vault',
    backup: 'Yes',
    retention: '10 years',
    tags: ['cleveland-clinic', 'provider', 'agreement', 'contract'],
    description: 'Healthcare provider network agreement with Cleveland Clinic Abu Dhabi.',
    relatedDocuments: ['DOC-001', 'DOC-005'],
    approvals: ['Legal Team'],
    version: '2.1',
    language: 'English',
    format: 'PDF',
    pages: 45,
    words: 15000,
    readingTime: '25 min'
  },
  {
    id: 'DOC-004',
    name: 'Malaffi System Audit Report',
    type: 'audit',
    category: 'system-audit',
    status: 'verified',
    size: '4.2 MB',
    created: '2024-08-15',
    modified: '2024-08-18',
    owner: 'Audit Team',
    department: 'Compliance',
    classification: 'internal',
    encryption: 'AES-256',
    checksum: 'SHA-256:jkl012...',
    accessCount: 67,
    lastAccessed: '2024-10-21',
    location: 'Primary Vault',
    backup: 'Yes',
    retention: '7 years',
    tags: ['malaffi', 'audit', 'system', 'compliance'],
    description: 'Comprehensive audit report for Malaffi health information exchange system.',
    relatedDocuments: ['DOC-002', 'DOC-006'],
    approvals: ['Audit Committee'],
    version: '1.0',
    language: 'English',
    format: 'PDF',
    pages: 32,
    words: 12000,
    readingTime: '20 min'
  },
  {
    id: 'DOC-005',
    name: 'Claims Processing Workflow Documentation',
    type: 'documentation',
    category: 'process',
    status: 'verified',
    size: '1.8 MB',
    created: '2024-07-10',
    modified: '2024-09-15',
    owner: 'Process Team',
    department: 'Operations',
    classification: 'internal',
    encryption: 'AES-256',
    checksum: 'SHA-256:mno345...',
    accessCount: 89,
    lastAccessed: '2024-10-20',
    location: 'Primary Vault',
    backup: 'Yes',
    retention: '5 years',
    tags: ['claims', 'workflow', 'process', 'documentation'],
    description: 'Detailed documentation of the automated claims processing workflow.',
    relatedDocuments: ['DOC-003', 'DOC-007'],
    approvals: ['Operations Manager'],
    version: '3.2',
    language: 'English',
    format: 'PDF',
    pages: 18,
    words: 6800,
    readingTime: '12 min'
  },
  {
    id: 'DOC-006',
    name: 'Data Privacy Impact Assessment',
    type: 'assessment',
    category: 'privacy',
    status: 'in-review',
    size: '2.9 MB',
    created: '2024-10-01',
    modified: '2024-10-23',
    owner: 'Privacy Officer',
    department: 'Compliance',
    classification: 'confidential',
    encryption: 'AES-256',
    checksum: 'SHA-256:pqr678...',
    accessCount: 34,
    lastAccessed: '2024-10-23',
    location: 'Primary Vault',
    backup: 'Yes',
    retention: '7 years',
    tags: ['privacy', 'impact', 'assessment', 'data-protection'],
    description: 'Data privacy impact assessment for HIIS-UAE system implementation.',
    relatedDocuments: ['DOC-004', 'DOC-008'],
    approvals: ['Privacy Committee'],
    version: '1.1',
    language: 'English',
    format: 'PDF',
    pages: 28,
    words: 9500,
    readingTime: '18 min'
  }
]

// Document type icons
const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'report': return <FileBarChart className="h-4 w-4" />
    case 'certificate': return <FileCheck className="h-4 w-4" />
    case 'contract': return <FileSignature className="h-4 w-4" />
    case 'audit': return <FileSearch className="h-4 w-4" />
    case 'documentation': return <FileText className="h-4 w-4" />
    case 'assessment': return <FileCheck className="h-4 w-4" />
    default: return <FileText className="h-4 w-4" />
  }
}

// Status badge colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'default'
    case 'pending': return 'secondary'
    case 'in-review': return 'outline'
    case 'rejected': return 'destructive'
    default: return 'outline'
  }
}

// Classification colors
const getClassificationColor = (classification: string) => {
  switch (classification) {
    case 'public': return 'bg-green-100 text-green-800'
    case 'internal': return 'bg-blue-100 text-blue-800'
    case 'confidential': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

// Document Table Component
function DocumentTable({ documents, onDocumentClick }: { documents: typeof vaultData, onDocumentClick: (doc: typeof vaultData[0]) => void }) {
  const [sortField, setSortField] = useState<keyof typeof vaultData[0]>('created')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: keyof typeof vaultData[0]) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const sortedDocuments = [...documents].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-2">
                Name
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead>Type</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50"
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center gap-2">
                Status
                {sortField === 'status' && (
                  sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead>Classification</TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-accent/50"
              onClick={() => handleSort('created')}
            >
              <div className="flex items-center gap-2">
                Created
                {sortField === 'created' && (
                  sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedDocuments.map((doc) => (
            <TableRow 
              key={doc.id} 
              className="cursor-pointer hover:bg-accent/50"
              onClick={() => onDocumentClick(doc)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {getDocumentIcon(doc.type)}
                  <div>
                    <div className="font-medium">{doc.name}</div>
                    <div className="text-sm text-muted-foreground">{doc.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {doc.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusColor(doc.status)}>
                  {doc.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getClassificationColor(doc.classification)}>
                  {doc.classification}
                </Badge>
              </TableCell>
              <TableCell>{doc.created}</TableCell>
              <TableCell>{doc.size}</TableCell>
              <TableCell>{doc.owner}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Document Detail Drawer Component
function DocumentDetailDrawer({ document, isOpen, onClose }: { 
  document: typeof vaultData[0] | null, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  if (!document) return null

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            {getDocumentIcon(document.type)}
            {document.name}
          </DrawerTitle>
          <DrawerDescription>
            Document ID: {document.id}
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 pb-4 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Type:</span>
                <div className="font-medium capitalize">{document.type}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <div className="font-medium capitalize">{document.category}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="font-medium">
                  <Badge variant={getStatusColor(document.status)}>
                    {document.status}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Classification:</span>
                <div className="font-medium">
                  <Badge className={getClassificationColor(document.classification)}>
                    {document.classification}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <div className="font-medium">{document.size}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Format:</span>
                <div className="font-medium">{document.format}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Pages:</span>
                <div className="font-medium">{document.pages}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Words:</span>
                <div className="font-medium">{document.words.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* Ownership and Access */}
          <div className="space-y-4">
            <h3 className="font-semibold">Ownership & Access</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Owner:</span>
                <div className="font-medium">{document.owner}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Department:</span>
                <div className="font-medium">{document.department}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Access Count:</span>
                <div className="font-medium">{document.accessCount}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Last Accessed:</span>
                <div className="font-medium">{document.lastAccessed}</div>
              </div>
            </div>
          </div>

          {/* Security Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Security Information</h3>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Encryption:</span>
                <div className="font-medium">{document.encryption}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Checksum:</span>
                <div className="font-medium font-mono text-xs">{document.checksum}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Location:</span>
                <div className="font-medium">{document.location}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Backup:</span>
                <div className="font-medium">{document.backup}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Retention Period:</span>
                <div className="font-medium">{document.retention}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-semibold">Description</h3>
            <p className="text-sm text-muted-foreground">{document.description}</p>
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <h3 className="font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Approvals */}
          <div className="space-y-4">
            <h3 className="font-semibold">Approvals</h3>
            <div className="space-y-2">
              {document.approvals.map((approval, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{approval}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Documents */}
          {document.relatedDocuments.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Related Documents</h3>
              <div className="space-y-2">
                {document.relatedDocuments.map((docId, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4" />
                    <span>{docId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DrawerFooter>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" className="flex-1">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

// System Overview Component
function SystemOverview() {
  const totalDocuments = vaultData.length
  const verifiedDocuments = vaultData.filter(d => d.status === 'verified').length
  const totalSize = vaultData.reduce((sum, doc) => {
    const size = parseFloat(doc.size.replace('MB', ''))
    return sum + size
  }, 0)
  const totalAccess = vaultData.reduce((sum, doc) => sum + doc.accessCount, 0)

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
    >
      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Database className="h-3 w-3" />
              <span>Secure storage</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{verifiedDocuments}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>{((verifiedDocuments / totalDocuments) * 100).toFixed(0)}% verified</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            <HardDrive className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSize.toFixed(1)} MB</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Cloud className="h-3 w-3" />
              <span>Cloud storage</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Access</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAccess}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>Document views</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default function DigitalVault() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [selectedDocument, setSelectedDocument] = useState<typeof vaultData[0] | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredDocuments = vaultData.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    const matchesType = typeFilter === 'all' || doc.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleDocumentClick = (doc: typeof vaultData[0]) => {
    setSelectedDocument(doc)
    setIsDrawerOpen(true)
  }

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Digital Vault</h1>
        <p className="text-muted-foreground">
          Secure document management and storage system
        </p>
      </div>

      {/* System Overview */}
      <SystemOverview />

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="verified">Verified</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-review">In Review</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="report">Report</SelectItem>
            <SelectItem value="certificate">Certificate</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="audit">Audit</SelectItem>
            <SelectItem value="documentation">Documentation</SelectItem>
            <SelectItem value="assessment">Assessment</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Upload
        </Button>
      </div>

      {/* Document Table */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <DocumentTable 
          documents={filteredDocuments} 
          onDocumentClick={handleDocumentClick}
        />
      </motion.div>

      {/* Document Detail Drawer */}
      <DocumentDetailDrawer
        document={selectedDocument}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  )
}