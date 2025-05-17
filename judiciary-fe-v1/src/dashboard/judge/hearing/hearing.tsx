import React, { useEffect, useState } from 'react';

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

  useEffect(() => {
    async function fetchHearings() {
      try {
        const response = await fetch(`/api/judge/${judgeId}/hearings`);
        if (!response.ok) {
          throw new Error('Failed to fetch hearings');
        }
        const data: Case[] = await response.json();
        setCases(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchHearings();
  }, [judgeId]);

  if (loading) return <p>Loading hearings...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Hearings for Judge ID: {judgeId}</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%' }} border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Category</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Next Hearing</th>
            <th>Lawyer ID</th>
            <th>Prosecutor ID</th>
            <th>Plaintiff ID</th>
            <th>Opponent ID</th>
          </tr>
        </thead>
        <tbody>
          {cases.length === 0 ? (
            <tr>
              <td colSpan={10} style={{ textAlign: 'center' }}>
                No hearings found.
              </td>
            </tr>
          ) : (
            cases.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.category}</td>
                <td>{c.status}</td>
                <td>{new Date(c.start_date).toLocaleString()}</td>
                <td>{c.end_date ? new Date(c.end_date).toLocaleString() : '-'}</td>
                <td>{c.next_hearing ? new Date(c.next_hearing).toLocaleString() : '-'}</td>
                <td>{c.lawyer_id}</td>
                <td>{c.prosecutor_id}</td>
                <td>{c.plaintiff_id}</td>
                <td>{c.opponent_id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HearingPage;
