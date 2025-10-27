'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Database, 
  Activity, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Settings, 
  Eye, 
  Download, 
  Upload, 
  Clock, 
  Zap, 
  Shield, 
  Building, 
  Users, 
  FileText, 
  BarChart3,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Play,
  Pause,
  RotateCcw,
  ExternalLink,
  Plug,
  Server,
  Cloud,
  Lock,
  Key,
  Certificate,
  Globe,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Filter,
  Search
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

// Enhanced UAE integration data
const integrationData = [
  {
    id: 'shafafiya',
    name: 'Shafafiya',
    organization: 'DHA',
    type: 'Health Information Exchange',
    status: 'connected',
    health: 98,
    uptime: 99.7,
    latency: 45,
    messagesPerMinute: 125,
    lastSync: '2 mins ago',
    dataVolume: '2.8TB',
    description: 'Dubai Health Authority Health Information Exchange',
    location: 'Dubai, UAE',
    contact: 'support@shafafiya.ae',
    established: '2014',
    certifications: ['HL7 FHIR', 'ISO 27001'],
    apiVersion: 'v2.1',
    endpoints: 12,
    activeConnections: 8,
    securityLevel: 'High',
    encryption: 'AES-256',
    lastIncident: 'None',
    complianceScore: 98.5
  },
  {
    id: 'dhpo-eclaimlink',
    name: 'DHPO/eClaimLink',
    organization: 'DHPO',
    type: 'Claims Processing',
    status: 'connected',
    health: 95,
    uptime: 99.2,
    latency: 62,
    messagesPerMinute: 89,
    lastSync: '5 mins ago',
    dataVolume: '1.5TB',
    description: 'Dubai Health Insurance Organization Claims Processing',
    location: 'Dubai, UAE',
    contact: 'claims@dhpo.ae',
    established: '2016',
    certifications: ['HIPAA', 'ISO 27001'],
    apiVersion: 'v3.0',
    endpoints: 8,
    activeConnections: 6,
    securityLevel: 'High',
    encryption: 'AES-256',
    lastIncident: '30 days ago',
    complianceScore: 96.2
  },
  {
    id: 'malaffi',
    name: 'Malaffi',
    organization: 'DoH Abu Dhabi',
    type: 'Health Information Exchange',
    status: 'connected',
    health: 92,
    uptime: 98.8,
    latency: 78,
    messagesPerMinute: 156,
    lastSync: '1 min ago',
    dataVolume: '3.2TB',
    description: 'Abu Dhabi Health Information Exchange',
    location: 'Abu Dhabi, UAE',
    contact: 'support@malaffi.ae',
    established: '2019',
    certifications: ['HL7 FHIR', 'ISO 27001'],
    apiVersion: 'v2.3',
    endpoints: 15,
    activeConnections: 12,
    securityLevel: 'High',
    encryption: 'AES-256',
    lastIncident: '7 days ago',
    complianceScore: 94.8
  },
  {
    id: 'nabidh',
    name: 'NABIDH',
    organization: 'MOHAP',
    type: 'Health Information Exchange',
    status: 'warning',
    health: 78,
    uptime: 95.5,
    latency: 145,
    messagesPerMinute: 67,
    lastSync: '15 mins ago',
    dataVolume: '890GB',
    description: 'National Unified Medical Record',
    location: 'Abu Dhabi, UAE',
    contact: 'nabidh@mohap.gov.ae',
    established: '2020',
    certifications: ['HL7 FHIR', 'ISO 27001'],
    apiVersion: 'v1.8',
    endpoints: 10,
    activeConnections: 7,
    securityLevel: 'High',
    encryption: 'AES-256',
    lastIncident: '2 hours ago',
    complianceScore: 89.5
  },
  {
    id: 'riayati',
    name: 'Riayati',
    organization: 'DoH Northern Emirates',
    type: 'Health Information Exchange',
    status: 'connected',
    health: 88,
    uptime: 97.2,
    latency: 95,
    messagesPerMinute: 43,
    lastSync: '8 mins ago',
    dataVolume: '650GB',
    description: 'Northern Emirates Health Information Exchange',
    location: 'Sharjah, UAE',
    contact: 'riayati@doh.gov.ae',
    established: '2021',
    certifications: ['HL7 FHIR', 'ISO 27001'],
    apiVersion: 'v1.5',
    endpoints: 6,
    activeConnections: 4,
    securityLevel: 'High',
    encryption: 'AES-256',
    lastIncident: '1 day ago',
    complianceScore: 91.2
  },
  {
    id: 'dha-apis',
    name: 'DHA APIs',
    organization: 'DHA',
    type: 'Direct API Integration',
    status: 'connected',
    health: 94,
    uptime: 98.9,
    latency: 38,
    messagesPerMinute: 234,
    lastSync: '30 secs ago',
    dataVolume: '1.2TB',
    description: 'Dubai Health Authority Direct API Services',
    location: 'Dubai, UAE',
    contact: 'api@dha.gov.ae',
    established: '2018',
    certifications: ['OAuth 2.0', 'ISO 27001'],
    apiVersion: 'v4.2',
    endpoints: 24,
    activeConnections: 18,
    securityLevel: 'High',
    encryption: 'AES-256',
    lastIncident: 'None',
    complianceScore: 95.8
  }
]

