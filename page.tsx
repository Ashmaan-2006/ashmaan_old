"use client"

import { Github, Mail, Linkedin, Twitter, Moon, Sun, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import TypingEffect from "@/components/typing-effect"
import CursorEffect from "@/components/cursor-effect"
import SkillCard from "@/components/skill-card"
import ProjectCard from "@/components/project-card"
import Breadcrumb from "@/components/breadcrumb"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const clickCount = useRef(0)

  // Skills data with proficiency levels
  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 92 },
    { name: "Next.js", level: 88 },
    { name: "Node.js", level: 80 },
    { name: "CSS/Tailwind", level: 95 },
    { name: "Git", level: 85 },
    { name: "UI/UX Design", level: 75 },
  ]

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Project Alpha",
      description: "A full-stack application with real-time updates and interactive dashboards.",
      image: "/placeholder.svg?height=300&width=600&text=Project+1",
      tags: ["React", "Node.js", "MongoDB"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      id: 2,
      title: "Project Beta",
      description: "An e-commerce platform with payment integration and inventory management.",
      image: "/placeholder.svg?height=300&width=600&text=Project+2",
      tags: ["Next.js", "Stripe", "Tailwind CSS"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      id: 3,
      title: "Project Gamma",
      description: "A mobile-first web application for tracking fitness goals and nutrition.",
      image: "/placeholder.svg?height=300&width=600&text=Project+3",
      tags: ["React Native", "Firebase", "Redux"],
      demoUrl: "#",
      codeUrl: "#",
    },
  ]

  // Handle logo clicks for easter egg
  const handleLogoClick = () => {
    clickCount.current += 1
    if (clickCount.current >= 5) {
      setShowEasterEgg(true)
      setTimeout(() => {
        setShowEasterEgg(false)
        clickCount.current = 0
      }, 3000)
    }
  }

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Cursor effect */}
      <CursorEffect />

      {/* Easter egg animation */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-6xl md:text-8xl font-bold text-primary"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{
                scale: [0.5, 1.2, 1],
                rotate: [-10, 10, 0],
                transition: { duration: 0.6 },
              }}
            >
              Hello World! 🎉
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sticky top-0 z-20 backdrop-blur-sm bg-background/80 border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
            <Sparkles className="h-5 w-5 text-primary" />
            <span>YourName</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <Link href="#contact">Get in touch</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Breadcrumb navigation */}
      <Breadcrumb />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 container">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Hi, I'm{" "}
              <span className="text-primary">
                <TypingEffect texts={["Your Name", "a Developer", "a Designer", "a Creator"]} />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              A passionate developer building{" "}
              <span className="text-primary">
                <TypingEffect
                  texts={[
                    "amazing digital experiences",
                    "responsive web applications",
                    "elegant user interfaces",
                    "powerful backend systems",
                    "innovative mobile apps",
                    "accessible websites",
                  ]}
                  typingSpeed={70}
                  delayBetweenTexts={2000}
                />
              </span>
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#projects">View My Work</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="aspect-square relative rounded-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="Your Name"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              <div className="space-y-4">
                <p className="text-lg">
                  I'm a passionate developer with expertise in building modern web applications. With a strong
                  foundation in frontend and backend technologies, I create seamless digital experiences that solve
                  real-world problems.
                </p>
                <p className="text-lg">
                  When I'm not coding, you can find me exploring new technologies, contributing to open source projects,
                  or enjoying outdoor activities.
                </p>
                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <Link href="#" download>
                      Download Resume
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">My Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill) => (
                <SkillCard key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Fun Interactive Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8 text-center">Let's Have Some Fun</h2>
            <div className="max-w-2xl mx-auto">
              <div className="bg-card rounded-xl border p-8 text-center">
                <h3 className="text-xl font-bold mb-4">Memory Game</h3>
                <p className="mb-6 text-muted-foreground">
                  Take a quick break and test your memory with this simple game.
                </p>
                <MemoryGame />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out if you're looking for a developer, have a question, or just want to connect.
              </p>
              <div className="flex justify-center gap-4 mb-8">
                <motion.div whileHover={{ y: -5 }}>
                  <Button size="icon" variant="outline" asChild>
                    <Link href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                  <Button size="icon" variant="outline" asChild>
                    <Link href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                  <Button size="icon" variant="outline" asChild>
                    <Link href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ y: -5 }}>
                  <Button size="icon" variant="outline" asChild>
                    <Link href="mailto:your.email@example.com">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <div className="bg-card p-8 rounded-xl border">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name
                      </label>
                      <input
                        id="name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="font-medium">© {new Date().getFullYear()} YourName. All rights reserved.</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Simple Memory Game Component
function MemoryGame() {
  const [cards, setCards] = useState<number[]>([])
  const [flipped, setFlipped] = useState<number[]>([])
  const [solved, setSolved] = useState<number[]>([])
  const [disabled, setDisabled] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  // Initialize game
  const startGame = () => {
    const newCards = [1, 1, 2, 2, 3, 3, 4, 4].sort(() => Math.random() - 0.5)
    setCards(newCards)
    setFlipped([])
    setSolved([])
    setDisabled(false)
    setGameStarted(true)
  }

  // Handle card click
  const handleClick = (index: number) => {
    // Return if the same card is clicked or disabled
    if (flipped.includes(index) || solved.includes(index) || disabled) return

    // Add card to flipped array
    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    // Check if two cards are flipped
    if (newFlipped.length === 2) {
      setDisabled(true)

      // Check if cards match
      const [first, second] = newFlipped
      if (cards[first] === cards[second]) {
        setSolved([...solved, first, second])
        setFlipped([])
        setDisabled(false)
      } else {
        // If no match, flip back after delay
        setTimeout(() => {
          setFlipped([])
          setDisabled(false)
        }, 1000)
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      {!gameStarted ? (
        <Button onClick={startGame}>Start Game</Button>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className={`w-16 h-16 flex items-center justify-center rounded-md cursor-pointer transition-all duration-300 ${
                  flipped.includes(index) || solved.includes(index)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                {(flipped.includes(index) || solved.includes(index)) && card}
              </div>
            ))}
          </div>
          {solved.length === 8 && (
            <div className="mt-4 text-center">
              <p className="text-green-500 font-bold mb-2">You won! 🎉</p>
              <Button onClick={startGame}>Play Again</Button>
            </div>
          )}
          {solved.length < 8 && (
            <Button variant="outline" size="sm" onClick={startGame}>
              Restart
            </Button>
          )}
        </>
      )}
    </div>
  )
}

