"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useScrollDirection } from "@/hooks/use-scroll-direction"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useWebOpenAnimation } from "@/context/animation-context"
import { AboutPopup } from "@/components/about-popup"
import { ContactPopup } from "@/components/contact-popup"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isCtaHovering, setIsCtaHovering] = useState(false)
  const [isWebOpenActive, setIsWebOpenActive] = useState(false)
  const [isWebOpenVisible, setIsWebOpenVisible] = useState(false)
  const isScrollDirectionUp = useScrollDirection()
  const pathname = usePathname()
  const { isWebOpenAnimating } = useWebOpenAnimation()

  const handleWebOpenClick = () => {
    setIsWebOpenActive(true)
    setTimeout(() => setIsWebOpenVisible(true), 50)
  }

  const handleWebOpenExit = () => {
    setIsWebOpenVisible(false)
    setTimeout(() => setIsWebOpenActive(false), 900)
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      setIsAnimating(true)
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 800)
      return () => clearTimeout(timer)
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const checkHeroAnimation = () => {
      const isAnimated = document.documentElement.getAttribute("data-hero-animated") === "true"
      setHeaderVisible(isAnimated)
    }

    checkHeroAnimation()
    const observer = new MutationObserver(checkHeroAnimation)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-hero-animated"] })

    return () => observer.disconnect()
  }, [])

  const navLinks = [
    { href: "/", label: "HOME", section: "home" },
    { href: "/", label: "OUR WORK", section: "work" },
    { href: "/", label: "OUR SERVICES", section: "services" },
    { href: "/", label: "ABOUT", action: "about" },
    { href: "/", label: "CONTACT US", action: "contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/#home") return pathname === "/"
    if (href.startsWith("/#")) return false
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ease-out ${scrollY >= 100 || isMenuOpen ? "bg-[#0e0e0e]" : "bg-[#0e0e0e]"
          }`}
        initial={{ y: '-100%' }}
        animate={{ y: isWebOpenAnimating ? 0 : '-100%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div
          className="flex items-center justify-between px-3 md:px-5 lg:px-8 py-3 md:py-4 w-full"
        >
          {/* Logo Text - LOZINR */}
          <Link href="/">
            <span className="text-white font-bold text-lg md:text-xl tracking-tight cursor-pointer">LOZINR</span>
          </Link>

          {/* CTA Button and Hamburger */}
          <div className="flex items-center gap-3 md:gap-4">
            <motion.button
              onClick={handleWebOpenClick}
              initial={{ width: 44 }}
              animate={isWebOpenAnimating ? { width: 160 } : { width: 44 }}
              transition={{
                duration: 1.5,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onHoverStart={() => setIsCtaHovering(true)}
              onHoverEnd={() => setIsCtaHovering(false)}
              className="h-[44px] bg-transparent border-l-2 border-r-2 border-white rounded-full flex items-center justify-center px-2 py-2 gap-2 overflow-hidden hover:bg-white/5 cursor-pointer focus:outline-none relative"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={isWebOpenAnimating ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  staggerChildren: 0.05,
                  delayChildren: 1.0,
                  duration: 0.8
                }}
                className="text-white font-medium text-[14px] whitespace-nowrap flex"
                style={{ perspective: 1200 }}
              >
                {'Schedule a Call'.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{
                      opacity: 0,
                      rotateX: 90,
                      rotateY: -45,
                      y: 20,
                      filter: 'blur(4px)'
                    }}
                    animate={{
                      opacity: 1,
                      rotateX: 0,
                      rotateY: 0,
                      y: 0,
                      filter: 'blur(0px)'
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.23, 1, 0.320, 1]
                    }}
                    style={{ perspective: 1200 }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.span>

              <motion.div
                className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden relative flex-shrink-0"
                initial={{ boxShadow: '0 0 0px rgba(255, 255, 255, 0)' }}
                animate={isWebOpenAnimating ? {
                  boxShadow: [
                    '0 0 0px rgba(255, 255, 255, 0)',
                    '0 0 20px rgba(255, 255, 255, 0.4)',
                    '0 0 0px rgba(255, 255, 255, 0)'
                  ]
                } : {}}
                transition={isWebOpenAnimating ? {
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 1.5
                } : {}}
              >
                <motion.div
                  animate={{
                    x: isCtaHovering ? 40 : 0,
                    opacity: isCtaHovering ? 0 : 1,
                    rotate: isCtaHovering ? 45 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute"
                >
                  <ArrowRight className="w-6 h-6 text-black" strokeWidth={2} />
                </motion.div>

                <motion.div
                  animate={{
                    x: isCtaHovering ? 0 : -40,
                    opacity: isCtaHovering ? 1 : 0,
                    rotate: isCtaHovering ? -45 : 0
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute"
                >
                  <ArrowRight className="w-6 h-6 text-black" strokeWidth={2} />
                </motion.div>
              </motion.div>
            </motion.button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative flex items-center justify-center w-6 h-6 md:w-7 md:h-7 group"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-5 h-3.5">
                <span
                  className={`absolute left-0 h-[1.9px] bg-white transition-all duration-700 ease-in-out ${isMenuOpen
                    ? `top-1/2 -translate-y-1/2 rotate-45 w-full`
                    : `top-0 w-full group-hover:w-3/5`
                    }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.9px] bg-white transition-all duration-700 ease-in-out ${isMenuOpen
                    ? `w-0 opacity-0`
                    : `w-full opacity-100 group-hover:w-4/5 group-hover:translate-x-1`
                    }`}
                />
                <span
                  className={`absolute left-0 h-[1.9px] bg-white transition-all duration-700 ease-in-out ${isMenuOpen
                    ? `bottom-1/2 translate-y-1/2 -rotate-45 w-full`
                    : `bottom-0 w-full group-hover:w-2/5`
                    }`}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <div
        className={`fixed inset-0 z-40 overflow-hidden ${isAnimating || isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Background curtain panels */}
        <div className="absolute inset-0 flex">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 bg-[#0e0e0e] transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? "scale-y-100 origin-bottom" : "scale-y-0 origin-top"}`}
              style={{
                transitionDuration: "1500ms",
                transitionDelay: isMenuOpen ? `${i * 50}ms` : `${(4 - i) * 30}ms`,
              }}
            />
          ))}
        </div>

        {/* Content container */}
        <div className="relative h-full flex flex-col justify-between items-center px-3 md:px-5 lg:px-8 pt-20 pb-8 md:pb-10">
          {/* Main Navigation */}
          <nav className="flex-1 flex items-center justify-center">
            <ul className="flex flex-col gap-2humbnailhang items-center text-center">
              {navLinks.map((link, index) => (
                <li key={link.label} className="overflow-hidden">
                  {link.action === "about" ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsAboutOpen(true)
                      }}
                      className={`block text-[50px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out cursor-pointer text-white hover:text-[#ff3a09]`}
                      style={{
                        transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                        opacity: isMenuOpen ? 1 : 0,
                        transitionDuration: "1500ms",
                        transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {link.label}
                    </button>
                  ) : link.action === "contact" ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        setIsContactOpen(true)
                      }}
                      className={`block text-[50px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out cursor-pointer text-white hover:text-[#ff3a09]`}
                      style={{
                        transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                        opacity: isMenuOpen ? 1 : 0,
                        transitionDuration: "1500ms",
                        transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {link.label}
                    </button>
                  ) : link.section ? (
                    <button
                      onClick={() => {
                        setIsMenuOpen(false)
                        const element = document.getElementById(link.section)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      className={`block text-[50px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out cursor-pointer text-white hover:text-[#ff3a09]`}
                      style={{
                        transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                        opacity: isMenuOpen ? 1 : 0,
                        transitionDuration: "1500ms",
                        transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block text-[50px] md:text-[89px] lg:text-[101px] tracking-tight font-regular leading-[0.95] transition-colors duration-100 ease-in-out ${isActive(link.href) ? "text-white" : "text-white hover:text-[#ff3a09]"}`}
                      style={{
                        transform: isMenuOpen ? "translateY(0)" : "translateY(120%)",
                        opacity: isMenuOpen ? 1 : 0,
                        transitionDuration: "1500ms",
                        transitionDelay: isMenuOpen ? `${400 + index * 80}ms` : `${(navLinks.length - index) * 40}ms`,
                        transitionProperty: "transform, opacity",
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section - Social links */}
          <div className="flex items-center justify-center w-full">
            <div
              className="flex flex-row items-center gap-4 md:gap-6"
              style={{
                transform: isMenuOpen ? "translateY(0)" : "translateY(100%)",
                opacity: isMenuOpen ? 1 : 0,
                transitionDelay: isMenuOpen ? "1500ms" : "0ms",
              }}
            >
              <a
                href="https://www.instagram.com/adnanahmedakif/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 text-white text-[12px] md:text-[14px] font-medium tracking-tight hover:text-[#ff3a09] transition-opacity"
              >
                Instagram
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-black -rotate-45" strokeWidth={2.5} />
                </div>
              </a>
              <a
                href="https://www.facebook.com/adnanahakif"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 text-white text-[12px] md:text-[14px] font-medium tracking-tight hover:text-[#ff3a09] group-hover:text-[#ff3a09] transition-opacity"
              >
                Facebook
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-black -rotate-45" strokeWidth={2.5} />
                </div>
              </a>
              <a
                href="https://www.youtube.com/@adnanahmedakif"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 text-white text-[12px] md:text-[14px] font-medium tracking-tight hover:text-[#ff3a09] transition-opacity"
              >
                YouTube
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="w-2.5 h-2.5 md:w-3 md:h-3 text-black -rotate-45" strokeWidth={2.5} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={`${headerVisible ? "h-[40px] md:h-[48px]" : "h-0"}`} />

      {/* Web-Open CTA Expansion Animation Overlay */}
      <AnimatePresence mode="wait">
        {isWebOpenActive && (
          <>
            {/* Black overlay background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 bg-black"
              style={{ zIndex: 9998 }}
            />

            {/* Top slice that moves up on exit */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '-100vh' }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 right-0 h-1/2 bg-black/70 backdrop-blur-sm"
              style={{ zIndex: 9997 }}
            />

            {/* Bottom slice that moves down on exit */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed bottom-0 left-0 right-0 h-1/2 bg-black/70 backdrop-blur-sm"
              style={{ zIndex: 9997 }}
            />

            {/* CTA Button Container with Web-Open Animation */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center px-4"
              style={{ zIndex: 9999, perspective: 1000 }}
              initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{
                x: '150vw',
                opacity: 0,
                rotateY: 20,
                transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
              }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <motion.button
                initial={{ width: 56, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                animate={isWebOpenVisible ? { width: 180 } : { width: 56 }}
                exit={{ width: 56 }}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                onHoverStart={() => setIsCtaHovering(true)}
                onHoverEnd={() => setIsCtaHovering(false)}
                onClick={() => {
                  handleWebOpenExit()
                  setTimeout(() => setIsContactOpen(true), 900)
                }}
                className="relative h-[52px] backdrop-blur-sm border-l-2 border-r-2 border-white rounded-full flex items-center justify-between px-2 py-2 gap-2 overflow-hidden cursor-pointer focus:outline-none"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                {/* Text with character-level 3D flip animation */}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isWebOpenVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                    duration: 0.8
                  }}
                  className="text-white font-medium text-base whitespace-nowrap flex"
                  style={{ perspective: 1200 }}
                >
                  {'Open Website'.split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        opacity: 0,
                        rotateX: 90,
                        rotateY: -45,
                        y: 20,
                        filter: 'blur(4px)'
                      }}
                      animate={{
                        opacity: 1,
                        rotateX: 0,
                        rotateY: 0,
                        y: 0,
                        filter: 'blur(0px)'
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.23, 1, 0.320, 1]
                      }}
                      style={{ perspective: 1200 }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.span>

                {/* Arrow circle with glow effect */}
                <motion.div
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden relative flex-shrink-0"
                  initial={{ boxShadow: '0 0 0px rgba(255, 255, 255, 0)' }}
                  animate={isWebOpenVisible ? {
                    boxShadow: [
                      '0 0 0px rgba(255, 255, 255, 0)',
                      '0 0 20px rgba(255, 255, 255, 0.4)',
                      '0 0 0px rgba(255, 255, 255, 0)'
                    ]
                  } : {}}
                  transition={isWebOpenVisible ? {
                    duration: 2.5,
                    repeat: Infinity,
                    delay: 1.2
                  } : {}}
                >
                  {/* Main arrow */}
                  <motion.div
                    animate={{
                      x: isCtaHovering ? 40 : 0,
                      opacity: isCtaHovering ? 0 : 1,
                      rotate: isCtaHovering ? 45 : 0
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute"
                  >
                    <ArrowRight className="w-6 h-6 text-black" strokeWidth={2} />
                  </motion.div>

                  {/* Secondary arrow */}
                  <motion.div
                    animate={{
                      x: isCtaHovering ? 0 : -40,
                      opacity: isCtaHovering ? 1 : 0,
                      rotate: isCtaHovering ? -45 : 0
                    }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute"
                  >
                    <ArrowRight className="w-6 h-6 text-black" strokeWidth={2} />
                  </motion.div>
                </motion.div>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* About Popup */}
      <AboutPopup isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
