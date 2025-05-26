"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bot as Lotus, Users, ChevronRight } from 'lucide-react'
import AnimatedCounter from '@/components/shared/AnimatedCounter'

export default function Hero() {
  // These would be fetched from Discord API in production
  const [memberCount, setMemberCount] = useState(0)
  const [onlineCount, setOnlineCount] = useState(0)
  
  // Simulate data fetching
  useEffect(() => {
    // Simulated API data
    const fetchData = () => {
      setTimeout(() => {
        setMemberCount(5432)
        setOnlineCount(234)
      }, 500)
    }
    
    fetchData()
  }, [])
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }
    }
  }

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 right-10 w-40 h-40 md:w-64 md:h-64 opacity-20 dark:opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, ease: "linear", repeat: Infinity }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="hsl(var(--divine-purple))" 
              d="M41.3,-59.1C55.5,-52.8,70.3,-43.7,76.8,-30.2C83.3,-16.7,81.6,1.1,76.1,17.1C70.6,33.1,61.4,47.2,48.3,55.3C35.2,63.4,18.1,65.4,1.1,63.9C-16,62.5,-31.9,57.6,-46.2,48.2C-60.5,38.8,-73.1,24.9,-78.3,7.7C-83.5,-9.4,-81.3,-30,-70.2,-43.2C-59.2,-56.5,-39.3,-62.3,-22.9,-67.2C-6.4,-72.1,7.5,-76,20.7,-73.2C33.8,-70.3,46.2,-60.6,58.6,-49.4L56.7,-53.7L41.3,-59.1Z" 
              transform="translate(100 100)" 
            />
          </svg>
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-10 -left-10 w-40 h-40 md:w-80 md:h-80 opacity-20 dark:opacity-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 180, ease: "linear", repeat: Infinity }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="hsl(var(--divine-blue))" 
              d="M54.2,-76.3C71.9,-68.9,89.1,-57.5,97.8,-41.5C106.5,-25.5,106.8,-4.8,101.2,13.7C95.7,32.2,84.4,48.5,70,60.7C55.6,73,37.9,81.1,19.7,84.8C1.4,88.4,-17.6,87.7,-35.4,81.4C-53.3,75.1,-70.1,63.3,-79.6,47C-89.2,30.6,-91.4,9.7,-86.3,-8.3C-81.2,-26.3,-68.6,-41.5,-54.3,-50.8C-40.1,-60.1,-24.2,-63.5,-7.9,-72.8C8.5,-82.1,36.4,-83.8,54.2,-76.3Z" 
              transform="translate(100 100)" 
            />
          </svg>
        </motion.div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6">
            <div className="flex items-center justify-center space-x-2 text-divine-purple mb-2">
              <Lotus className="h-8 w-8" />
              <span className="text-lg font-medium">Divine Community</span>
            </div>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tighter"
          >
            Welcome to{' '}
            <span className="bg-clip-text text-transparent bg-divine-gradient text-glow divine-glow-purple">
              Ayodhya
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            A divine Discord community where mythology meets modern tech.
            Join us on a journey of spiritual exploration and technological innovation.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
          >
            <Button size="lg" asChild className="bg-divine-gradient hover:opacity-90">
              <Link href="/join">
                Join Our Server
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" asChild className="border-divine-purple text-divine-purple hover:text-divine-purple hover:bg-divine-purple/10">
              <Link href="/about">
                Learn More
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16"
          >
            <div className="flex items-center space-x-4">
              <Users className="h-10 w-10 text-divine-purple" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Total Members</p>
                <p className="text-3xl font-bold">
                  <AnimatedCounter value={memberCount} duration={2} />
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-500 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Online Now</p>
                <p className="text-3xl font-bold">
                  <AnimatedCounter value={onlineCount} duration={2} />
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}