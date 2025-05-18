import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

interface Case {
  id: number;
  category: string;
  status: string;
  start_date: string;
  end_date: string | null;
  next_hearing: string | null;
  judge_id: number;
  lawyer_id: number;
  prosecutor_id: number;
  plaintiff_id: number;
  opponent_id: number;
  created_at: string;
}

const COLORS = ['#3b82f6', '#2563eb', '#1e40af', '#64748b', '#94a3b8'];

const CasesPage: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const statusChartData = Object.entries(
    cases.reduce<Record<string, number>>((acc, c) => {
      acc[c.status] = (acc[c.status] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const categoryChartData = Object.entries(
    cases.reduce<Record<string, number>>((acc, c) => {
      acc[c.category] = (acc[c.category] ?? 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  useEffect(() => {
    const mockData: Case[] = [
      {
        id: 1,
        category: 'Civil',
        status: 'Pending',
        start_date: '2025-05-10T10:00:00Z',
        end_date: null,
        next_hearing: '2025-06-01T10:00:00Z',
        judge_id: 1,
        lawyer_id: 5,
        prosecutor_id: 2,
        plaintiff_id: 3,
        opponent_id: 4,
        created_at: '2025-05-01T10:00:00Z',
      },
      {
        id: 2,
        category: 'Criminal',
        status: 'Ongoing',
        start_date: '2025-03-12T09:00:00Z',
        end_date: null,
        next_hearing: '2025-06-10T14:00:00Z',
        judge_id: 2,
        lawyer_id: 6,
        prosecutor_id: 3,
        plaintiff_id: 7,
        opponent_id: 8,
        created_at: '2025-03-01T10:00:00Z',
      },
      {
        id: 3,
        category: 'Civil',
        status: 'Closed',
        start_date: '2025-01-15T11:00:00Z',
        end_date: '2025-04-01T11:00:00Z',
        next_hearing: null,
        judge_id: 1,
        lawyer_id: 7,
        prosecutor_id: 2,
        plaintiff_id: 9,
        opponent_id: 10,
        created_at: '2025-01-01T10:00:00Z',
      },
    ];

    setTimeout(() => {
      setCases(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-6 md:ml-64 bg-slate-50 min-h-screen">

      {/* Summary card */}
      <Card className="max-w-md mb-10 mx-auto shadow-sm border border-slate-300 bg-white">
        <CardContent className="flex items-center gap-4 p-6">
          <div className="text-slate-700 text-5xl font-bold">{cases.length}</div>
          <div>
            <h2 className="text-lg font-medium text-slate-900">Total Cases</h2>
            <p className="text-slate-500 text-sm mt-1">
              Includes all statuses and categories
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        {loading ? (
          <>
            <Skeleton className="h-64 rounded-2xl w-full animate-pulse" />
            <Skeleton className="h-64 rounded-2xl w-full animate-pulse" />
          </>
        ) : (
          <>
            <Card className="shadow-sm border border-slate-300 bg-white">
              <CardContent>
                <h3 className="text-lg font-semibold mb-4 text-slate-800">
                  Cases by Status
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#3b82f6"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      labelLine={false}
                    >
                      {statusChartData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Legend
                      wrapperStyle={{ fontSize: '0.875rem', color: '#475569' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm border border-slate-300 bg-white">
              <CardContent>
                <h3 className="text-lg font-semibold mb-4 text-slate-800">
                  Cases by Category
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={categoryChartData}
                    layout="vertical"
                    margin={{ top: 5, bottom: 5, left: 10, right: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      type="number"
                      allowDecimals={false}
                      stroke="#64748b"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      stroke="#64748b"
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: '0.875rem', backgroundColor: '#f9fafb' }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#3b82f6"
                      barSize={25}
                      radius={[4, 4, 4, 4]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Cases list */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Cases Details</h2>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-24 w-full rounded-xl animate-pulse bg-slate-200"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600 font-semibold">{error}</div>
        ) : cases.length === 0 ? (
          <div className="text-slate-600 italic text-center py-10">
            No cases found.
          </div>
        ) : (
          <ScrollArea className="space-y-6 pr-4 max-h-[600px]">
            {cases.map((c) => (
              <Card
                key={c.id}
                className="bg-white shadow-sm border border-slate-300 hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
                    <div>
                      <span className="font-semibold text-slate-800">Case ID:</span>{' '}
                      {c.id}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Category:</span>{' '}
                      {c.category}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Status:</span>{' '}
                      {c.status}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Start:</span>{' '}
                      {new Date(c.start_date).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">End:</span>{' '}
                      {c.end_date ? new Date(c.end_date).toLocaleString() : '-'}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Next Hearing:</span>{' '}
                      {c.next_hearing ? new Date(c.next_hearing).toLocaleString() : '-'}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Judge ID:</span>{' '}
                      {c.judge_id}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Lawyer ID:</span>{' '}
                      {c.lawyer_id}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">
                        Prosecutor ID:
                      </span>{' '}
                      {c.prosecutor_id}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">
                        Plaintiff ID:
                      </span>{' '}
                      {c.plaintiff_id}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-800">Opponent ID:</span>{' '}
                      {c.opponent_id}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        )}
      </section>

      {/* Subtle footer image */}
      <div className="mt-16 max-w-5xl mx-auto flex justify-center opacity-30">
        <img
          src="https://images.unsplash.com/photo-1565372911010-b196b1e289f2?auto=format&fit=crop&w=800&q=80"
          alt="Law books and gavel"
          className="rounded-xl"
          style={{ maxHeight: 280, objectFit: 'cover' }}
        />
      </div>
    </div>
  );
};

export default CasesPage;
