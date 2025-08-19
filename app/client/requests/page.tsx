"use client";

import { RequestList } from "@/components/request-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RequestsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <RequestList />
        </CardContent>
      </Card>
    </div>
  );
}