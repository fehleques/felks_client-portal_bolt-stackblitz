import { MainNav } from "@/components/main-nav"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session || session.user.role !== "client") {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav userRole={session.user.role} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}