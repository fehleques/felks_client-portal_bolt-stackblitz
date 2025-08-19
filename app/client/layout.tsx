import { MainNav } from "@/components/main-nav"
import { AuthGuard } from "@/components/auth-guard"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="client">
      <div className="min-h-screen flex flex-col">
        <MainNav userRole="client" />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}