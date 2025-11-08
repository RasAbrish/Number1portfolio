import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const techStack = [
  {
    category: "Frontend",
    technologies: [
      {
        name: "Next.js 14",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        description: "React framework for production",
      },
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        description: "UI component library",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        description: "Type-safe JavaScript",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
        description: "Utility-first CSS framework",
      },
    ],
  },
  {
    category: "UI Components",
    technologies: [
      {
        name: "shadcn/ui",
        icon: "/placeholder.svg?height=50&width=50",
        description: "Reusable UI components",
      },
      {
        name: "Lucide Icons",
        icon: "/placeholder.svg?height=50&width=50",
        description: "Beautiful icon set",
      },
    ],
  },
  {
    category: "Development Tools",
    technologies: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        description: "Version control",
      },
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        description: "Code editor",
      },
    ],
  },
  {
    category: "Deployment",
    technologies: [
      {
        name: "Vercel",
        icon: "/placeholder.svg?height=50&width=50",
        description: "Hosting platform",
      },
    ],
  },
]

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-20">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Technologies Used</h2>
        <div className="grid gap-8">
          {techStack.map((category) => (
            <div key={category.category}>
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.technologies.map((tech) => (
                  <Card key={tech.name} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 shrink-0">
                          <Image
                            src={tech.icon || "/placeholder.svg"}
                            alt={tech.name}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{tech.name}</h4>
                          <p className="text-sm text-muted-foreground">{tech.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Key Features</h3>
          <ul className="grid gap-2 list-disc list-inside text-muted-foreground">
            <li>Type-safe development with TypeScript</li>
            <li>Server-side rendering with Next.js 14</li>
            <li>Responsive design with Tailwind CSS</li>
            <li>Reusable UI components from shadcn/ui</li>
            <li>Modern animations and transitions</li>
            <li>Mobile-first approach</li>
            <li>SEO optimized</li>
            <li>Fast page loads with image optimization</li>
            <li>Interactive contact form with validation</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
