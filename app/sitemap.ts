import type { MetadataRoute } from "next"

const baseUrl = "https://abrhamababuportfolio.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/projects", priority: 0.9 },
    { path: "/contact", priority: 0.6 },
  ]

  return pages.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: "monthly",
    priority,
  }))
}
