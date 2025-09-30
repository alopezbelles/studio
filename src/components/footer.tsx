import { SocialLinks } from "./social-links"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card">
      <p className="text-xs text-muted-foreground">
        &copy; {currentYear} PortfolioFlow. All rights reserved.
      </p>
      <div className="sm:ml-auto">
        <SocialLinks />
      </div>
    </footer>
  )
}
