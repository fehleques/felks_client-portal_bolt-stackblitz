import { MainNav } from "@/components/main-nav"
import { AuthGuard } from "@/components/auth-guard"

export default function DesignerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requiredRole="designer">
      <div className="min-h-screen flex flex-col">
        <MainNav userRole="designer" />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}