import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface Person {
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
  nextHearing?: string;
  judgeName: string;
  advocates: Person[];
  clients: Person[];
}

interface WLdata {
  casesLost: string;
  casesWon: string;
  totalCases: string;
}

const LawyerCases: React.FC = () => {
  const [wlData, setWlData] = useState<WLdata | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const currentLawyerName = sessionStorage.getItem('currentUserName') || '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMsg('');

      try {
        const token = sessionStorage.getItem('jwtToken');
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        // Fetch won-loss summary
        const wlRes = await fetch('http://localhost:8080/api/advocates/3/won-loss-summary', { headers });
        if (!wlRes.ok) throw new Error('Failed to fetch won/loss summary');
        const wlSummary: WLdata = await wlRes.json();
        setWlData(wlSummary);

        // Fetch all cases
        const casesRes = await fetch('http://localhost:8080/api/cases/display', { headers });
        if (!casesRes.ok) throw new Error('Failed to fetch cases');
        const allCases: Case[] = await casesRes.json();
        console.log("retrieved cases :",allCases );

        // Filter lawyer's cases
        // console.log(currentLawyerName)
        const lawyerCases = allCases.filter(c =>
          c.advocates.some(a => a.fullName === currentLawyerName)
        );
        setCases(lawyerCases);
      } catch (err: any) {
        setErrorMsg(err.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentCases = cases.filter(c => c.status.toLowerCase() === 'open');

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Progress</h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Loader2 className="animate-spin w-6 h-6 text-gray-600" />
        </div>
      ) : errorMsg ? (
        <p className="text-red-600">{errorMsg}</p>
      ) : (
        <>
          {/* Stats Section */}
          <div className="flex gap-6 mb-8">
            <Card className="w-1/3 shadow">
              <CardContent className="p-4">
                <Label className="text-gray-500">Total Cases</Label>
                <p className="text-2xl font-semibold">{wlData?.totalCases ?? '0'}</p>
              </CardContent>
            </Card>
            <Card className="w-1/3 shadow">
              <CardContent className="p-4">
                <Label className="text-gray-500">Won Cases</Label>
                <p className="text-2xl font-semibold text-green-600">{wlData?.casesWon ?? '0'}</p>
              </CardContent>
            </Card>
            <Card className="w-1/3 shadow">
              <CardContent className="p-4">
                <Label className="text-gray-500">Lost Cases</Label>
                <p className="text-2xl font-semibold text-red-600">{wlData?.casesLost ?? '0'}</p>
              </CardContent>
            </Card>
          </div>

          {/* Current Cases */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Current Case Status</h3>
            {currentCases.length === 0 ? (
              <p className="text-sm text-gray-500">No open cases assigned currently.</p>
            ) : (
              <div className="grid gap-4">
                {currentCases.map(c => (
                  <Card key={c.id} className="shadow border">
                    <CardContent className="p-4 space-y-2">
                      <h4 className="text-lg font-semibold text-blue-600">Case #{c.id}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><Label>Category:</Label> {c.category}</div>
                        <div><Label>Status:</Label> {c.status}</div>
                        <div><Label>Start Date:</Label> {new Date(c.startDate).toLocaleDateString()}</div>
                        <div><Label>Next Hearing:</Label> {c.nextHearing ? new Date(c.nextHearing).toLocaleString() : 'N/A'}</div>
                        <div className="col-span-2"><Label>Judge:</Label> {c.judgeName}</div>
                      </div>
                      <div>
                        <Label>Clients:</Label>
                        <ul className="list-disc list-inside text-gray-700 text-sm">
                          {c.clients.map(client => (
                            <li key={client.id}>{client.fullName} ({client.email})</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* All Cases */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">All Case Details</h3>
            <div className="grid gap-4">
              {cases.map(c => (
                <Card key={c.id} className="shadow border">
                  <CardContent className="p-4 space-y-2">
                    <h4 className="text-lg font-semibold text-blue-700">Case #{c.id}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><Label>Category:</Label> {c.category}</div>
                      <div><Label>Status:</Label> {c.status}</div>
                      <div><Label>Start Date:</Label> {new Date(c.startDate).toLocaleDateString()}</div>
                      <div><Label>Next Hearing:</Label> {c.nextHearing ? new Date(c.nextHearing).toLocaleString() : 'N/A'}</div>
                      <div className="col-span-2"><Label>Judge:</Label> {c.judgeName}</div>
                    </div>
                    <div>
                      <Label>Clients:</Label>
                      <ul className="list-disc list-inside text-gray-700 text-sm">
                        {c.clients.map(client => (
                          <li key={client.id}>{client.fullName} ({client.email})</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LawyerCases;
