import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlusCircle } from "lucide-react";
interface CaseForm {
  category: string;
  status: string;
  startDate: string;
  endDate: string;
  nextHearing: string;
  judgeId: number;
  lawyerId: number;
  prosecutorId: number;
  plaintiffId: number;
  opponentId: number;
}

const ClerkCreateUser: React.FC = () => {
  const [formData, setFormData] = useState<CaseForm>({
    category: '',
    status: '',
    startDate: '',
    endDate: '',
    nextHearing: '',
    judgeId: 0,
    lawyerId: 0,
    prosecutorId: 0,
    plaintiffId: 0,
    opponentId: 0,
  });

  const [judges, setJudges] = useState<{ id: number; name: string }[]>([]);
  const [lawyers, setLawyers] = useState<{ id: number; name: string }[]>([]);
  const [prosecutors, setProsecutors] = useState<{ id: number; name: string }[]>([]);
  const [plaintiffs, setPlaintiffs] = useState<{ id: number; name: string }[]>([]);
  const [opponents, setOpponents] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    // Fetch data for dropdowns
    const fetchDropdownData = async () => {
      try {
        const [judgesRes, lawyersRes, prosecutorsRes, plaintiffsRes, opponentsRes] = await Promise.all([
          fetch('/api/users/role/judge'), // Replace with your API endpoint
          fetch('/api/users/role/lawyers'),
          fetch('/api/prosecutors'),
          fetch('/api/plaintiffs'),
          fetch('/api/opponents'),
        ]);

        setJudges(await judgesRes.json());
        setLawyers(await lawyersRes.json());
        setProsecutors(await prosecutorsRes.json());
        setPlaintiffs(await plaintiffsRes.json());
        setOpponents(await opponentsRes.json());
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith('Id') ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Case:', formData);
    // TODO: Replace with actual API call
  };

  return (
    <div className="bg-slate-50 min-h-screen">
        <h1 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-blue-600" />
          Create New User
        </h1>
        <Card className="max-w-3xl mx-auto bg-white shadow-md border border-gray-300"> 
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">ID</Label>
                <input 
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        type="ID" placeholder='Enter User ID' />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="nextHearing">Next Hearing</Label>
                <input
                  type="date"
                  name="nextHearing"
                  value={formData.nextHearing}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label htmlFor="judgeId">Judge</Label>
                <select
                  name="judgeId"
                  value={formData.judgeId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>Select Judge</option>
                  {judges.map((judge) => (
                    <option key={judge.id} value={judge.id}>
                      {judge.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="lawyerId">Lawyer</Label>
                <select
                  name="lawyerId"
                  value={formData.lawyerId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>Select Lawyer</option>
                  {lawyers.map((lawyer) => (
                    <option key={lawyer.id} value={lawyer.id}>
                      {lawyer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="prosecutorId">Prosecutor</Label>
                <select
                  name="prosecutorId"
                  value={formData.prosecutorId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>Select Prosecutor</option>
                  {prosecutors.map((prosecutor) => (
                    <option key={prosecutor.id} value={prosecutor.id}>
                      {prosecutor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="plaintiffId">Plaintiff</Label>
                <select
                  name="plaintiffId"
                  value={formData.plaintiffId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>Select Plaintiff</option>
                  {plaintiffs.map((plaintiff) => (
                    <option key={plaintiff.id} value={plaintiff.id}>
                      {plaintiff.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="opponentId">Opponent</Label>
                <select
                  name="opponentId"
                  value={formData.opponentId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>Select Opponent</option>
                  {opponents.map((opponent) => (
                    <option key={opponent.id} value={opponent.id}>
                      {opponent.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button type="submit" className="bg-blue-100 mt-4">Create Case</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClerkCreateUser;