// Recent integration events
const integrationEvents = [
  { timestamp: new Date(Date.now() - 1000 * 60 * 2), integration: 'shafafiya', type: 'success', message: 'Batch of 245 claims processed successfully' },
  { timestamp: new Date(Date.now() - 1000 * 60 * 5), integration: 'malaffi', type: 'info', message: 'Scheduled maintenance completed' },
  { timestamp: new Date(Date.now() - 1000 * 60 * 8), integration: 'nabidh', type: 'warning', message: 'High latency detected - investigating' },
  { timestamp: new Date(Date.now() - 1000 * 60 * 12), integration: 'dhpo-eclaimlink', type: 'success', message: 'Provider directory updated with 12 new entries' },
  { timestamp: new Date(Date.now() - 1000 * 60 * 15), integration: 'dha-apis', type: 'info', message: 'API rate limits adjusted for peak hours' },
  { timestamp: new Date(Date.now() - 1000 * 60 * 20), integration: 'riayati', type: 'success', message: 'Connection re-established after maintenance' },
  { timestamp: new Date(Date.now() - 1000 * 60 * 25), integration: 'shafafiya', type: 'error', message: 'Failed to process claim #CLM-2024-0892' },
  { timestamp: new Date(Date.now() - 1000 * 60 * 30), integration: 'malaffi', type: 'success', message: 'Data synchronization completed' }
]

