import { Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "./ui/button"

export function SocialLinks() {
  return (
    <div className="flex items-center gap-1">
      <a href="#" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Button>
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <Linkedin className="h-5 w-5" />
          <span className="sr-only">LinkedIn</span>
        </Button>
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon">
          <Twitter className="h-5 w-5" />
          <span className="sr-only">Twitter</span>
        </Button>
      </a>
    </div>
  )
}
