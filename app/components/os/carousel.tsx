"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  /** One node per slide. */
  items: ReactNode[]
  /** Tailwind flex-basis per slide, controls how many are visible at once. */
  slideClassName?: string
  ariaLabel: string
  /** Auto-advance through slides, looping back to the start at the end. */
  autoPlay?: boolean
  /** Milliseconds between auto-advances. */
  interval?: number
}

/**
 * Swipeable, scroll-snap carousel with arrow controls, a progress bar and a
 * live "current / total" counter. Built on native horizontal scroll so it
 * supports touch/trackpad drag out of the box and scales to any number of
 * items — an extra project just extends the track instead of growing the page.
 *
 * With `autoPlay`, it advances on a timer, pauses on hover/focus, resumes on
 * leave, and honours `prefers-reduced-motion`.
 */
export function Carousel({
  items,
  slideClassName = "basis-full md:basis-1/2",
  ariaLabel,
  autoPlay = false,
  interval = 4000,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [paused, setPaused] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const left = el.scrollLeft
    setProgress(max > 0 ? left / max : 0)
    setAtStart(left <= 2)
    setAtEnd(left >= max - 2)
    const slide = el.firstElementChild as HTMLElement | null
    const step = slide ? slide.offsetWidth + 24 /* gap-6 */ : el.clientWidth
    setActive(Math.round(left / step))
  }, [])

  useEffect(() => {
    update()
    const el = trackRef.current
    if (!el) return
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [update])

  // Advance by a full viewport ("page"). Combined with snap-mandatory this
  // always settles on whole cards, so a half-card is never left visible.
  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" })
  }

  // Auto-advance: step forward, wrapping to the start once the end is reached.
  useEffect(() => {
    if (!autoPlay || paused || items.length <= 1) return
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const id = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const max = el.scrollWidth - el.clientWidth
      if (el.scrollLeft >= max - 2) {
        el.scrollTo({ left: 0, behavior: "smooth" })
      } else {
        scrollBy(1)
      }
    }, interval)
    return () => clearInterval(id)
  }, [autoPlay, paused, interval, items.length])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); scrollBy(1) }
          if (e.key === "ArrowLeft") { e.preventDefault(); scrollBy(-1) }
        }}
        className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 outline-none"
      >
        {items.map((item, i) => (
          <div key={i} className={`${slideClassName} shrink-0 snap-start snap-always`}>
            {item}
          </div>
        ))}
      </div>

      {/* Controls: counter · progress bar · arrows */}
      <div className="mx-auto mt-7 flex max-w-5xl items-center gap-4">
        <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
          <span className="text-primary">{String(Math.min(active + 1, items.length)).padStart(2, "0")}</span>
          {" / "}
          {String(items.length).padStart(2, "0")}
        </span>

        <div className="relative h-px flex-1 bg-border">
          <div
            className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-200"
            style={{ width: `${Math.max(8, progress * 100)}%`, height: 2, top: -0.5 }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-300 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-primary-foreground disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-all duration-300 enabled:hover:border-primary enabled:hover:bg-primary enabled:hover:text-primary-foreground disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
