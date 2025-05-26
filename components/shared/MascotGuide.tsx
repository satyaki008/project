"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot as Lotus, MessageSquare, X } from 'lucide-react'

interface Tip {
  id: number
  title: string
  content: string
}

const TIPS: Tip[] = [
  {
    id: 1,
    title: 'Welcome to Ayodhya',
    content: 'I am your divine guide! Explore our server features and connect with like-minded souls on this spiritual tech journey.'
  },
  {
    id: 2,
    title: 'Join an Event',
    content: 'Check out our upcoming events for meditation sessions, code reviews, and spiritual tech discussions.'
  },
  {
    id: 3,
    title: 'Server Roles',
    content: 'Engage with the community to earn divine roles and special privileges. Start by introducing yourself in #introductions.'
  },
  {
    id: 4,
    title: 'Need Help?',
    content: 'If you have any questions, feel free to ask in the #help channel or message one of our moderators.'
  },
  {
    id: 5,
    title: 'Divine Resources',
    content: 'Visit our #resources channel for curated content on spirituality, technology, and personal growth.'
  }
]

export default function MascotGuide() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [hasBeenShown, setHasBeenShown] = useState(false)
  
  useEffect(() => {
    // Show mascot after a delay
    const timer = setTimeout(() => {
      if (!hasBeenShown) {
        setIsVisible(true)
        setHasBeenShown(true)
      }
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [hasBeenShown])
  
  // Cycle through tips
  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % TIPS.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [isVisible])
  
  const handleClose = () => {
    setIsVisible(false)
  }
  
  const handleOpen = () => {
    setIsVisible(true)
  }
  
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-4 right-4 z-50 max-w-xs"
          >
            <Card className="p-4 border border-divine-purple/30 shadow-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' }}
                  >
                    <Lotus className="h-6 w-6 text-divine-purple mr-2" />
                  </motion.div>
                  <h3 className="font-medium">{TIPS[currentTipIndex].title}</h3>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={handleClose}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTipIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-sm mb-3">{TIPS[currentTipIndex].content}</p>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {TIPS.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1.5 w-1.5 rounded-full ${index === currentTipIndex ? 'bg-divine-purple' : 'bg-muted'}`}
                    />
                  ))}
                </div>
                
                <Button variant="link" size="sm" className="p-0 h-auto text-divine-purple">
                  <a href="/help">Learn more</a>
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.2 }}
          onClick={handleOpen}
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-divine-purple text-white flex items-center justify-center shadow-lg hover:bg-divine-purple/90 transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
        </motion.button>
      )}
    </>
  )
}