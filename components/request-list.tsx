import Link from "next/link"
import { format, isAfter } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Clock, AlertCircle, CheckCircle, ArrowRightCircle, RefreshCcw,
  XCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DesignRequest, RequestStatus } from "@/types"

interface RequestListProps {
  requests: DesignRequest[]
  emptyMessage?: string
}

export function RequestList({ requests, emptyMessage = "No requests found." }: RequestListProps) {
  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "in_progress":
        return <ArrowRightCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "revision":
        return <RefreshCcw className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
    }
  }
  
  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "in_progress":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "revision":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "medium":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "urgent":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }
  
  const isOverdue = (deadline: string) => {
    return !isAfter(new Date(deadline), new Date())
  }
  
  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <Clock className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">{emptyMessage}</p>
        <Link href="/client/new-request">
          <Button variant="outline" size="sm">Create Request</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {requests.map((request) => (
        <Card key={request.id} className="overflow-hidden transition-all duration-300 hover:shadow-soft-lg transform hover:-translate-y-1 rounded-xl border-0 shadow-soft">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <Badge variant="outline" className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full", getStatusColor(request.status))}>
                {getStatusIcon(request.status)}
                <span className="capitalize">{request.status.replace('_', ' ')}</span>
              </Badge>
              <Badge variant="outline" className={cn("px-3 py-1 rounded-full", getPriorityColor(request.priority))}>
                {request.priority}
              </Badge>
            </div>
            <CardTitle className="text-xl font-semibold line-clamp-1 mt-3">{request.title}</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-col gap-4">
              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{request.description}</p>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Created: {format(new Date(request.createdAt), "MMM d, yyyy")}
                </span>
                <span className={cn(
                  "flex items-center gap-1.5",
                  isOverdue(request.deadline) && request.status !== "completed" 
                    ? "text-red-500" 
                    : "text-muted-foreground"
                )}>
                  {isOverdue(request.deadline) && request.status !== "completed" && (
                    <AlertCircle className="h-3 w-3" />
                  )}
                  Due: {format(new Date(request.deadline), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-4 pb-4">
            <div className="flex justify-between w-full">
              <Badge variant="outline" className="px-3 py-1 rounded-full">{request.category}</Badge>
              <Button size="sm" variant="ghost" asChild className="hover:bg-muted/50 transition-all duration-200">
                <Link href={`/client/requests/${request.id}`}>
                  View
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}