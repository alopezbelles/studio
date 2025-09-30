import Link from "next/link"
import { CodeXml } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-card sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center">
        <CodeXml className="h-6 w-6" />
        <span className="ml-2 font-bold text-lg">PortfolioFlow</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          href="#about"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          About
        </Link>
        <Link
          href="#projects"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Projects
        </Link>
        <Link
          href="#contact"
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          Contact
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}
