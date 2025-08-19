export type RequestCategory = 
  | "Logo Design"
  | "Web Design"
  | "Social Media Graphics"
  | "Print Design"
  | "Brand Identity"
  | "UI/UX Design"
  | "Illustrations"
  | "Packaging Design"
  | "Other";

export type RequestStatus = 
  | "pending"
  | "in_progress"
  | "completed"
  | "revision"
  | "cancelled";

export type RequestPriority = 
  | "low"
  | "medium"
  | "high"
  | "urgent";

export interface DesignRequest {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: RequestCategory;
  status: RequestStatus;
  priority: RequestPriority;
  deadline: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  designerId?: string;
  files?: File[];
  feedback?: string;
}

export interface ThermometerData {
  currentLevel: number; // 0-100
  maxRequests: number;
  currentRequests: number;
  cooldownDate?: string; // ISO date string
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "designer";
  avatarUrl?: string;
}

export interface Client extends User {
  role: "client";
  subscription: "basic" | "premium" | "enterprise";
  thermometer: ThermometerData;
}

export interface Designer extends User {
  role: "designer";
  specialties: RequestCategory[];
  activeRequests: number;
  completedRequests: number;
}