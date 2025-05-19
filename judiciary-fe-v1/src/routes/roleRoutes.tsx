// src/routes/roleRoutes.tsx

import { JSX } from "react";
import { Home, Calendar, Settings, FileText, Gavel, BarChart3, Users, BookOpen, Clock, FileSearch, MessageSquare } from "lucide-react";
import CalendarPage from "../dashboard/judge/calender/calender";
import HearingPage from "../dashboard/judge/hearings/hearings";
import CasesPage from "../dashboard/judge/cases/CasesPage";
import JudgeDashboard from "../dashboard/judge/judgeDashboard";
import ClerkDashboard from "../dashboard/clerk/clerkDashboard";
import ClerkCreate from "../dashboard/clerk/CreateCase";
import ScheduleHearing from "../dashboard/clerk/ScheduleHearing";
// Define type for Role
export type Role = "judge" | "lawyer" | "clerk" | "prosecutor" | "client";

// Define the route item structure
export interface RouteItem {
  title: string;
  path: string;
  icon: JSX.Element;
  element: JSX.Element;
}

// Role-specific routes
export const roleRoutes: Record<Role, RouteItem[]> = {
  judge: [
    {
      title: "Dashboard",
      path: ``,
      icon: <Home className="h-5 w-5" />,
      element: <JudgeDashboard/>,
    },
    {
      title: "Calendar",
      path: `calendar`,
      icon: <Calendar className="h-5 w-5" />,
      element: <CalendarPage />,
    },

    {
      title: "Cases",
      path: "cases",
      icon: <FileText className="h-5 w-5" />,
      element: <CasesPage />,
    },
    {
      title: "Hearings",
      path: "hearings",
      icon: <Gavel className="h-5 w-5" />,
      element: <HearingPage  judgeId={1234}/>,
    },
    {
      title: "Reports",
      path: "reports",
      icon: <BarChart3 className="h-5 w-5" />,
      element: <BarChart3 name="Reports" />,
    },
  ],
  lawyer: [
    {
      title: "Dashboard",
      path: ``,
      icon: <Home className="h-5 w-5" />,
      element: <Home name="Dashboard" />,
    },
    {
      title: "Calendar",
      path: `calendar`,
      icon: <Calendar className="h-5 w-5" />,
      element: <CalendarPage />,
    },
    {
      title: "Settings",
      path: `settings`,
      icon: <Settings className="h-5 w-5" />,
      element: <Settings name="Settings" />,
    },
    {
      title: "Cases",
      path: "cases",
      icon: <FileText className="h-5 w-5" />,
      element: <FileText name="Lawyer Cases" />,
    },
    {
      title: "Clients",
      path: "clients",
      icon: <Users className="h-5 w-5" />,
      element: <Users name="Clients" />,
    },
    {
      title: "Legal Research",
      path: "research",
      icon: <BookOpen className="h-5 w-5" />,
      element: <BookOpen name="Legal Research" />,
    },
  ],
  clerk: [
    {
      title: "Dashboard",
      path: ``,
      icon: <Home className="h-5 w-5" />,
      element: <ClerkDashboard/>,
    },
    {
      title: "Create Case",
      path: `create-case`,
      icon: <Home className="h-5 w-5" />,
      element: <ClerkCreate/>,
    },
    {
      title: "schedule-hearing",
      path: `schedule-hearing`,
      icon: <Home className="h-5 w-5" />,
      element: <ScheduleHearing/>,
    },
    {
      title: "Calendar",
      path: `calendar`,
      icon: <Calendar className="h-5 w-5" />,
      element: <CalendarPage />,
    },
    {
      title: "Case Filing",
      path: "filing",
      icon: <FileText className="h-5 w-5" />,
      element: <FileText name="Case Filing" />,
    },
    {
      title: "Court Schedule",
      path: "schedule",
      icon: <Clock className="h-5 w-5" />,
      element: <Clock name="Court Schedule" />,
    },
    {
      title: "Document Management",
      path: "documents",
      icon: <FileSearch className="h-5 w-5" />,
      element: <FileSearch name="Document Management" />,
    },
    
  ],
  prosecutor: [
    {
      title: "Dashboard",
      path: ``,
      icon: <Home className="h-5 w-5" />,
      element: <Home name="Dashboard" />,
    },
    {
      title: "Calendar",
      path: `calendar`,
      icon: <Calendar className="h-5 w-5" />,
      element: <CalendarPage />,
    },
    {
      title: "Settings",
      path: `settings`,
      icon: <Settings className="h-5 w-5" />,
      element: <Settings name="Settings" />,
    },
    {
      title: "Cases",
      path: "cases",
      icon: <FileText className="h-5 w-5" />,
      element: <FileText name="Prosecutor Cases" />,
    },
    {
      title: "Investigations",
      path: "investigations",
      icon: <FileSearch className="h-5 w-5" />,
      element: <FileSearch name="Investigations" />,
    },
    {
      title: "Reports",
      path: "reports",
      icon: <BarChart3 className="h-5 w-5" />,
      element: <BarChart3 name="Reports" />,
    },
  ],
  client: [
    {
      title: "Dashboard",
      path: ``,
      icon: <Home className="h-5 w-5" />,
      element: <Home name="Dashboard" />,
    },
    {
      title: "Calendar",
      path: `calendar`,
      icon: <Calendar className="h-5 w-5" />,
      element: <CalendarPage />,
    },
    {
      title: "Settings",
      path: `settings`,
      icon: <Settings className="h-5 w-5" />,
      element: <Settings name="Settings" />,
    },
    {
      title: "My Cases",
      path: "cases",
      icon: <FileText className="h-5 w-5" />,
      element: <FileText name="My Cases" />,
    },
    {
      title: "Documents",
      path: "documents",
      icon: <FileSearch className="h-5 w-5" />,
      element: <FileSearch name="Documents" />,
    },
    {
      title: "Messages",
      path: "messages",
      icon: <MessageSquare className="h-5 w-5" />,
      element: <MessageSquare name="Messages" />,
    },
  ],
};
