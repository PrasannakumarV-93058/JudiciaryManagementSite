import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Case {
  id: string;
  category: string;
  status: string;
  startDate: string;
  description: string;
  judgeName: string;
  lawyerName: string;
  prosecutorName?: string;
  plaintiffName: string;
  opponentName?: string;
  updates?: string[];
}

const LawyerDashboard: React.FC = () => {
  const [caseId, setCaseId] = useState('');
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cases, setCases] = useState<Case[]>([]);
  const currentUserName = sessionStorage.getItem('username'); // Optional filtering by lawyer

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const res = await fetch('http://localhost:8080/api/cases/display', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch case list');
        }

        const allCases: Case[] = await res.json();

        const lawyerCases = allCases.filter(
          (c) => c.lawyerName?.toLowerCase() === currentUserName?.toLowerCase()
        );

        lawyerCases.sort((a, b) => Number(a.id) - Number(b.id));

        setCases(lawyerCases);
      } catch (error: any) {
        console.error('Error fetching cases:', error.message);
      }
    };

    fetchCases();
  }, []);

  const handleSearch = async () => {
    if (!caseId) return;

    setLoading(true);
    setCaseData(null);
    setErrorMsg('');

    try {
      const token = sessionStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/api/cases/display`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    
      if (!response.ok) {
        throw new Error('Failed to fetch cases');
      }
    
      const allCases: Case[] = await response.json();
    
      const matchedCase = allCases.find((c) => c.id === caseId);
    
      if (!matchedCase) {
        throw new Error(`Case not found (ID: ${caseId})`);
      }
    console.log("matchedCase");

    console.log(matchedCase);
    setCaseData(matchedCase);
    } catch (error: any) {
      setErrorMsg(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">View Case History</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Enter Case ID"
          value={caseId}
          onChange={(e) => setCaseId(e.target.value)}
        />

        <Select onValueChange={(val) => setCaseId(val)}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Or select a case" />
          </SelectTrigger>
          <SelectContent>
            {cases.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                #{c.id} - {c.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} disabled={loading}>
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Search'}
        </Button>
      </div>

      {errorMsg && (
        <p className="text-red-600 mb-4">{errorMsg}</p>
      )}

{caseData && (
  <Card className="shadow border">
    <CardContent className="p-6 space-y-4">
      <h3 className="text-xl font-semibold text-blue-700">Case #{caseData.id}</h3>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><Label>Category:</Label> {caseData.category}</div>
        <div><Label>Status:</Label> {caseData.status}</div>
        <div><Label>Start Date:</Label> {new Date(caseData.startDate).toLocaleDateString()}</div>
        <div><Label>Next Hearing:</Label> {new Date(caseData.nextHearing).toLocaleString()}</div>
        <div><Label>Judge:</Label> {caseData.judgeName}</div>
      </div>

      <div>
        <Label>Advocates:</Label>
        {caseData.advocates?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {caseData.advocates.map((adv) => (
              <li key={adv.id}>
                {adv.fullName} ({adv.email})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No advocates listed.</p>
        )}
      </div>

      <div>
        <Label>Clients:</Label>
        {caseData.clients?.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {caseData.clients.map((client) => (
              <li key={client.id}>
                {client.fullName} ({client.email})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No clients listed.</p>
        )}
      </div>

      {/* {caseData.updates?.length ? (
        <div>
          <Label>History / Updates:</Label>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {caseData.updates.map((update, idx) => (
              <li key={idx}>{update}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No history updates available.</p>
      )} */}
    </CardContent>
  </Card>
)}

    </div>
  );
};

export default LawyerDashboard;
