import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface Case {
  id: number;
  category: string;
  status: string;
  start_date: string;
  end_date: string | null;
  next_hearing: string | null;
  lawyer_id: number;
  prosecutor_id: number;
  plaintiff_id: number;
  opponent_id: number;
}

type GroupedHearings = Record<string, Record<string, Case[]>>;

function groupHearingsByDateAndTime(cases: Case[]): GroupedHearings {
  const grouped: GroupedHearings = {};

  for (const c of cases) {
    if (!c.next_hearing) continue;

    const date = new Date(c.next_hearing);
    const dateStr = date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    if (!grouped[dateStr]) grouped[dateStr] = {};
    if (!grouped[dateStr][timeStr]) grouped[dateStr][timeStr] = [];

    grouped[dateStr][timeStr].push(c);
  }

  return grouped;
}

const HearingScheduleDashboard: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockData: Case[] = [
        {
          id: 1,
          category: 'Civil',
          status: 'Pending',
          start_date: '2025-05-10T10:00:00Z',
          end_date: null,
          next_hearing: '2025-05-20T09:00:00Z',
          lawyer_id: 1,
          prosecutor_id: 2,
          plaintiff_id: 3,
          opponent_id: 4,
        },
        {
          id: 2,
          category: 'Criminal',
          status: 'Closed',
          start_date: '2025-03-12T11:00:00Z',
          end_date: '2025-04-25T14:00:00Z',
          next_hearing: '2025-05-20T10:30:00Z',
          lawyer_id: 5,
          prosecutor_id: 6,
          plaintiff_id: 7,
          opponent_id: 8,
        },
        {
          id: 3,
          category: 'Family',
          status: 'In Progress',
          start_date: '2025-05-15T09:00:00Z',
          end_date: null,
          next_hearing: '2025-05-21T11:00:00Z',
          lawyer_id: 9,
          prosecutor_id: 10,
          plaintiff_id: 11,
          opponent_id: 12,
        },
      ];

      setCases(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const groupedHearings = groupHearingsByDateAndTime(cases);

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">🧾 Your Upcoming Hearings</h1>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      ) : Object.keys(groupedHearings).length === 0 ? (
        <p className="text-slate-600 italic text-center">No hearings scheduled.</p>
      ) : (
        <ScrollArea className="space-y-10 pr-2">
          {Object.entries(groupedHearings).map(([date, times]) => (
            <div key={date}>
              <div className="flex items-center gap-2 text-slate-700 font-semibold text-lg mb-3">
                <span className="text-xl">📅</span>
                <span>{date}</span>
              </div>
              <div className="space-y-6 ml-6 border-l border-slate-300 pl-4">
                {Object.entries(times).map(([time, caseList]) => (
                  <div key={time}>
                    <div className="flex items-center text-slate-600 font-medium mb-2">
                      <span className="text-lg mr-2">⏰</span>
                      <span>{time}</span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                      {caseList.map((c) => (
                        <Card
                          key={c.id}
                          className="bg-white hover:bg-slate-50 border border-slate-200 shadow-sm rounded-2xl transition-all duration-300 w-full max-w-md mx-auto"
                        >
                          <CardContent className="p-6 space-y-2 text-sm text-slate-700">
                            <div className="flex justify-between">
                              <div className="font-semibold text-slate-800">Case #{c.id}</div>
                              <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                c.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                c.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {c.status}
                              </div>
                            </div>
                            <div><span className="font-medium">Category:</span> {c.category}</div>
                            <div><span className="font-medium">Lawyer:</span> {c.lawyer_id}</div>
                            <div><span className="font-medium">Plaintiff:</span> {c.plaintiff_id}</div>
                            <div><span className="font-medium">Opponent:</span> {c.opponent_id}</div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default HearingScheduleDashboard;
