import Link from "next/link"
import { Button } from "@/components/ui/button"

interface RequestPageProps {
  params: { id: string }
}

export default function DesignerRequestPage({ params }: RequestPageProps) {
  return (
    <div className="container py-8 space-y-4">
      <h1 className="text-2xl font-bold">Request {params.id}</h1>
      <p className="text-muted-foreground">
        Placeholder details for request {params.id}.
      </p>
      <div className="flex gap-2">
        <Link href="/designer/requests">
          <Button variant="outline">Back</Button>
        </Link>
        <Button>Take Request</Button>
      </div>
    </div>
  )
}

