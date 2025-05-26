"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/theme-toggle'
import { Users, Activity, Calendar, Home, Menu, X, MessageSquare, LogIn, Bot as Lotus } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { scrollY } = useScroll()

  const headerBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(15, 16, 25, 0)", "rgba(15, 16, 25, 0.9)"]
  )
  
  const headerBorder = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  )
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Members', href: '/members', icon: Users },
    { name: 'Stats', href: '/stats', icon: Activity },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Community', href: '/community', icon: MessageSquare },
  ]

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4"
        style={{ 
          backgroundColor: headerBackground,
          borderBottom: `1px solid`,
          borderColor: headerBorder,
          backdropFilter: "blur(10px)"
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Lotus className="h-8 w-8 text-divine-purple" />
            <span className="font-poppins font-bold text-xl text-glow divine-glow-purple">
              Ayodhya
            </span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-lg flex items-center space-x-1 transition-all duration-200",
                    isActive 
                      ? "bg-primary/10 text-primary text-glow divine-glow-purple" 
                      : "hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
          
          <div className="flex items-center space-x-3">
            <ModeToggle />
            
            <Button asChild variant="outline" className="hidden sm:flex border-divine-purple text-divine-purple hover:text-divine-purple hover:bg-divine-purple/10">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
            
            <Button asChild className="hidden sm:flex bg-divine-gradient hover:opacity-90">
              <Link href="/join">Join Server</Link>
            </Button>
            
            <button 
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm pt-20 px-4 md:hidden">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "p-3 rounded-lg flex items-center space-x-3",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "hover:bg-primary/5"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
            
            <div className="pt-4 mt-4 border-t border-border flex flex-col space-y-3">
              <Button asChild variant="outline" className="w-full justify-center">
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login with Discord
                </Link>
              </Button>
              
              <Button asChild className="w-full justify-center">
                <Link href="/join">Join Ayodhya Server</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
      
      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  )
}