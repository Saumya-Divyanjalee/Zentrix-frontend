export interface User { id:string; name:string; email:string; role:string; avatar?:string; }
export interface AuthState { user:User|null; accessToken:string|null; isLoading:boolean; error:string|null; }
export interface Task { _id:string; title:string; description?:string; deadline?:string; priority:'low'|'medium'|'high'; status:'pending'|'in-progress'|'completed'; subject?:string; createdAt:string; }
export interface Note { _id:string; title:string; content:string; subject?:string; summary?:string; createdAt:string; }
export interface DashboardStats { totalTasks:number; completedTasks:number; pendingTasks:number; inProgressTasks:number; totalNotes:number; productivity:number; recentTasks:Task[]; }