// Integration Card Component
function IntegrationCard({ integration }: { integration: typeof integrationData[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const [showDetails, setShowDetails] = useState(false)
  const [showConfigure, setShowConfigure] = useState(false)
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'disconnected': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected': return 'default'
      case 'warning': return 'secondary'
      case 'disconnected': return 'destructive'
      default: return 'outline'
    }
  }

  const getHealthColor = (health: number) => {
    if (health >= 90) return 'text-green-600'
    if (health >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  // Test Connection Function
  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    setConnectionStatus('testing')
    
    // Simulate connection test
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate random success/failure
    const isSuccess = Math.random() > 0.2
    setConnectionStatus(isSuccess ? 'success' : 'error')
    setIsTestingConnection(false)
    
    // Reset status after 3 seconds
    setTimeout(() => setConnectionStatus('idle'), 3000)
  }

  // Open Portal Function
  const handleOpenPortal = () => {
    // Simulate opening portal based on integration
    const portalUrls = {
      'shafafiya': 'https://shafafiya.dha.gov.ae',
      'dhpo-eclaimlink': 'https://eclaimlink.dhpo.ae',
      'malaffi': 'https://malaffi.doh.gov.ae',
      'nabidh': 'https://nabidh.mohap.gov.ae',
      'riayati': 'https://riayati.doh.gov.ae',
      'dha-apis': 'https://api.dha.gov.ae'
    }
    
    const url = portalUrls[integration.id as keyof typeof portalUrls]
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  // View Details Function
  const handleViewDetails = () => {
    setShowDetails(true)
  }

  // Configure Function
  const handleConfigure = () => {
    setShowConfigure(true)
  }

  return (
    <>
      <motion.div
        variants={staggerItem}
        whileHover="hover"
        className="glass-card hover-lift"
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-accent/50 ${getStatusColor(integration.status)}`}>
                <Database className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-sm">{integration.name}</CardTitle>
                <CardDescription className="text-xs">{integration.organization}</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.div variants={badgePulse} animate="animate">
                <Badge variant={getStatusBadge(integration.status)}>
                  {integration.status}
                </Badge>
              </motion.div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleViewDetails}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleConfigure}>
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleTestConnection} disabled={isTestingConnection}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${isTestingConnection ? 'animate-spin' : ''}`} />
                    {isTestingConnection ? 'Testing...' : 'Test Connection'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOpenPortal}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Portal
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Connection Status Indicator */}
          {connectionStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2 rounded-lg text-sm ${
                connectionStatus === 'testing' ? 'bg-blue-100 text-blue-800' :
                connectionStatus === 'success' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}
            >
              {connectionStatus === 'testing' && 'Testing connection...'}
              {connectionStatus === 'success' && '✓ Connection successful'}
              {connectionStatus === 'error' && '✗ Connection failed'}
            </motion.div>
          )}

          {/* Health and Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Health</span>
                <span className={`font-medium ${getHealthColor(integration.health)}`}>{integration.health}%</span>
              </div>
              <Progress value={integration.health} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Uptime</span>
                <span className="font-medium text-green-600">{integration.uptime}%</span>
              </div>
              <Progress value={integration.uptime} className="h-2" />
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center">
              <div className="font-medium">{integration.latency}ms</div>
              <div className="text-xs text-muted-foreground">Latency</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{integration.messagesPerMinute}</div>
              <div className="text-xs text-muted-foreground">Msg/min</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{integration.endpoints}</div>
              <div className="text-xs text-muted-foreground">Endpoints</div>
            </div>
          </div>

          {/* Connection Info */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Last Sync
              </span>
              <span className="font-medium">{integration.lastSync}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                <Database className="h-3 w-3" />
                Data Volume
              </span>
              <span className="font-medium">{integration.dataVolume}</span>
            </div>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-3 border-t border-border space-y-3"
            >
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Location:</span>
                  <div className="font-medium">{integration.location}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Contact:</span>
                  <div className="font-medium">{integration.contact}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">API Version:</span>
                  <div className="font-medium">{integration.apiVersion}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Security:</span>
                  <div className="font-medium">{integration.securityLevel}</div>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Certifications:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {integration.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Compliance Score:</span>
                <div className="font-medium text-green-600">{integration.complianceScore}%</div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={isTestingConnection}
              className="text-xs"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isTestingConnection ? 'animate-spin' : ''}`} />
              {isTestingConnection ? 'Testing' : 'Test'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewDetails}
              className="text-xs"
            >
              <Eye className="h-3 w-3 mr-1" />
              Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleConfigure}
              className="text-xs"
            >
              <Settings className="h-3 w-3 mr-1" />
              Configure
            </Button>
          </div>
        </CardContent>
      </motion.div>

      {/* Details Modal */}
      {showDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowDetails(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{integration.name} - Details</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Overview</h4>
                <p className="text-sm text-muted-foreground">{integration.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Organization:</span>
                  <div className="font-medium">{integration.organization}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <div className="font-medium">{integration.type}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <div className="font-medium">{integration.status}</div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Established:</span>
                  <div className="font-medium">{integration.established}</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Performance Metrics</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Health Score:</span>
                    <div className="font-medium">{integration.health}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Uptime:</span>
                    <div className="font-medium">{integration.uptime}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Latency:</span>
                    <div className="font-medium">{integration.latency}ms</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Messages/min:</span>
                    <div className="font-medium">{integration.messagesPerMinute}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Technical Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">API Version:</span>
                    <div className="font-medium">{integration.apiVersion}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Endpoints:</span>
                    <div className="font-medium">{integration.endpoints}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Active Connections:</span>
                    <div className="font-medium">{integration.activeConnections}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Security Level:</span>
                    <div className="font-medium">{integration.securityLevel}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <div className="font-medium">{integration.location}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Contact:</span>
                    <div className="font-medium">{integration.contact}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Configure Modal */}
      {showConfigure && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowConfigure(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-lg p-6 max-w-lg w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Configure {integration.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowConfigure(false)}>
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">API Endpoint</label>
                <Input 
                  defaultValue={`https://api.${integration.id}.ae/v${integration.apiVersion}`}
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">API Key</label>
                <Input 
                  type="password"
                  defaultValue="••••••••••••••••"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Connection Timeout (seconds)</label>
                <Input 
                  type="number"
                  defaultValue="30"
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Retry Attempts</label>
                <Input 
                  type="number"
                  defaultValue="3"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="auto-sync" defaultChecked />
                <label htmlFor="auto-sync" className="text-sm">Enable automatic synchronization</label>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => setShowConfigure(false)} className="flex-1">
                  Save Configuration
                </Button>
                <Button variant="outline" onClick={() => setShowConfigure(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

// Integration Events Feed Component
function IntegrationEventsFeed() {
  const [events, setEvents] = useState(integrationEvents)
  const [filter, setFilter] = useState('all')

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter)

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-600'
      case 'warning': return 'text-yellow-600'
      case 'success': return 'text-green-600'
      default: return 'text-blue-600'
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-3 w-3" />
      case 'warning': return <AlertTriangle className="h-3 w-3" />
      case 'success': return <CheckCircle className="h-3 w-3" />
      default: return <Activity className="h-3 w-3" />
    }
  }

  return (
    <motion.div
      variants={cardV}
      initial="hidden"
      animate="show"
      className="glass-card"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-gold" />
            Integration Events
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredEvents.map((event, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
              <span className={getEventTypeColor(event.type)}>
                {getEventTypeIcon(event.type)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{event.integration}</span>
                  <span className="text-xs text-muted-foreground">
                    {event.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{event.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </motion.div>
  )
}

// System Overview Component
function SystemOverview() {
  const connectedIntegrations = integrationData.filter(i => i.status === 'connected').length
  const totalMessages = integrationData.reduce((sum, integration) => sum + integration.messagesPerMinute, 0)
  const avgLatency = Math.round(integrationData.reduce((sum, integration) => sum + integration.latency, 0) / integrationData.length)
  const totalDataVolume = integrationData.reduce((sum, integration) => {
    const volume = parseFloat(integration.dataVolume.replace('TB', '').replace('GB', ''))
    const unit = integration.dataVolume.includes('TB') ? 1024 : 1
    return sum + (volume * unit)
  }, 0)

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
            <CardTitle className="text-sm font-medium">Connected Systems</CardTitle>
            <Database className="h-4 w-4 text-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedIntegrations}/{integrationData.length}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span>All major systems online</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages/min</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages.toLocaleString()}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              <span>Real-time processing</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgLatency}ms</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <span>Across all systems</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={staggerItem}>
        <Card className="glass-card hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Data Volume</CardTitle>
            <Server className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalDataVolume / 1024).toFixed(1)}TB</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Database className="h-3 w-3" />
              <span>Total processed</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export default function IntegrationsDashboard() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  
  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredIntegrations = integrationData.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (!mounted) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">UAE Integrations</h1>
        <p className="text-muted-foreground">
          Monitor and manage connections with UAE healthcare systems and providers
        </p>
      </div>

      {/* System Overview */}
      <SystemOverview />

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
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
            <SelectItem value="connected">Connected</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="disconnected">Disconnected</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All
        </Button>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="integrations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="integrations">System Integrations</TabsTrigger>
          <TabsTrigger value="events">Activity Events</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 xl:grid-cols-2 gap-6"
          >
            {filteredIntegrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <IntegrationEventsFeed />
        </TabsContent>
      </Tabs>
    </div>
  )
}