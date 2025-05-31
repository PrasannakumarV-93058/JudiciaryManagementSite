import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';
import {CalendarPlus, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from "axios";

interface Participant {
  id: number;
  fullName: string;
  role: string;
  email: string;
}

interface Case {
  id: number;
  category: string;
  status: string;
  startDate: string;
  nextHearing: string | null;
  judgeName: string | null;
  advocates: Participant[];
  clients: Participant[];
}

const JudgeDashboard = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentUserName = sessionStorage.getItem("currentUserName"); // Must be set on login

  const fetchCases = async () => {
    if (!currentUserName) return;

    setLoading(true);
    try {
      const token = sessionStorage.getItem("jwtToken");
      const response = await axios.get(
        `http://localhost:8080/api/cases/display`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const filteredCases = response.data.filter(
        (c: { judgeName: string }) =>
          c.judgeName?.includes(currentUserName)
      );

      const sortedCases = filteredCases.sort((a: { id: any }, b: { id: any }) => {
        const numA = Number(a.id);
        const numB = Number(b.id);
        return !isNaN(numA) && !isNaN(numB) ? numA - numB : String(a.id).localeCompare(String(b.id));
      });

      setCases(sortedCases);
    } catch (error) {
      console.error("Error fetching cases:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const actions = [
    {
      title: "Schedule Hearing",
      description: "Set a date, time, and judge for an upcoming hearing.",
      icon: <CalendarPlus className="w-6 h-6 text-green-600" />,
      actionText: "Schedule",
      onClick: () => navigate("/dashboard/judge/schedule-hearing"),
    },
    {
      title: "Update Case Status",
      description: "Log regular case updates entering all necessary case details.",
      icon: <Gavel className="w-6 h-6 text-blue-600" />,
      actionText: "Update Status",
      onClick: () => navigate("/dashboard/judge/update-status"),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Dashboard</h1>

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
                <Button onClick={action.onClick} className="text-sm font-medium px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  {action.actionText}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loading ? (
        <div className="mt-10 space-y-6 pr-4">
          <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Loading Cases. . .</h1>
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="relative h-40 w-full rounded-3xl overflow-hidden bg-gray-300 scale-100 animate-pulse"
            >
              <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
            </div>
          ))}
        </div>
      ) : (
        <ScrollArea className="mt-10 space-y-6 pr-4">
          <Button onClick={fetchCases} className="bg-gray-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
            Refresh
          </Button>
          <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">Explore Cases</h1>

          {cases.map((c) => (
            <Card key={c.id} className="shadow-sm border border-slate-300 bg-white mb-5">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
                  <div><span className="font-medium">Case ID:</span> {c.id}</div>
                  <div><span className="font-medium">Category:</span> {c.category}</div>
                  <div><span className="font-medium">Status:</span> {c.status.trim()}</div>
                  <div><span className="font-medium">Start Date:</span> {new Date(c.startDate).toLocaleDateString()}</div>
                  <div><span className="font-medium">Next Hearing:</span> {c.nextHearing ? new Date(c.nextHearing).toLocaleDateString() : 'Not Disclosed'}</div>
                  <div><span className="font-medium">Judge:</span> {c.judgeName || '-'}</div>
                  <div className="col-span-full">
                    <span className="font-medium">Advocates:</span> {c.advocates.map(a => a.fullName).join(', ')}
                  </div>
                  <div className="col-span-full">
                    <span className="font-medium">Clients:</span> {c.clients.map(cl => cl.fullName).join(', ')}
                  </div>                   
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default JudgeDashboard;
