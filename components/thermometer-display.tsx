"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { ThermometerData } from "@/types"

interface ThermometerDisplayProps {
  data: ThermometerData
}

export function ThermometerDisplay({ data }: ThermometerDisplayProps) {
  const [progress, setProgress] = useState(0)
  
  // Animation effect for thermometer
  useEffect(() => {
    const timer = setTimeout(() => setProgress(data.currentLevel), 200)
    return () => clearTimeout(timer)
  }, [data.currentLevel])
  
  // Determine color based on level
  const getColorClass = () => {
    if (progress < 30) return "bg-green-500"
    if (progress < 70) return "bg-amber-500"
    return "bg-red-500"
  }
  
  return (
    <div className="space-y-3">
      <div className="relative pt-6">
        {/* Thermometer visual */}
        <div className="relative h-24 w-8 mx-auto bg-muted rounded-full overflow-hidden border">
          <div 
            className={`absolute bottom-0 w-full transition-all duration-1000 ${getColorClass()}`}
            style={{ height: `${progress}%` }}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 h-3 bg-red-600 dark:bg-red-800" 
            style={{ opacity: progress > 95 ? 1 : 0.3 }}
          />
        </div>
        
        {/* Temperature circle */}
        <div 
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 h-10 w-10 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-gray-800 transition-all ${getColorClass()}`}
        >
          {Math.round(progress)}%
        </div>
      </div>
      
      <Progress value={progress} className="h-2.5 w-full" />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Cool</span>
        <span>Warm</span>
        <span>Hot</span>
      </div>
    </div>
  )
}