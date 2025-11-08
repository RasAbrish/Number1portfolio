import { Github, Linkedin, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Abrham Ababu</h3>
            <p className="text-muted-foreground">
              Full Stack Developer passionate about creating innovative web solutions and solving real-world problems.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com/RasAbrish" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/abrham-ababu-85a112297/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="mailto:abrhambest7@gmail.com" title="Email">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://t.me/RASAbrish" target="_blank" rel="noopener noreferrer" title="Telegram">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Telegram</span>
                </a>
              </Button>
            </div>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Email: abrhambest7@gmail.com</p>
              <p>Telegram: @RASAbrish</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Abrham Ababu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
