import { MainNav } from "@/components/main-nav"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole="client" />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}