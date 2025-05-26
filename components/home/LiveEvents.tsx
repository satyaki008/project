"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users, Pin, Bell } from 'lucide-react'
import { format, isFuture, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'

// Mock data for events
const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Divine Code Review',
    description: 'Join our senior devs for a spiritual journey through clean code practices and divine architecture patterns.',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    attendees: 28,
    category: 'tech',
    pinned: true,
  },
  {
    id: 2,
    title: 'Mythological UX Design',
    description: 'Learn how ancient mythological patterns can inspire modern user experience design.',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    attendees: 42,
    category: 'design',
    pinned: false,
  },
  {
    id: 3,
    title: 'Meditation for Developers',
    description: 'A guided session to help developers find inner peace and increase productivity through mindfulness.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    attendees: 35,
    category: 'wellness',
    pinned: true,
  },
  {
    id: 4,
    title: 'Ayodhya Bot Workshop',
    description: 'Hands-on workshop to learn how to build your own spiritual bot using Discord.js.',
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
    attendees: 56,
    category: 'tech',
    pinned: false,
  },
]

type Event = typeof MOCK_EVENTS[0]

export default function LiveEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [nextEvent, setNextEvent] = useState<Event | null>(null)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  // Simulate fetching events
  useEffect(() => {
    const fetchEvents = async () => {
      // Simulate API call
      setTimeout(() => {
        const sortedEvents = [...MOCK_EVENTS].sort((a, b) => a.date.getTime() - b.date.getTime())
        setEvents(sortedEvents)
        
        // Find next upcoming event
        const upcoming = sortedEvents.find(event => isFuture(event.date))
        if (upcoming) {
          setNextEvent(upcoming)
        }
      }, 1000)
    }
    
    fetchEvents()
  }, [])
  
  // Update countdown timer
  useEffect(() => {
    if (!nextEvent) return
    
    const timer = setInterval(() => {
      const now = new Date()
      const eventDate = nextEvent.date
      
      if (eventDate <= now) {
        clearInterval(timer)
        return
      }
      
      setCountdown({
        days: differenceInDays(eventDate, now),
        hours: differenceInHours(eventDate, now) % 24,
        minutes: differenceInMinutes(eventDate, now) % 60,
        seconds: differenceInSeconds(eventDate, now) % 60
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [nextEvent])
  
  // Category badge component
  const CategoryBadge = ({ category }: { category: string }) => {
    const categories = {
      tech: { color: 'bg-divine-blue/10 text-divine-blue', label: 'Tech' },
      design: { color: 'bg-divine-purple/10 text-divine-purple', label: 'Design' },
      wellness: { color: 'bg-divine-gold/10 text-divine-gold', label: 'Wellness' },
      community: { color: 'bg-divine-saffron/10 text-divine-saffron', label: 'Community' },
    }
    
    const { color, label } = categories[category as keyof typeof categories] || { color: 'bg-muted', label: category }
    
    return <Badge variant="outline" className={`${color}`}>{label}</Badge>
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Upcoming Divine Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community events and connect with like-minded individuals on their spiritual and technical journeys.
          </p>
        </div>
        
        {nextEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Card className="overflow-hidden border-divine-purple/20">
              <div className="bg-divine-gradient h-2"></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{nextEvent.title}</CardTitle>
                    <CardDescription className="mt-2">{nextEvent.description}</CardDescription>
                  </div>
                  <CategoryBadge category={nextEvent.category} />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <span className="text-3xl font-bold mb-1">{countdown.days}</span>
                    <span className="text-xs text-muted-foreground">Days</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <span className="text-3xl font-bold mb-1">{countdown.hours}</span>
                    <span className="text-xs text-muted-foreground">Hours</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <span className="text-3xl font-bold mb-1">{countdown.minutes}</span>
                    <span className="text-xs text-muted-foreground">Minutes</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                    <span className="text-3xl font-bold mb-1">{countdown.seconds}</span>
                    <span className="text-xs text-muted-foreground">Seconds</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{format(nextEvent.date, 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{format(nextEvent.date, 'h:mm a')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{nextEvent.attendees} attending</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" className="gap-1">
                  <Bell className="h-4 w-4" />
                  <span>Remind me</span>
                </Button>
                <Button size="sm">Join Event</Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.filter(event => event.id !== nextEvent?.id).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{event.title}</CardTitle>
                    <CategoryBadge category={event.category} />
                  </div>
                  <CardDescription className="mt-2">{event.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{format(event.date, 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{format(event.date, 'h:mm a')}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{event.attendees} attending</span>
                    </div>
                    
                    {event.pinned && (
                      <div className="flex items-center space-x-1">
                        <Pin className="h-4 w-4 text-divine-purple" />
                        <span className="text-xs text-divine-purple">Pinned</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button size="sm" className="w-full">RSVP</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <a href="/events">View All Events</a>
          </Button>
        </div>
      </div>
    </section>
  )
}