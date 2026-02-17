"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ContactPopup } from "@/components/contact-popup"

export function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    company: "",
    services: {
      logoDesign: false,
      brandIdentity: false,
      webDesign: false,
    },
    message: "",
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [hoveredCta, setHoveredCta] = useState<string | null>(null)
  const [ctasInView, setCtasInView] = useState(false)
  const [formInView, setFormInView] = useState(false)
  const ctaContainerRef = useRef<HTMLDivElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess])

  useEffect(() => {
    if (ctasInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCtasInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ctaContainerRef.current) {
      observer.observe(ctaContainerRef.current)
    }

    return () => {
      if (ctaContainerRef.current) {
        observer.unobserve(ctaContainerRef.current)
      }
    }
  }, [ctasInView])

  useEffect(() => {
    if (formInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFormInView(true)
        }
      },
      { threshold: 0.2 }
    )

    if (formContainerRef.current) {
      observer.observe(formContainerRef.current)
    }

    return () => {
      if (formContainerRef.current) {
        observer.unobserve(formContainerRef.current)
      }
    }
  }, [formInView])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (service: keyof typeof formData.services) => {
    setFormData((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service],
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill in all required fields")
      return
    }

    const hasSelectedService = Object.values(formData.services).some((value) => value === true)
    if (!hasSelectedService) {
      alert("Please select at least one service")
      return
    }

    const formElement = e.currentTarget
    const formDataObj = new FormData(formElement)

    fetch("https://formspree.io/f/mblnejjn", {
      method: "POST",
      body: formDataObj,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setShowSuccess(true)
          setFormData({
            name: "",
            email: "",
            location: "",
            company: "",
            services: {
              logoDesign: false,
              brandIdentity: false,
              webDesign: false,
            },
            message: "",
          })
        }
      })
      .catch((error) => console.error("Form submission error:", error))
  }

  return (
    <>
      <footer id="contact" className="bg-[#ff3a09] text-white transition-colors duration-300">
        {/* Divider */}
        <div className="w-full h-px bg-white/10" />

        {/* Main Footer Content */}
        <div className="w-full px-3 lg:px-8 py-16 lg:py-25">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16">
            {/* Left Column - Schedule a Chat */}
            <div className="flex flex-col justify-start">
              <h2 className="text-[36px] font-regular text-white tracking-tighter mb-6 leading-tight">
                Schedule a chat
              </h2>
              <p className="text-base md:text-lg lg:text-[18px] text-white/80 mb-8 leading-tight">
                Ready to bring your vision to life? Let's talk about your project and how we can help you create something extraordinary.
              </p>
              <div className="flex flex-col gap-4" ref={ctaContainerRef}>
                <Link
                  href="https://wa.me/01615910614"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-block w-fit"
                  onMouseEnter={() => setHoveredCta('call')}
                  onMouseLeave={() => setHoveredCta(null)}
                >
                  <motion.div
                    className="flex items-center gap-12 bg-transparent border-b border-white text-white px-1.5 py-2 font-medium text-[16px] rounded-full hover:bg-white/5 transition-colors overflow-hidden"
                    initial={{ width: 'auto' }}
                    animate={{ width: 'auto' }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0 }}
                  >
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    >
                      Call Now
                    </motion.span>
                    <motion.div
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden relative"
                      animate={{ gap: hoveredCta === 'call' ? 12 : 8 }}
                      initial={{ gap: 8 }}
                    >
                      <motion.div
                        animate={{
                          x: hoveredCta === 'call' ? 30 : 0,
                          opacity: hoveredCta === 'call' ? 0 : 1,
                          rotate: hoveredCta === 'call' ? 45 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute"
                      >
                        <ArrowRight className="w-6 h-6 text-[#ff3a09]" strokeWidth={2} />
                      </motion.div>
                      <motion.div
                        animate={{
                          x: hoveredCta === 'call' ? 0 : -30,
                          opacity: hoveredCta === 'call' ? 1 : 0,
                          rotate: hoveredCta === 'call' ? -45 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute"
                      >
                        <ArrowRight className="w-6 h-6 text-[#ff3a09]" strokeWidth={2} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </Link>
                <Link
                  href="mailto:adnanakif.co@gmail.com"
                  className="group inline-block w-fit"
                  onMouseEnter={() => setHoveredCta('email')}
                  onMouseLeave={() => setHoveredCta(null)}
                >
                  <motion.div
                    className="flex items-center gap-2 bg-transparent border-t border-white text-white px-1.5 py-2 font-medium text-[16px] rounded-full hover:bg-white/5 transition-colors overflow-hidden"
                    initial={{ width: 'auto' }}
                    animate={{ width: 'auto' }}
                    transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
                  >
                    <motion.span
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    >
                      lozinrcontact@gmail.com
                    </motion.span>
                    <motion.div
                      className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden relative"
                      animate={{ gap: hoveredCta === 'email' ? 12 : 8 }}
                      initial={{ gap: 8 }}
                    >
                      <motion.div
                        animate={{
                          x: hoveredCta === 'email' ? 30 : 0,
                          opacity: hoveredCta === 'email' ? 0 : 1,
                          rotate: hoveredCta === 'email' ? 45 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute"
                      >
                        <ArrowRight className="w-6 h-6 text-[#ff3a09]" strokeWidth={2} />
                      </motion.div>
                      <motion.div
                        animate={{
                          x: hoveredCta === 'email' ? 0 : -30,
                          opacity: hoveredCta === 'email' ? 1 : 0,
                          rotate: hoveredCta === 'email' ? -45 : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="absolute"
                      >
                        <ArrowRight className="w-6 h-6 text-[#ff3a09]" strokeWidth={2} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div ref={formContainerRef}>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 bg-[#0dce8d] text-black px-4 py-3 rounded-lg font-medium"
                >
                  Message sent successfully! We'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Us Title */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0, ease: [0.33, 1, 0.68, 1] }}
                >
                  <h3 className="text-[36px] font-medium text-white tracking-tight mb-6">
                    Contact Us
                  </h3>
                </motion.div>

                {/* Name and Email - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <Input
                      type="text"
                      name="name"
                      placeholder="Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full h-auto bg-transparent text-white border-0 border-b border-white rounded-none focus-visible:ring-0 focus-visible:border-white placeholder-white/90 py-2 focus-visible:bg-transparent"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full h-auto bg-transparent text-white border-0 border-b border-white rounded-none focus-visible:ring-0 focus-visible:border-white placeholder-white/90 py-2 focus-visible:bg-transparent"
                    />
                  </motion.div>
                </div>

                {/* Location and Company - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <Input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full h-auto bg-transparent text-white border-0 border-b border-white rounded-none focus-visible:ring-0 focus-visible:border-white placeholder-white/90 py-2 focus-visible:bg-transparent"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.25, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <Input
                      type="text"
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full h-auto bg-transparent text-white border-0 border-b border-white rounded-none focus-visible:ring-0 focus-visible:border-white placeholder-white/90 py-2 focus-visible:bg-transparent"
                    />
                  </motion.div>
                </div>

                {/* Services Checkboxes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                >
                  <p className="text-white font-medium mb-4">What do you want our help with? *</p>
                  <div className="space-y-3">
                    <motion.label
                      className="flex items-center space-x-3 cursor-pointer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.35, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.logoDesign}
                        onChange={() => handleCheckboxChange("logoDesign")}
                        className="w-5 h-5 rounded bg-white/20 border border-white/50 cursor-pointer accent-white"
                      />
                      <span className="text-white">Brand Strategy</span>
                    </motion.label>
                    <motion.label
                      className="flex items-center space-x-3 cursor-pointer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.brandIdentity}
                        onChange={() => handleCheckboxChange("brandIdentity")}
                        className="w-5 h-5 rounded bg-white/20 border border-white/50 cursor-pointer accent-white"
                      />
                      <span className="text-white">Brand Identity</span>
                    </motion.label>
                    <motion.label
                      className="flex items-center space-x-3 cursor-pointer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={formInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.45, ease: [0.33, 1, 0.68, 1] }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.brandIdentity}
                        onChange={() => handleCheckboxChange("brandIdentity")}
                        className="w-5 h-5 rounded bg-white/20 border border-white/50 cursor-pointer accent-white"
                      />
                      <span className="text-white">Visual Identity Systems</span>
                    </motion.label>
                  </div>
                </motion.div>

                {/* Project Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.33, 1, 0.68, 1] }}
                >
                  <p className="text-white font-medium mb-3">Tell us about your project *</p>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full h-20 text-white border-0 border-b border-white rounded-none focus-visible:ring-0 focus-visible:border-white placeholder-white/90 py-2 focus-visible:bg-transparent resize-none"
                    placeholder="Your message..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-transparent text-white font-medium py-4 text-base md:text-lg border-0 border-b border-white rounded-none hover:bg-transparent"
                  >
                    Submit Message
                  </Button>
                </motion.div>
              </form>
            </div>
          </div>
        </div>


      </footer>

      {/* Contact Popup */}
      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  )
}
