"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ChevronRight, ShieldCheck, Bot, Medal } from 'lucide-react'

// Simulated member data
const MOCK_MEMBERS = [
  { id: 1, name: 'RamaDev', avatar: 'https://i.pravatar.cc/150?img=1', status: 'online', role: 'admin', isBot: false },
  { id: 2, name: 'SitaCoder', avatar: 'https://i.pravatar.cc/150?img=5', status: 'online', role: 'moderator', isBot: false },
  { id: 3, name: 'HanumanHelper', avatar: 'https://i.pravatar.cc/150?img=8', status: 'idle', role: 'devotee', isBot: true },
  { id: 4, name: 'LakshmanDev', avatar: 'https://i.pravatar.cc/150?img=11', status: 'dnd', role: 'moderator', isBot: false },
  { id: 5, name: 'BharatBuilder', avatar: 'https://i.pravatar.cc/150?img=15', status: 'online', role: 'admin', isBot: false },
  { id: 6, name: 'AyodhyaBot', avatar: 'https://i.pravatar.cc/150?img=20', status: 'online', role: 'bot', isBot: true },
  { id: 7, name: 'DevDas', avatar: 'https://i.pravatar.cc/150?img=25', status: 'online', role: 'devotee', isBot: false },
  { id: 8, name: 'MythCoder', avatar: 'https://i.pravatar.cc/150?img=30', status: 'offline', role: 'devotee', isBot: false },
  { id: 9, name: 'VedicDev', avatar: 'https://i.pravatar.cc/150?img=35', status: 'online', role: 'devotee', isBot: false },
  { id: 10, name: 'KrishnaJS', avatar: 'https://i.pravatar.cc/150?img=40', status: 'idle', role: 'devotee', isBot: false },
  { id: 11, name: 'GaneshaUI', avatar: 'https://i.pravatar.cc/150?img=45', status: 'online', role: 'moderator', isBot: false },
  { id: 12, name: 'ShivaBackend', avatar: 'https://i.pravatar.cc/150?img=50', status: 'dnd', role: 'admin', isBot: false },
]

type Member = typeof MOCK_MEMBERS[0]
type StatusType = 'online' | 'idle' | 'dnd' | 'offline'
type RoleType = 'admin' | 'moderator' | 'devotee' | 'bot'

export default function OnlineMembers() {
  const [members, setMembers] = useState<Member[]>([])
  const [activeTab, setActiveTab] = useState('online')
  const [isLoading, setIsLoading] = useState(true)
  
  // Filter members based on active tab
  const filteredMembers = members.filter(member => {
    if (activeTab === 'online') return member.status === 'online'
    if (activeTab === 'all') return true
    if (activeTab === 'admins') return member.role === 'admin'
    if (activeTab === 'mods') return member.role === 'moderator'
    if (activeTab === 'bots') return member.isBot
    return false
  })
  
  // Simulate fetching data
  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true)
      // Simulate API call delay
      setTimeout(() => {
        setMembers(MOCK_MEMBERS)
        setIsLoading(false)
      }, 1000)
    }
    
    fetchMembers()
  }, [])
  
  // Status indicator component
  const StatusIndicator = ({ status }: { status: StatusType }) => {
    return (
      <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card status-${status}`}>
        {status === 'online' && (
          <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
        )}
      </div>
    )
  }
  
  // Role icon component
  const RoleIcon = ({ role }: { role: RoleType }) => {
    switch (role) {
      case 'admin':
        return <ShieldCheck className="h-4 w-4 text-divine-gold" />
      case 'moderator':
        return <ShieldCheck className="h-4 w-4 text-divine-blue" />
      case 'bot':
        return <Bot className="h-4 w-4 text-divine-purple" />
      default:
        return <Medal className="h-4 w-4 text-divine-saffron" />
    }
  }
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Divine Community</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Meet our vibrant community members who make Ayodhya a special place.
            Join us and become part of our growing family.
          </p>
        </div>
        
        <Tabs defaultValue="online" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
              <TabsTrigger value="mods">Mods</TabsTrigger>
              <TabsTrigger value="bots">Bots</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-muted animate-pulse"></div>
                    <div className="h-4 w-24 bg-muted rounded mt-2 animate-pulse"></div>
                    <div className="h-3 w-16 bg-muted rounded mt-1 animate-pulse"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-8"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {filteredMembers.map((member) => (
                    <motion.div key={member.id} variants={item} className="flex flex-col items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="relative mb-3">
                              <Avatar className="h-16 w-16 border-2 border-card hover:border-divine-purple transition-colors">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback className="bg-muted">{member.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <StatusIndicator status={member.status as StatusType} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <div className="flex items-center space-x-2">
                              <RoleIcon role={member.role as RoleType} />
                              <span>{member.role.charAt(0).toUpperCase() + member.role.slice(1)}</span>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      <p className="font-medium text-sm">{member.name}</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <RoleIcon role={member.role as RoleType} />
                        <span className="ml-1">{member.role}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {filteredMembers.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No members found for this filter.</p>
                  </div>
                )}
                
                <div className="flex justify-center mt-8">
                  <Button variant="outline" asChild>
                    <a href="/members">
                      View All Members
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}