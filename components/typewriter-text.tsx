'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTypewriterTrigger } from '@/context/animation-context'

interface TypewriterTextProps {
  text: string
  className?: string
}

export function TypewriterText({ text, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const { startTypewriterAnimation } = useTypewriterTrigger()

  useEffect(() => {
    // Start typewriter animation 1.5s after the web-open CTA is clicked
    if (!startTypewriterAnimation) return
    
    const delayMs = 1500
    const startTimer = setTimeout(() => {
      setIsTyping(true)
    }, delayMs)

    return () => clearTimeout(startTimer)
  }, [startTypewriterAnimation])

  useEffect(() => {
    if (!isTyping) return

    let currentIndex = 0
    
    const typeInterval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typeInterval)
      }
    }, 25) // Speed of typewriter effect

    return () => clearInterval(typeInterval)
  }, [isTyping, text])

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={startTypewriterAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={className}
    >
      {displayText}
      {isTyping && displayText.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block ml-1 h-[0.9em] w-[0.05em] bg-current"
        />
      )}
    </motion.h1>
  )
}
