"use client"

import { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Bot as Lotus, ChevronRight } from 'lucide-react'

export default function JoinCTA() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [controls, isInView])
  
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
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-divine-gradient opacity-10"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 right-10 w-20 h-20 opacity-30"
          animate={{ 
            y: [0, -15, 0],
            rotate: 360,
          }}
          transition={{ 
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        >
          <Lotus className="w-full h-full text-divine-purple" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-10 w-20 h-20 opacity-30"
          animate={{ 
            y: [0, 15, 0],
            rotate: -360,
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
        >
          <Lotus className="w-full h-full text-divine-blue" />
        </motion.div>
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Begin Your Divine Journey with{' '}
              <span className="bg-clip-text text-transparent bg-divine-gradient">
                Ayodhya
              </span>
            </h2>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Join our community of spiritual tech enthusiasts and embark on a journey of 
            growth, innovation, and divine exploration.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
              <Button size="lg" asChild className="bg-divine-gradient hover:opacity-90 min-w-[200px]">
                <Link href="/join">
                  Join Our Server
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild className="border-divine-purple text-divine-purple hover:text-divine-purple hover:bg-divine-purple/10 min-w-[200px]">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                      alt="Community member" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span>Join 5,000+ members already in our community</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}