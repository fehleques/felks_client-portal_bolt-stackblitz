"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { 
  Calendar as CalendarIcon, 
  Check, 
  Info,
  Loader2,
  AlertCircle
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { ThermometerDisplay } from "@/components/thermometer-display"
import { RequestCategory } from "@/types"

const requestCategories: RequestCategory[] = [
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

const formSchema = z.object({
  title: z.string().min(4, { message: "Title must be at least 4 characters" }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.enum(requestCategories as [RequestCategory, ...RequestCategory[]]),
  deadline: z.date().min(new Date(), { message: "Deadline must be in the future" }),
  priority: z.enum(["low", "medium", "high", "urgent"])
});

// Mock thermometer data - high temperature
const thermometerData = {
  currentLevel: 85, // 0-100
  maxRequests: 5,
  currentRequests: 4,
  cooldownDate: undefined
};

export default function NewRequestPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      deadline: new Date(Date.now() + 86400000 * 2), // Default to 2 days from now
    },
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // If thermometer is hot, show warning
    if (thermometerData.currentLevel > 80) {
      setShowWarning(true)
      return
    }
    
    submitRequest(values)
  }
  
  function submitRequest(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
    // Mock submission process
    setTimeout(() => {
      toast({
        title: "Request submitted",
        description: "Your design request has been submitted successfully.",
      })
      
      router.push("/client/dashboard")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container py-6 md:py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">New Design Request</h1>
            <p className="text-muted-foreground">Create a new design request for your project</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Title</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g., Logo Design for New Product" {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear, concise title for your design request
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {requestCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When do you need this design completed by?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide details about your design request..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your design needs in detail to help our designers understand your requirements
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/client/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>Submit Request</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        <div className="md:w-80">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Request Thermometer</h3>
                <ThermometerDisplay data={thermometerData} />
                
                <div className="rounded-md bg-amber-50 dark:bg-amber-950 p-3 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-2 border border-amber-200 dark:border-amber-900">
                  <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium mb-1">Your request volume is high</p>
                    <p className="text-xs">
                      You've submitted several requests recently. You may experience slightly longer turnaround times.
                    </p>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">How it works</h4>
                  <ul className="text-xs text-muted-foreground space-y-2">
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Submit unlimited design requests</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>We work on requests one at a time</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>High volume may increase wait times</span>
                    </li>
                    <li className="flex gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>Thermometer cools down over time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Warning modal when thermometer is hot */}
      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Request Volume Warning
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your request volume is currently high. Adding more requests may result in longer turnaround times.
              Do you still want to proceed with submitting this request?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => submitRequest(form.getValues())}>
              Submit Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}