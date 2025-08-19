import { MainNav } from "@/components/main-nav"

export default function DesignerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="designer" />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}