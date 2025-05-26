"use client"

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  
  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = theme === 'dark' 
          ? `rgba(${Math.floor(Math.random() * 50 + 100)}, ${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 200 + 55)}, ${Math.random() * 0.5 + 0.1})`
          : `rgba(${Math.floor(Math.random() * 100 + 150)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.3 + 0.05})`;
      }
      
      update() {
        this.x += this.speedX
        this.y += this.speedY
        
        if (this.x > canvas.width) {
          this.x = 0
        } else if (this.x < 0) {
          this.x = canvas.width
        }
        
        if (this.y > canvas.height) {
          this.y = 0
        } else if (this.y < 0) {
          this.y = canvas.height
        }
      }
      
      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }
    
    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, (canvas.width * canvas.height) / 15000)
    
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }
    
    // Animation loop
    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      
      // Connect particles with lines if they're close enough
      connectParticles()
      
      requestAnimationFrame(animate)
    }
    
    // Connect particles with lines
    function connectParticles() {
      if (!ctx) return
      const maxDistance = 150
      
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance)
            ctx.strokeStyle = theme === 'dark'
              ? `rgba(80, 60, 200, ${opacity * 0.15})`
              : `rgba(100, 80, 220, ${opacity * 0.1})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [theme])
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      
      {/* Gradient orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <motion.div 
          className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-divine-purple/10 blur-[100px]"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-[-30%] left-[-5%] w-[400px] h-[400px] rounded-full bg-divine-blue/10 blur-[80px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-divine-gold/5 blur-[80px]"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </>
  )
}