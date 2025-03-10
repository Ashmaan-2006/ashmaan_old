"use client"

import { motion } from "framer-motion"

interface SkillCardProps {
  name: string
  level: number
}

export default function SkillCard({ name, level }: SkillCardProps) {
  return (
    <motion.div
      className="bg-card p-6 rounded-lg border overflow-hidden"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="font-medium mb-3">{name}</h3>
      <div className="w-full bg-muted rounded-full h-2.5 mb-1">
        <motion.div
          className="bg-primary h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
      <div className="text-xs text-right text-muted-foreground">{level}%</div>
    </motion.div>
  )
}

