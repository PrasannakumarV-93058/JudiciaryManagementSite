import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
// import { useRouter } from 'router'; // If you're using Next.js

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const JudgeDashboard: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const statusChartData = [
    { name: 'Pending', value: cases.filter((c) => c.status === 'Pending').length },
    { name: 'Closed', value: cases.filter((c) => c.status === 'Closed').length },
    { name: 'Ongoing', value: cases.filter((c) => c.status === 'Ongoing').length },
  ];

  const categoryChartData = Object.entries(
    cases.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.category] = (acc[cur.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  return (
    <div className="bg-slate-50 min-h-screen p-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {loading ? (
          [...Array(2)].map((_, i) => (
            <div
              key={i}
              className="relative h-64 w-full rounded-3xl overflow-hidden bg-gray-300 scale-100 animate-pulse mb-6"
            >
              <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
            </div>
          ))
        ) : (
          <>
            <Card className="shadow-sm border border-slate-300 bg-white">
              <CardContent className="p-4">
                <h2 className="font-medium mb-2 text-slate-700">Cases by Status</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {statusChartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm border border-slate-300 bg-white">
              <CardContent className="p-4">
                <h2 className="font-medium mb-2 text-slate-700">Cases by Category</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={categoryChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-700">Recent Cases</h2>
        {!loading && (
          <Button onClick={() => navigate(`${location.pathname}/cases`)}>View All Cases</Button>
        )}
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
          {cases.slice(0, 2).map((c) => (
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

export default JudgeDashboard;
