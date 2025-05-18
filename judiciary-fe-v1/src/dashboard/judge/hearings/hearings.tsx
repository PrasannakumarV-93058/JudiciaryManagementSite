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
  judge_id: number;
  lawyer_id: number;
  prosecutor_id: number;
  plaintiff_id: number;
  opponent_id: number;
  created_at: string;
}

interface HearingPageProps {
  judgeId: number;
}

const HearingPage: React.FC<HearingPageProps> = ({ judgeId }) => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   async function fetchHearings() {
  //     try {
  //       const response = await fetch(`/api/judge/${judgeId}/hearings`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch hearings');
  //       }
  //       const data: Case[] = await response.json();
  //       setCases(data);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError('Unknown error');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchHearings();
  // }, [judgeId]);
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        category: 'Civil',
        status: 'Pending',
        start_date: '2025-05-10T10:00:00Z',
        end_date: null,
        next_hearing: '2025-06-01T10:00:00Z',
        judge_id: judgeId,
        lawyer_id: 5,
        prosecutor_id: 8,
        plaintiff_id: 15,
        opponent_id: 20,
        created_at: '2025-01-01T08:00:00Z',
      },
      {
        id: 1,
        category: 'Civil',
        status: 'Pending',
        start_date: '2025-05-10T10:00:00Z',
        end_date: null,
        next_hearing: '2025-06-01T10:00:00Z',
        judge_id: judgeId,
        lawyer_id: 5,
        prosecutor_id: 8,
        plaintiff_id: 15,
        opponent_id: 20,
        created_at: '2025-01-01T08:00:00Z',
      },
      {
        id: 1,
        category: 'Civil',
        status: 'Pending',
        start_date: '2025-05-10T10:00:00Z',
        end_date: null,
        next_hearing: '2025-06-01T10:00:00Z',
        judge_id: judgeId,
        lawyer_id: 5,
        prosecutor_id: 8,
        plaintiff_id: 15,
        opponent_id: 20,
        created_at: '2025-01-01T08:00:00Z',
      },
      {
        id: 1,
        category: 'Civil',
        status: 'Pending',
        start_date: '2025-05-10T10:00:00Z',
        end_date: null,
        next_hearing: '2025-06-01T10:00:00Z',
        judge_id: judgeId,
        lawyer_id: 5,
        prosecutor_id: 8,
        plaintiff_id: 15,
        opponent_id: 20,
        created_at: '2025-01-01T08:00:00Z',
      }
    ];
    setCases(mockData);
    setLoading(false);
  }, [judgeId]);
  if (loading) return <p>Loading hearings...</p>;
  if (error) return <p>Error: {error}</p>;
  
  if (loading) return <p >Loading hearings...</p>;
  if (error) return <p >Error: {error}</p>;
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Hearings for you </h1>
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 font-medium">Error: {error}</div>
      ) : cases.length === 0 ? (
        <div className="text-slate-600 italic">No hearings found.</div>
      ) : (
        <ScrollArea className="space-y-6 pr-4">
          {cases.map((c) => (
            <Card key={c.id} className="bg-white shadow-md w-full max-w-5xl mx-auto mb-4">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-700">
                  <div><span className="font-medium">Case ID:</span> {c.id}</div>
                  <div><span className="font-medium">Category:</span> {c.category}</div>
                  <div><span className="font-medium">Status:</span> {c.status}</div>
                  <div><span className="font-medium">Start:</span> {new Date(c.start_date).toLocaleString()}</div>
                  <div><span className="font-medium">End:</span> {c.end_date ? new Date(c.end_date).toLocaleString() : '-'}</div>
                  <div><span className="font-medium">Next Hearing:</span> {c.next_hearing ? new Date(c.next_hearing).toLocaleString() : '-'}</div>
                  <div><span className="font-medium">Lawyer ID:</span> {c.lawyer_id}</div>
                  <div><span className="font-medium">Prosecutor ID:</span> {c.prosecutor_id}</div>
                  <div><span className="font-medium">Plaintiff ID:</span> {c.plaintiff_id}</div>
                  <div><span className="font-medium">Opponent ID:</span> {c.opponent_id}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      )}
    </div>
  );
};

export default HearingPage;
