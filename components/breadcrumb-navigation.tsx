interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbNavigation({ items }: BreadcrumbNavigationProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb" />
  )
}

