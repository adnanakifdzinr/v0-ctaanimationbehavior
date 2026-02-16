"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ServiceCardItem } from "./section-animations"

const services = [
  {
    number: "01",
    title: "Brand Strategy",
    description: `
• Brand Discovery Workshop
• Market & Competitor Analysis
• Target Audience Definition
• Brand Positioning Statement
• Brand Purpose / Mission / Vision
• Brand Values & Personality
• Brand Archetype Selection
• Unique Value Proposition (UVP)
• Brand Messaging Framework
• Tone of Voice Guidelines
• Naming Direction (Optional)
• Tagline Direction (Optional)
`,
    icon: (
      <svg className="w-20 h-20" fill="white" viewBox="0 0 16 16">
        <path d="M8 9C8.55229 9 9 8.55229 9 8C9 7.44772 8.55229 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55229 7.44772 9 8 9Z" fill="white" />
        <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM6 6L4 11L5 12L10 10L12 5L11 4L6 6Z" fill="white" />
      </svg>
    ),
  },

  {
    number: "02",
    title: "Brand Identity System",
    description: `
• Logo System (Primary, Secondary, Mark)
• Logo Variations & Usage Rules
• Color System (Primary / Secondary / Accent)
• Typography System
• Iconography Style
• Pattern & Graphic Elements
• Grid & Layout System
• Brand Mark Construction
• Clearspace & Minimum Size Rules
• Do & Don't Guidelines
• Stationery Design
• Brand Guidelines PDF
`,
    icon: (
      <svg className="w-20 h-20" fill="white" viewBox="0 0 24 24">
        <path d="M9.02975 3.3437C10.9834 2.88543 13.0166 2.88543 14.9703 3.3437C17.6309 3.96779 19.7415 5.96241 20.5284 8.55374H3.47164C4.2585 5.96241 6.36915 3.96779 9.02975 3.3437Z" fill="white" />
        <path d="M3.20453 9.70249C2.89142 11.4471 2.93781 13.2399 3.3437 14.9703C3.9678 17.6309 5.96243 19.7415 8.55377 20.5284V9.70249H3.20453Z" fill="white" />
        <path d="M9.70252 20.7955C11.4471 21.1086 13.2399 21.0622 14.9703 20.6563C17.7916 19.9945 19.9945 17.7916 20.6563 14.9703C21.0622 13.2399 21.1086 11.4471 20.7955 9.70249H9.70252V20.7955Z" fill="white" />
      </svg>
    ),
  },

  {
    number: "03",
    title: "Digital Brand Experience",
    description: `
• Website Visual Direction
• Landing Page UI Direction
• UI Brand Kit
• Digital Color & Type Rules
• Social Media Brand Kit
• Post & Story Templates
• Digital Ad Visual System
• Content Visual Framework
• UX Tone Alignment
• Interaction Style Guide
`,
    icon: (
      <svg className="w-20 h-20" fill="white" viewBox="-2 -4 24 24">
        <path d="M1 14h18a1 1 0 0 1 0 2H1a1 1 0 0 1 0-2zM2 0h16a2 2 0 0 1 2 2v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a2 2 0 0 1 2-2z" />
      </svg>
    ),
  }
]

export function ServiceCards() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observerOptions = {
      threshold: [0.1, 0.5],
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = cardRefs.current.indexOf(entry.target as HTMLDivElement)
        if (index !== -1) {
          if (entry.isIntersecting) {
            // Card enters view - add to visible set
            setVisibleCards((prev) => new Set([...prev, index]))
          } else {
            // Card leaves view - remove from visible set to re-trigger animation
            setVisibleCards((prev) => {
              const newSet = new Set(prev)
              newSet.delete(index)
              return newSet
            })
          }
        }
      })
    }, observerOptions)

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      .service-card-inner {
        position: relative;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  const toggleExpanded = (index: number) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  return (
    <div ref={containerRef} className="relative mt-12 md:mt-16 pb-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
        {services.map((service, index) => {
          const items = service.description
            .trim()
            .split("\n")
            .filter((item) => item.trim())
          const isExpanded = expandedCards.has(index)
          const itemsToShow = isExpanded ? items : items.slice(0, 3)
          const hasMore = items.length > 3

          const isVisible = visibleCards.has(index)
          const columnIndex = index % 3
          const rowIndex = Math.floor(index / 3)

          return (
            <motion.div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el
              }}
              className="service-card"
              initial={{
                opacity: 0,
                rotateY: columnIndex % 2 === 0 ? -45 : 45,
                scale: 0.85,
                y: 40,
              }}
              animate={isVisible ? {
                opacity: 1,
                rotateY: 0,
                scale: 1,
                y: 0,
              } : {
                opacity: 0,
                rotateY: columnIndex % 2 === 0 ? -45 : 45,
                scale: 0.85,
                y: 40,
              }}
              transition={{
                duration: 0.9,
                delay: (index * 0.12),
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                perspective: 1200,
              }}
            >
              <motion.div
                className="service-card-inner h-full bg-white/1 rounded-3xl p-8 md:p-9 flex flex-col"
              >
                {/* Icon Badge */}
                <div className="mb-8 inline-flex w-fit">
                  <div className="icon-badge w-25 h-25 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-lg lg:text-[30px] font-regular text-white leading-[1.2] mb-4 tracking-tighter transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description List */}
                <ul className="text-sm md:text-base lg:text-[16px] text-white leading-relaxed flex-grow space-y-2 list-none">
                  {itemsToShow.map((item, idx) => (
                    <li key={idx} className="text-white">
                      {item.replace(/^•\s*/, "").trim()}
                    </li>
                  ))}
                </ul>

                {/* View More/Less Button */}
                {hasMore && (
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="mt-6 px-4 py-2 rounded-full text-black text-sm md:text-base font-medium bg-white hover:bg-white/90 transition-all duration-300"
                  >
                    {isExpanded ? "Show less" : `+${items.length - 3} more`}
                  </button>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
