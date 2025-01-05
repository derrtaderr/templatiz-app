import { VideoStudio } from "@/components/video-studio"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"

export default function VideoStudioPage() {
  return (
    <div className="container py-8 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <BreadcrumbNavigation items={[
        { label: "Content Suite", href: "/content-suite" },
        { label: "Video Studio", href: "/video-studio" },
      ]} />
      <VideoStudio />
    </div>
  )
}

