import type { Project } from "@/types"

// Project data
export const projects: Project[] = [
  {
    id: "ethioagri",
    title: "EthioAgri",
    description:
      "A comprehensive agricultural platform connecting Ethiopian farmers with resources, markets, and agricultural information.",
    longDescription:
      "EthioAgri is a platform designed to empower Ethiopian farmers by providing access to agricultural resources, market prices, weather forecasts, and connecting them directly with buyers. The platform includes features for crop management, marketplace listings, and educational resources tailored to local farming practices.",
    technologies: ["PHP", "JavaScript", "React", "CSS", "SQL", "Responsive Design"],
    features: [
      "Real-time market price updates",
      "Weather forecasts for agricultural planning",
      "Direct farmer-to-buyer marketplace",
      "Educational resources and best practices",
      "Crop management tools",
      "Mobile-responsive design for rural access",
    ],
    githubUrl: "https://github.com/RasAbrish/ethioagri",
    liveUrl: "#",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tags: ["PHP", "React", "SQL"],
  },
  {
    id: "ethiovisit",
    title: "EthioVisit",
    description:
      "A tourism platform showcasing Ethiopia's destinations, cultural experiences, and travel planning resources.",
    longDescription:
      "EthioVisit is a comprehensive tourism platform that highlights Ethiopia's rich cultural heritage, historical sites, and natural wonders. The platform offers interactive maps, travel itineraries, booking capabilities, and cultural insights to help tourists plan their perfect Ethiopian adventure.",
    technologies: ["JavaScript", "React", "CSS", "Responsive Design", "Interactive Maps"],
    features: [
      "Interactive destination maps",
      "Cultural and historical information",
      "Customizable travel itineraries",
      "Booking integration for hotels and tours",
      "User reviews and recommendations",
      "Photo galleries of destinations",
    ],
    githubUrl: "https://github.com/RasAbrish/ethiovisit",
    liveUrl: "#",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tags: ["JavaScript", "React", "CSS"],
  },
  {
    id: "fuelfinder",
    title: "FuelFinder",
    description:
      "A mobile application helping users locate nearby fuel stations, compare prices, and navigate during fuel shortages.",
    longDescription:
      "FuelFinder is a solution developed to address fuel accessibility challenges in Ethiopia. The app allows users to find nearby fuel stations, check real-time availability, compare prices, and get navigation directions. It includes features for user reports on fuel availability, queue lengths, and price updates.",
    technologies: ["Flutter", "React", "Node.js", "PostgreSQL", "Figma", "Jira"],
    features: [
      "Real-time fuel availability tracking",
      "Price comparison across stations",
      "Navigation to nearest available fuel",
      "User-generated reports and updates",
      "Queue time estimations",
      "Offline functionality for areas with poor connectivity",
    ],
    githubUrl: "https://github.com/RasAbrish/fuelfinder",
    liveUrl: "#",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    tags: ["Flutter", "React", "Node.js"],
  },
]
