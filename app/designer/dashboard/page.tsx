import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Clock, CheckCircle2, Filter, Workflow,
  Calendar, ClipboardCheck
} from "lucide-react"
import { RequestList } from "@/components/request-list"
import { DesignRequest } from "@/types"
import { prisma } from "@/lib/prisma"

export default async function DesignerDashboard() {
  const [rawAvailableRequests, rawMyActiveWork] = await Promise.all([
    prisma.designRequest.findMany({ where: { status: "pending" } }),
    prisma.designRequest.findMany({ where: { designerId: "designer1", NOT: { status: "completed" } } })
  ])

  const serialize = (r: any): DesignRequest => ({
    ...r,
    deadline: r.deadline.toISOString(),
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString()
  })

  const availableRequests = rawAvailableRequests.map(serialize)
  const myActiveWork = rawMyActiveWork.map(serialize)

  return (
    <div className="container py-6 md:py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Designer Dashboard</h1>
        <p className="text-muted-foreground">Manage your design tasks and monitor available requests</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Clock className="h-4 w-4 mr-2 text-amber-500" />
              Expiring Soon
            </CardTitle>
            <CardDescription>Urgent requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-muted-foreground">Due in next 24 hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <ClipboardCheck className="h-4 w-4 mr-2 text-blue-500" />
              In Progress
            </CardTitle>
            <CardDescription>Your active work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-sm text-muted-foreground">Current tasks</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Calendar className="h-4 w-4 mr-2 text-purple-500" />
              This Week
            </CardTitle>
            <CardDescription>Weekly workload</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-sm text-muted-foreground">Assigned projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Completed
            </CardTitle>
            <CardDescription>Finished tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold">Available Requests</h2>
        <div className="flex items-center gap-2">
          <Link href="/designer/requests">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </Link>
          <Link href="/designer/requests">
            <Button size="sm" className="flex items-center gap-1">
              <Workflow className="h-4 w-4" />
              View All
            </Button>
          </Link>
        </div>
      </div>
        
        <div className="grid grid-cols-1 gap-4">
          {availableRequests.slice(0, 3).map((request) => (
            <Card key={request.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{request.title}</h3>
                    <p className="text-sm text-muted-foreground">{request.category}</p>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="h-3 w-3 text-amber-500" />
                      <span className="font-medium text-amber-600 dark:text-amber-400">
                        Due in {Math.ceil((new Date(request.deadline).getTime() - Date.now()) / 86400000)} days
                      </span>
                    </div>
                    <div className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                      {request.priority}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm mb-4 line-clamp-2">{request.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Posted {new Date(request.createdAt).toLocaleDateString()}
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/designer/requests/${request.id}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="current" className="w-full">
        <TabsList>
          <TabsTrigger value="current">My Current Work</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Deadlines</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="mt-4">
          <RequestList 
            requests={myActiveWork} 
            emptyMessage="You don't have any active design tasks. Check available requests to pick up work."
          />
        </TabsContent>
        <TabsContent value="upcoming" className="mt-4">
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No upcoming deadlines at the moment.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}