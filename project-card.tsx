"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  demoUrl: string
  codeUrl: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="h-[400px] perspective-1000">
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-card rounded-lg border overflow-hidden flex flex-col">
          <div className="aspect-video relative">
            <img src={project.image || "/placeholder.svg"} alt={project.title} className="object-cover w-full h-full" />
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground mb-4 flex-1 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <Button onClick={() => setIsFlipped(true)} size="sm">
              Learn More
            </Button>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden bg-card rounded-lg border overflow-hidden flex flex-col p-6 rotate-y-180">
          <h3 className="text-xl font-bold mb-4">{project.title}</h3>
          <p className="text-muted-foreground mb-6 flex-1">{project.description}</p>
          <div className="flex gap-3 mb-4">
            <Button size="sm" variant="outline" asChild>
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                View Code
              </Link>
            </Button>
          </div>
          <Button onClick={() => setIsFlipped(false)} size="sm" variant="ghost">
            Back to Preview
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

