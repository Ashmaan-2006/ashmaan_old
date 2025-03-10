"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"

export default function Breadcrumb() {
  const [activeSection, setActiveSection] = useState("home")
  const sections = ["home", "about", "skills", "projects", "contact"]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100 // Offset to trigger slightly before reaching section

      // Get all section elements
      const sectionElements = sections.map((id) =>
        id === "home" ? document.querySelector("main") : document.getElementById(id),
      )

      // Find the current section based on scroll position
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-background/95 backdrop-blur-sm border-b py-2 sticky top-16 z-10">
      <div className="container flex items-center text-sm">
        <Link href="#" className="text-primary hover:text-primary/80 transition-colors">
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>

        {activeSection !== "home" && (
          <>
            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
            <Link
              href={`#${activeSection}`}
              className="capitalize text-primary hover:text-primary/80 transition-colors"
            >
              {activeSection}
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

