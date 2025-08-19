"use client"

import { useState, useEffect } from "react"
import { 
  Check, ChevronDown, Clock, Filter, Search, 
  SlidersHorizontal, SortAsc, X 
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { DesignRequest, RequestCategory } from "@/types"

const categories: RequestCategory[] = [
  "Logo Design",
  "Web Design",
  "Social Media Graphics",
  "Print Design",
  "Brand Identity",
  "UI/UX Design",
  "Illustrations",
  "Packaging Design",
  "Other"
];

export default function DesignerRequestsPage() {
  const [availableRequests, setAvailableRequests] = useState<DesignRequest[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<"deadline" | "priority" | "recent">("deadline")

  useEffect(() => {
    fetch("/api/requests?status=pending")
      .then(res => res.json())
      .then(data => setAvailableRequests(data))
  }, [])
  
  const filteredRequests = availableRequests.filter(request => {
    const matchesSearch = searchQuery === "" || 
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategories.length === 0 || 
      selectedCategories.includes(request.category);
      
    const matchesPriority = selectedPriorities.length === 0 || 
      selectedPriorities.includes(request.priority);
      
    return matchesSearch && matchesCategory && matchesPriority;
  });
  
  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortOrder === "deadline") {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    } else if (sortOrder === "priority") {
      const priorityOrder = { urgent: 1, high: 2, medium: 3, low: 4 };
      return priorityOrder[a.priority as keyof typeof priorityOrder] - 
             priorityOrder[b.priority as keyof typeof priorityOrder];
    } else { // recent
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const togglePriority = (priority: string) => {
    setSelectedPriorities(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedPriorities([]);
    setSearchQuery("");
  };
  
  const getDaysUntilDeadline = (deadline: string) => {
    const days = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
    if (days < 1) {
      return "Due today";
    } else if (days === 1) {
      return "Due tomorrow";
    } else {
      return `Due in ${days} days`;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "urgent":
        return "bg-red-500/10 text-red-500 border-red-500/20";
    }
  };

  return (
    <div className="container py-6 md:py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Available Requests</h1>
          <p className="text-muted-foreground">Browse and find design requests to work on</p>
        </div>
        
        <Tabs defaultValue="expiring" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="expiring" className="text-xs">
              <Clock className="mr-1 h-3 w-3" />
              Expiring Soon
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs">All Requests</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center w-full lg:w-[320px] bg-muted/50 rounded-md">
          <Search className="h-4 w-4 ml-3 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
        
        <div className="flex flex-1 items-center gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                Categories
                {selectedCategories.length > 0 && (
                  <Badge variant="secondary" className="rounded-full ml-1 px-1 text-xs">
                    {selectedCategories.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[220px] p-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">Categories</div>
                <Separator />
                <div className="grid gap-1.5 pt-1">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Priority
                {selectedPriorities.length > 0 && (
                  <Badge variant="secondary" className="rounded-full ml-1 px-1 text-xs">
                    {selectedPriorities.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[180px] p-2">
              <div className="space-y-2">
                <div className="text-sm font-medium">Priority Level</div>
                <Separator />
                <div className="grid gap-1.5 pt-1">
                  {["urgent", "high", "medium", "low"].map((priority) => (
                    <div key={priority} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`priority-${priority}`}
                        checked={selectedPriorities.includes(priority)}
                        onCheckedChange={() => togglePriority(priority)}
                      />
                      <label
                        htmlFor={`priority-${priority}`}
                        className="text-sm capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {priority}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <SortAsc className="h-3.5 w-3.5" />
                Sort
                <ChevronDown className="h-3.5 w-3.5 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setSortOrder("deadline")}
                className="flex items-center gap-2"
              >
                {sortOrder === "deadline" && <Check className="h-4 w-4 text-green-500" />}
                <span className={sortOrder === "deadline" ? "font-medium" : ""}>Deadline (soonest)</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortOrder("priority")}
                className="flex items-center gap-2"
              >
                {sortOrder === "priority" && <Check className="h-4 w-4 text-green-500" />}
                <span className={sortOrder === "priority" ? "font-medium" : ""}>Priority (highest)</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setSortOrder("recent")}
                className="flex items-center gap-2"
              >
                {sortOrder === "recent" && <Check className="h-4 w-4 text-green-500" />}
                <span className={sortOrder === "recent" ? "font-medium" : ""}>Recently Added</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {(selectedCategories.length > 0 || selectedPriorities.length > 0 || searchQuery) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3 border rounded-lg bg-card">
            <Filter className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold">No matching requests</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
            </div>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          sortedRequests.map((request) => (
            <Link href={`/designer/requests/${request.id}`} key={request.id}>
              <Card className="transition-all hover:shadow-md cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">{request.category}</Badge>
                        <Badge variant="outline" className={cn(getPriorityColor(request.priority))}>
                          {request.priority}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ID: {request.id.substring(0, 8)}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold">{request.title}</h3>
                        <p className="mt-1 text-muted-foreground line-clamp-2">
                          {request.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row lg:flex-col justify-between lg:items-end lg:min-w-[140px] gap-2">
                      <div className="flex items-center gap-1 text-xs lg:text-sm">
                        <Clock className="h-3.5 w-3.5 text-amber-500" />
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                          {getDaysUntilDeadline(request.deadline)}
                        </span>
                      </div>
                      <Button size="sm">Take Request</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}