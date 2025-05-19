// ClerkDashboard.tsx
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, CalendarPlus, Gavel, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";




const ClerkDashboard = () => {
const navigate = useNavigate();
const actions = [
  {
    title: "Create New Case",
    description: "Initiate a new case by entering all necessary case details.",
    icon: <PlusCircle className="w-6 h-6 text-blue-600" />,
    actionText: "Create Case",
    onClick: () => {
      // handle case creation
      navigate("/dashboard/clerk/create-case");
    },
  },
  {
    title: "Schedule Hearing",
    description: "Set a date, time, and judge for an upcoming hearing.",
    icon: <CalendarPlus className="w-6 h-6 text-green-600" />,
    actionText: "Schedule",
    onClick: () => {
      navigate("/dashboard/clerk/schedule-hearing");
    },
  },
  {
    title: "Create New User",
    description: "create or update details for lawyers, plaintiffs, and opponents.",
    icon: <Users className="w-6 h-6 text-purple-600" />,
    actionText: "Manage",
    onClick: () => {
      // handle participant management
    },
  },
];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Clerk Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {actions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg bg-white transition-shadow duration-300">
            <CardHeader className="flex items-center gap-4">
              <div className="bg-slate-100 p-2 rounded-full">{action.icon}</div>
              <CardTitle className="text-lg font-semibold text-slate-800">{action.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 text-sm flex flex-col justify-between h-28">
              <p>{action.description}</p>
              <div className="mt-4 text-right">
                <Button onClick={action.onClick} className="text-sm">{action.actionText}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClerkDashboard;
