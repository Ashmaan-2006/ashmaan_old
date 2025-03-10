"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenTexts?: number
}

export default function TypingEffect({
  texts,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
}: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    // Handle typing effect
    if (!isPaused) {
      if (!isDeleting && currentText.length < texts[currentTextIndex].length) {
        // Still typing
        timeout = setTimeout(() => {
          setCurrentText(texts[currentTextIndex].substring(0, currentText.length + 1))
        }, typingSpeed)
      } else if (!isDeleting && currentText.length === texts[currentTextIndex].length) {
        // Finished typing, pause before deleting
        setIsPaused(true)
        timeout = setTimeout(() => {
          setIsPaused(false)
          setIsDeleting(true)
        }, delayBetweenTexts)
      } else if (isDeleting && currentText.length > 0) {
        // Deleting
        timeout = setTimeout(() => {
          setCurrentText(texts[currentTextIndex].substring(0, currentText.length - 1))
        }, deletingSpeed)
      } else if (isDeleting && currentText.length === 0) {
        // Finished deleting, move to next text
        setIsDeleting(false)
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, delayBetweenTexts])

  return (
    <span className="inline-block min-w-[4ch]">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

