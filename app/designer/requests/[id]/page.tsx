import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

// Required for static export
export async function generateStaticParams() {
  return [
    { id: 'req1' },
    { id: 'req2' },
    { id: 'req3' },
  ]
}

// Mock request data
const mockRequest = {
  id: "req1",
  clientId: "client1",
  title: "Logo design for tech startup",
  description: "A modern, minimal logo for a fintech startup. The name is 'Flume'. The logo should be clean, professional, and convey trust and innovation. Please provide multiple variations including horizontal and vertical layouts.",
  category: "Logo Design",
  status: "pending",
  priority: "high",
  deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
  createdAt: new Date(Date.now() - 86400000).toISOString(),
  updatedAt: new Date().toISOString(),
  clientName: "TechCorp Inc.",
  clientEmail: "contact@techcorp.com"
}

export default function DesignerRequestDetailPage({
  params,
}: {
  params: { id: string }
}) {

  const isOverdue = new Date(mockRequest.deadline) < new Date()
  const daysUntilDeadline = Math.ceil((new Date(mockRequest.deadline).getTime() - Date.now()) / 86400000)

  return (
    <div className="container py-6 md:py-8 space-y-6">
              <div className="flex items-center gap-4">
          <Link href="/designer/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
        <div>
          <h1 className="text-2xl font-bold">Request Details</h1>
          <p className="text-muted-foreground">Review and accept design requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{mockRequest.title}</CardTitle>
                  <CardDescription className="mt-2">
                    Requested by {mockRequest.clientName}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">{mockRequest.category}</Badge>
                  <Badge variant={mockRequest.priority === "high" ? "destructive" : "secondary"}>
                    {mockRequest.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {mockRequest.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <p className="font-medium">{format(new Date(mockRequest.createdAt), "MMM d, yyyy")}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Deadline:</span>
                  <p className={`font-medium flex items-center gap-1 ${isOverdue ? "text-red-500" : ""}`}>
                    {format(new Date(mockRequest.deadline), "MMM d, yyyy")}
                    {isOverdue && <AlertCircle className="h-3 w-3" />}
                  </p>
                </div>
              </div>

              {!isOverdue && (
                <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                  <Clock className="h-4 w-4" />
                  <span>Due in {daysUntilDeadline} day{daysUntilDeadline !== 1 ? 's' : ''}</span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-muted-foreground">Company:</span>
                  <p className="font-medium">{mockRequest.clientName}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Contact:</span>
                  <p className="font-medium">{mockRequest.clientEmail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/designer/dashboard">
                <Button className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept Request
                </Button>
              </Link>
              <Button variant="outline" className="w-full">
                Contact Client
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Notes functionality would be implemented in a client component.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
