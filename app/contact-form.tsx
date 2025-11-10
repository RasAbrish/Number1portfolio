"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Loader2, CheckCircle2 } from "lucide-react"

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [message, setMessage] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const name = formData.get("name")
      const email = formData.get("email")
      const subject = formData.get("subject")
      const messageText = formData.get("message")

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message: messageText,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setMessage("Message sent successfully to abrhambest7@gmail.com!")
        setIsSent(true)
        form.reset()
        setTimeout(() => {
          setIsSent(false)
          setMessage("")
        }, 4000)
      } else {
        setMessage(result.message || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      setMessage("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`flex items-center gap-2 p-4 border rounded-lg ${
            isSent ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
          }`}
        >
          <CheckCircle2 className={`h-5 w-5 ${isSent ? "text-green-500" : "text-red-500"}`} />
          <p className={`text-sm ${isSent ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"}`}>
            {message}
          </p>
        </div>
      )}
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input id="name" name="name" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" name="email" type="email" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">
          Subject
        </label>
        <Input id="subject" name="subject" required />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea id="message" name="message" className="min-h-[150px]" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}
