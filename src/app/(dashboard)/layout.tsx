'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Bot, 
  Database, 
  GitBranch, 
  Shield, 
  BarChart3, 
  Building, 
  Users, 
  FileText,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  User,
  ChevronDown,
  Activity,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { slideInLeft, drawerSlide } from '@/lib/motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Overview', href: '/overview', icon: LayoutDashboard },
  { name: 'Multi-Agents', href: '/agents', icon: Bot },
  { name: 'Integrations', href: '/integrations', icon: Database },
  { name: 'Orchestration', href: '/orchestration', icon: GitBranch },
  { name: 'Digital Vault', href: '/vault', icon: Shield },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Insurers', href: '/insurers', icon: Building },
  { name: 'Providers', href: '/providers', icon: Users },
  { name: 'Regulators', href: '/regulators', icon: Activity },
  { name: 'Claims', href: '/claims', icon: FileText },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activityDrawerOpen, setActivityDrawerOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        animate={sidebarOpen ? "show" : "hidden"}
        className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-xl z-50 lg:hidden"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-gold" />
            <div>
              <h1 className="font-bold text-sm">HIIS-UAE</h1>
              <p className="text-xs text-muted-foreground">Health Integrity</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname?.endsWith(item.href) || pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-gold" />
                )}
              </Link>
            )
          })}
        </nav>
      </motion.div>

      {/* Activity Drawer - Right Side */}
      <motion.div
        variants={drawerSlide}
        initial="hidden"
        animate={activityDrawerOpen ? "show" : "hidden"}
        className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border shadow-xl z-50"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold">Activity Feed</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActivityDrawerOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-3 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="text-sm text-muted-foreground">Real-time system events...</div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex max-w-screen-2xl mx-auto">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-72 xl:w-80 bg-card border-r border-border flex-shrink-0">
          <div className="flex items-center gap-2 p-6 border-b border-border">
            <Shield className="h-8 w-8 text-gold" />
            <div>
              <h1 className="font-bold text-lg">HIIS-UAE</h1>
              <p className="text-xs text-muted-foreground">Health Integrity System</p>
            </div>
          </div>
          <nav className="p-4 space-y-2">
            {/* Navigation Test */}
            <div className="p-3 bg-gold/10 rounded-lg mb-4">
              <p className="text-xs text-gold mb-2 font-medium">Quick Navigation:</p>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.href = '/insurers'}
                  className="text-xs justify-start"
                >
                  <Building className="h-3 w-3 mr-2" />
                  Insurers
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.href = '/providers'}
                  className="text-xs justify-start"
                >
                  <Users className="h-3 w-3 mr-2" />
                  Providers
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.href = '/integrations'}
                  className="text-xs justify-start"
                >
                  <Database className="h-3 w-3 mr-2" />
                  Integrations
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.href = '/analytics'}
                  className="text-xs justify-start"
                >
                  <BarChart3 className="h-3 w-3 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>
            
            {navigation.map((item) => {
              const isActive = pathname?.endsWith(item.href) || pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-accent text-accent-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-gold" />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Main Area */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border">
            <div className="flex items-center justify-between px-4 lg:px-6 py-3">
              <div className="flex items-center gap-2 lg:gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-gold border-gold text-xs">
                    <Activity className="w-3 h-3 mr-1" />
                    Production
                  </Badge>
                  <div className="text-sm text-muted-foreground hidden sm:block">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:gap-4">
                <div className="relative hidden lg:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search claims, providers, agents..."
                    className="pl-10 w-48 lg:w-64"
                  />
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActivityDrawerOpen(true)}
                  className="relative"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AD</AvatarFallback>
                      </Avatar>
                      <div className="hidden lg:block text-left">
                        <div className="text-sm font-medium">Admin User</div>
                        <div className="text-xs text-muted-foreground">System Administrator</div>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-4 lg:p-6 max-w-none xl:max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}