import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/lib/placeholder-images"
import { ArrowUpRight } from "lucide-react"

export function ProjectCard({ title, description, imageUrl, imageHint, links }: Project) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Image
          src={imageUrl}
          alt={title}
          data-ai-hint={imageHint}
          width={600}
          height={400}
          className="w-full h-auto object-cover"
        />
      </CardContent>
      <CardFooter className="flex-grow flex items-end p-4 bg-background/30 gap-2">
        {links.map((link) => (
          <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="sm">
              {link.label}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        ))}
      </CardFooter>
    </Card>
  )
}
