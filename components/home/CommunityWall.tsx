"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'

// Mock data for messages
const MOCK_MESSAGES = [
  {
    id: 1,
    user: {
      name: 'RamaDev',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'admin'
    },
    content: 'Just pushed a new update to our divine bot! Check out the new meditation timer feature.',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    channel: 'announcements',
    reactions: [
      { emoji: '👍', count: 15 },
      { emoji: '🙏', count: 23 },
      { emoji: '🔥', count: 7 }
    ]
  },
  {
    id: 2,
    user: {
      name: 'SitaCoder',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'moderator'
    },
    content: 'I\'m hosting a workshop on "Spiritual Design Patterns" this Friday at 7 PM. Everyone is welcome to join!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    channel: 'events',
    reactions: [
      { emoji: '✨', count: 12 },
      { emoji: '📅', count: 8 },
      { emoji: '❤️', count: 5 }
    ]
  },
  {
    id: 3,
    user: {
      name: 'HanumanHelper',
      avatar: 'https://i.pravatar.cc/150?img=8',
      role: 'bot'
    },
    content: '🔔 Daily reminder: Don\'t forget to meditate for at least 10 minutes today. Your mind will thank you!',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    channel: 'reminders',
    reactions: [
      { emoji: '🧘', count: 34 },
      { emoji: '👍', count: 19 }
    ]
  },
  {
    id: 4,
    user: {
      name: 'LakshmanDev',
      avatar: 'https://i.pravatar.cc/150?img=11',
      role: 'moderator'
    },
    content: 'Just updated our community guidelines. Please check them out in the #rules channel.',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    channel: 'general',
    reactions: [
      { emoji: '👀', count: 22 },
      { emoji: '📝', count: 7 }
    ]
  },
  {
    id: 5,
    user: {
      name: 'KrishnaJS',
      avatar: 'https://i.pravatar.cc/150?img=40',
      role: 'devotee'
    },
    content: 'I created a new npm package inspired by our community! Check out "divine-ui" - UI components with spiritual animations.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    channel: 'showcase',
    reactions: [
      { emoji: '🚀', count: 45 },
      { emoji: '🎉', count: 28 },
      { emoji: '❤️', count: 19 }
    ]
  }
]

type Message = typeof MOCK_MESSAGES[0]

export default function CommunityWall() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setMessages(MOCK_MESSAGES)
        setIsLoading(false)
      }, 1000)
    }
    
    fetchMessages()
  }, [])
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }
  
  const getChannelColor = (channel: string) => {
    const channels = {
      announcements: 'text-divine-purple bg-divine-purple/10',
      events: 'text-divine-blue bg-divine-blue/10',
      reminders: 'text-divine-gold bg-divine-gold/10',
      general: 'text-muted-foreground bg-muted',
      showcase: 'text-divine-saffron bg-divine-saffron/10'
    }
    
    return channels[channel as keyof typeof channels] || 'text-muted-foreground bg-muted'
  }
  
  const getRoleBadge = (role: string) => {
    const roles = {
      admin: 'bg-divine-gold/10 text-divine-gold',
      moderator: 'bg-divine-blue/10 text-divine-blue',
      bot: 'bg-divine-purple/10 text-divine-purple',
      devotee: 'bg-divine-saffron/10 text-divine-saffron'
    }
    
    return roles[role as keyof typeof roles] || 'bg-muted text-muted-foreground'
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Community Wall</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what's happening in our divine community right now.
            These messages are pulled directly from our most active channels.
          </p>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                      <div className="h-4 w-16 bg-muted rounded"></div>
                    </div>
                    <div className="h-16 bg-muted rounded"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-12 bg-muted rounded-full"></div>
                      <div className="h-6 w-12 bg-muted rounded-full"></div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div 
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {messages.map(message => (
              <motion.div key={message.id} variants={item}>
                <Card className="p-6 border border-border/50 hover:border-divine-purple/30 transition-colors">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.user.avatar} alt={message.user.name} />
                      <AvatarFallback>{message.user.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-medium">{message.user.name}</span>
                        <Badge variant="outline" className={getRoleBadge(message.user.role)}>
                          {message.user.role}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                        </span>
                        <Badge variant="outline" className={`text-xs ${getChannelColor(message.channel)}`}>
                          #{message.channel}
                        </Badge>
                      </div>
                      
                      <p className="mb-3">{message.content}</p>
                      
                      <div className="flex gap-2 flex-wrap">
                        {message.reactions.map((reaction, i) => (
                          <div 
                            key={i} 
                            className="flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-muted hover:bg-muted/80 cursor-pointer transition-colors"
                          >
                            <span>{reaction.emoji}</span>
                            <span className="text-xs">{reaction.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}