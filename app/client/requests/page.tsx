"use client";

import { RequestList } from "@/components/request-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DesignRequest } from "@/types";

// Mock data for requests
const mockRequests: DesignRequest[] = [
  {
    id: "req1",
    clientId: "client1",
    title: "Logo design for tech startup",
    description: "A modern, minimal logo for a fintech startup. The name is 'Flume'.",
    category: "Logo Design",
    status: "in_progress",
    priority: "high",
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
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
    deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
    createdAt: new Date(Date.now() - 43200000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function RequestsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <RequestList requests={mockRequests} />
        </CardContent>
      </Card>
    </div>
  );
}