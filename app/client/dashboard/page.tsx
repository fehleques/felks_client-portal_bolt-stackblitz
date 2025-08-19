"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlusCircle, Clock, CheckCircle2, FileWarning, AlertTriangle, 
  Thermometer, Zap, FileText
} from "lucide-react"
import { RequestList } from "@/components/request-list"
import { ThermometerDisplay } from "@/components/thermometer-display"
import { DesignRequest } from "@/types"

// Mock data
const activeRequests: DesignRequest[] = [
  {
    id: "req1",
    clientId: "client1",
    title: "Logo design for tech startup",
    description: "A modern, minimal logo for a fintech startup. The name is 'Flume'.",
    category: "Logo Design",
    status: "in_progress",
    priority: "high",
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date().toISOString(),
    designerId: "designer1"
  },
  {
    id: "req2",
    clientId: "client1",
    title: "Website banner for seasonal promotion",
    description: "Summer sale banner for e-commerce website. Bright and attractive.",
    category: "Web Design",
    status: "pending",
    priority: "medium",
    deadline: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    updatedAt: new Date().toISOString()
  }
];

const completedRequests: DesignRequest[] = [
  {
    id: "req3",
    clientId: "client1",
    title: "Social media post templates",
    description: "Set of 5 Instagram post templates for product launch",
    category: "Social Media Graphics",
    status: "completed",
    priority: "medium",
    deadline: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    designerId: "designer2"
  }
];

// Mock thermometer data
const thermometerData = {
  currentLevel: 65, // 0-100
  maxRequests: 5,
  currentRequests: 3,
  cooldownDate: undefined // No cooldown
};

export default function ClientDashboard() {
  return (
    <div className="container py-8 md:py-12 space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Client Dashboard</h1>
          <p className="text-muted-foreground text-lg mt-2 leading-relaxed">Manage your design requests and subscription status</p>
        </div>
        <Link href="/client/new-request">
          <Button className="flex items-center gap-2 px-6 py-3 rounded-xl shadow-soft hover:shadow-soft-lg transform hover:-translate-y-0.5 transition-all duration-200">
            <PlusCircle className="h-4 w-4" />
            New Request
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 rounded-xl shadow-soft border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Request Status</CardTitle>
            <CardDescription className="text-base">Overview of your design requests</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <span className="mt-3 text-2xl font-bold">3</span>
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-yellow-100 dark:bg-yellow-900">
                  <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                </div>
                <span className="mt-3 text-2xl font-bold">1</span>
                <span className="text-xs text-muted-foreground">Pending</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-900">
                  <Zap className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                </div>
                <span className="mt-3 text-2xl font-bold">1</span>
                <span className="text-xs text-muted-foreground">In Progress</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-green-100 dark:bg-green-900">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-300" />
                </div>
                <span className="mt-3 text-2xl font-bold">1</span>
                <span className="text-xs text-muted-foreground">Complete</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl shadow-soft border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              Request Thermometer
            </CardTitle>
            <CardDescription className="text-base">Your current request volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ThermometerDisplay data={thermometerData} />
            <div className="mt-6 text-sm">
              <p className="flex justify-between">
                <span>Requests this week:</span>
                <span className="font-medium">{thermometerData.currentRequests} of {thermometerData.maxRequests}</span>
              </p>
              
              {thermometerData.currentLevel >= 80 ? (
                <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-950 border border-amber-200 dark:border-amber-900 rounded-xl flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-800 dark:text-amber-300 text-xs">
                    You're nearing your request limit. Consider spacing out new requests.
                  </p>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="rounded-xl">
          <TabsTrigger value="active">Active Requests</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-6">
          <RequestList requests={activeRequests} emptyMessage="No active requests. Create a new request to get started!" />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <RequestList requests={completedRequests} emptyMessage="No completed requests yet." />
        </TabsContent>
      </Tabs>
    </div>
  )
}