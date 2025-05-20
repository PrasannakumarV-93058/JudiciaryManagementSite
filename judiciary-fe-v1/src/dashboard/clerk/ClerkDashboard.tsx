import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';
import { PlusCircle, CalendarPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { ScrollArea } from '@/components/ui/scroll-area';

import { OrbitControls, useGLTF } from "@react-three/drei";


interface User {
  id: number;
  username: string;
  role: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface Case {
  id: number;
  category: string;
  status: string;
  startDate: string;
  endDate: string | null;
  nextHearing: string | null;
  createdAt: string;
  judge: User;
  lawyer: User;
  prosecutor: User;
  plaintiff: User;
  opponent: User;
}
const ClerkDashboard = () => {

   const [cases, setCases] = useState<Case[]>([]);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    
  
    useEffect(() => {
      setTimeout(() => {
        setCases([
          // Dummy case data (same as before)
          // Replace with your actual API logic
          {
            id: 1,
            category: 'Civil',
            status: 'Pending',
            startDate: '2025-05-10T10:00:00Z',
            endDate: null,
            nextHearing: '2025-06-01T10:00:00Z',
            createdAt: '2025-05-01T10:00:00Z',
            judge: { id: 1, username: 'judge01', role: 'judge', fullName: 'Hon. John Doe', email: '', phone: '', createdAt: '' },
            lawyer: { id: 2, username: '', role: 'lawyer', fullName: 'Lawyer Smith', email: '', phone: '', createdAt: '' },
            prosecutor: { id: 3, username: '', role: 'prosecutor', fullName: 'Prosecutor Jane', email: '', phone: '', createdAt: '' },
            plaintiff: { id: 4, username: '', role: 'plaintiff', fullName: 'Plaintiff Jim', email: '', phone: '', createdAt: '' },
            opponent: { id: 5, username: '', role: 'opponent', fullName: 'Opponent Bob', email: '', phone: '', createdAt: '' },
          },
          {
            id: 2,
            category: 'Criminal',
            status: 'In Progress',
            startDate: '2025-04-20T09:30:00Z',
            endDate: null,
            nextHearing: '2025-05-25T09:30:00Z',
            createdAt: '2025-04-15T08:00:00Z',
            judge: { id: 6, username: 'judge02', role: 'judge', fullName: 'Hon. Alice Green', email: '', phone: '', createdAt: '' },
            lawyer: { id: 7, username: '', role: 'lawyer', fullName: 'Lawyer Brown', email: '', phone: '', createdAt: '' },
            prosecutor: { id: 8, username: '', role: 'prosecutor', fullName: 'Prosecutor Max', email: '', phone: '', createdAt: '' },
            plaintiff: { id: 9, username: '', role: 'plaintiff', fullName: 'Plaintiff Clara', email: '', phone: '', createdAt: '' },
            opponent: { id: 10, username: '', role: 'opponent', fullName: 'Opponent David', email: '', phone: '', createdAt: '' },
          },
          {
            id: 3,
            category: 'Family',
            status: 'Closed',
            startDate: '2025-02-15T14:00:00Z',
            endDate: '2025-04-10T16:00:00Z',
            nextHearing: null,
            createdAt: '2025-02-10T10:00:00Z',
            judge: { id: 11, username: 'judge03', role: 'judge', fullName: 'Hon. Michael Scott', email: '', phone: '', createdAt: '' },
            lawyer: { id: 12, username: '', role: 'lawyer', fullName: 'Lawyer Angela', email: '', phone: '', createdAt: '' },
            prosecutor: { id: 13, username: '', role: 'prosecutor', fullName: 'Prosecutor Pam', email: '', phone: '', createdAt: '' },
            plaintiff: { id: 14, username: '', role: 'plaintiff', fullName: 'Plaintiff Jim Halpert', email: '', phone: '', createdAt: '' },
            opponent: { id: 15, username: '', role: 'opponent', fullName: 'Opponent Dwight', email: '', phone: '', createdAt: '' },
          },
          {
              id: 4,
              category: 'Family',
              status: 'Pending',
              startDate: '2025-05-10T10:00:00Z',
              endDate: null,
              nextHearing: '2025-06-01T10:00:00Z',
              createdAt: '2025-05-01T10:00:00Z',
              judge: { id: 1, username: 'judge01', role: 'judge', fullName: 'Hon. John Doe', email: '', phone: '', createdAt: '' },
              lawyer: { id: 2, username: '', role: 'lawyer', fullName: 'Lawyer Smith', email: '', phone: '', createdAt: '' },
              prosecutor: { id: 3, username: '', role: 'prosecutor', fullName: 'Prosecutor Jane', email: '', phone: '', createdAt: '' },
              plaintiff: { id: 4, username: '', role: 'plaintiff', fullName: 'Plaintiff Jim', email: '', phone: '', createdAt: '' },
              opponent: { id: 5, username: '', role: 'opponent', fullName: 'Opponent Bob', email: '', phone: '', createdAt: '' },
            },
        ]);
        setLoading(false);
      }, 1000);
    }, []);

  const actions = [
    {
      title: "Create New Case",
      description: "Initiate a new case by entering all necessary case details.",
      icon: <PlusCircle className="w-6 h-6 text-blue-600" />,
      actionText: "Create Case",
      onClick: () => {
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
      description: "Create or update details for lawyers, plaintiffs, and opponents.",
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

      {/* 3D Model Viewer */}
      <div className="w-full h-96 mb-8">
        <Canvas>
          <ambientLight intensity={0.2} />
          <directionalLight position={[100, 3, 20]} />
          <Model />
          <OrbitControls enableZoom={false} enablePan={true} />
        </Canvas>
      </div>

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
      {loading ? (
              <div className="space-y-8">
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
              <ScrollArea className="space-y-6 pr-4">
                {cases.map((c) => (
                  <Card key={c.id} className="shadow-sm border border-slate-300 bg-white mb-5">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
                        <div><span className="font-medium">Case ID:</span> {c.id}</div>
                        <div><span className="font-medium">Category:</span> {c.category}</div>
                        <div><span className="font-medium">Status:</span> {c.status}</div>
                        <div><span className="font-medium">Start Date:</span> {new Date(c.startDate).toLocaleDateString()}</div>
                        <div><span className="font-medium">End Date:</span> {c.endDate ? new Date(c.endDate).toLocaleDateString() : '-'}</div>
                        <div><span className="font-medium">Next Hearing:</span> {c.nextHearing ? new Date(c.nextHearing).toLocaleDateString() : '-'}</div>
                        <div><span className="font-medium">Lawyer:</span> {c.lawyer.fullName}</div>
                        <div><span className="font-medium">Prosecutor:</span> {c.prosecutor.fullName}</div>
                        <div><span className="font-medium">Plaintiff:</span> {c.plaintiff.fullName}</div>
                        <div><span className="font-medium">Opponent:</span> {c.opponent.fullName}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            )}
    </div>
  );
};

// 3D Model Component
const Model = () => {
  const gltf = useGLTF("/court.glb"); // Path to the 3D model in the public directory
  return <primitive object={gltf.scene} scale={1} position={[10, 0, 0]} />;
  
};

export default ClerkDashboard;