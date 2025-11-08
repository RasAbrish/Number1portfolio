"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

interface TechCardProps {
  name: string
  icon: string
  description: string
  delay: number
}

export default function TechCard({ name, icon, description, delay }: TechCardProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Card
      ref={ref}
      className={cn(
        "group hover:scale-105 transition-all duration-500 opacity-0 translate-y-8",
        inView && "opacity-100 translate-y-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src={icon || "/placeholder.svg"}
              alt={name}
              fill
              className="object-contain group-hover:rotate-12 transition-transform duration-300"
            />
          </div>
          <div>
            <h4 className="font-medium group-hover:text-primary transition-colors">{name}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
