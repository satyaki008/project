"use client"

import { useState, useEffect } from 'react'
import { animate } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
}

export default function AnimatedCounter({ value, duration = 1 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      onUpdate: (value) => setDisplayValue(Math.floor(value)),
      ease: "easeOut",
    })
    
    return () => controls.stop()
  }, [value, duration])
  
  return <>{displayValue.toLocaleString()}</>
}