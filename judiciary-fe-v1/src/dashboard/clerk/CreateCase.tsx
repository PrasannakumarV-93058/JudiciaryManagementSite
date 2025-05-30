import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlusCircle } from "lucide-react";

interface CaseForm {
  category: string;
  status: string;
  startDate: string;
  description: string;
  judge: { id: number };
  lawyer: { id: number };
  prosecutor: { id: number };
  plaintiff: { id: number };
  opponent: { id: number };
}

const ClerkCreate: React.FC = () => {
  const [formData, setFormData] = useState<CaseForm>({
    category: '',
    status: '',
    startDate: "",
    description: '',
    judge: { id: 0 },
    lawyer: { id: 0 },
    prosecutor: { id: 0 },
    plaintiff: { id: 0 },
    opponent: { id: 0 },
  });

  const [judges, setJudges] = useState<{ id: number; fullName: string }[]>([]);
  const [lawyers, setLawyers] = useState<{ id: number; fullName: string }[]>([]);
  const [prosecutors, setProsecutors] = useState<{ id: number; fullName: string }[]>([]);
  const [plaintiffs, setPlaintiffs] = useState<{ id: number; fullName: string }[]>([]);
  const [opponents, setOpponents] = useState<{ id: number; fullName: string }[]>([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const [judgesRes, lawyersRes, prosecutorsRes, plaintiffsRes, opponentsRes] = await Promise.all([
          fetch('http://localhost:8080/api/users/role/judge', { headers }),
          fetch('http://localhost:8080/api/users/role/lawyer', { headers }),
          fetch('http://localhost:8080/api/users/role/lawyer', { headers }),
          fetch('http://localhost:8080/api/users/role/client', { headers }),
          fetch('http://localhost:8080/api/users/role/client', { headers }),
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (["judge", "lawyer", "prosecutor", "plaintiff", "opponent"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        [name]: { id: Number(value) },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Case:', formData);

    try {
      const token = sessionStorage.getItem("jwtToken");

      const formattedData = {
        ...formData,
        startDate: formData.startDate ? `${formData.startDate}T00:00:00` : null,
      };

      const response = await fetch("http://localhost:8080/api/cases/createcase", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP ${response.status} - ${errorBody}`);
      }

      const result = await response.json();
      console.log("Case created successfully:", result);
    } catch (error) {
      console.error("Error creating case:", error);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
        <PlusCircle className="w-6 h-6 text-blue-600" />
        Create New Case
      </h1>
      <Card className="max-w-3xl mx-auto bg-white shadow-md border border-gray-300">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="Civil">Civil</option>
                  <option value="Criminal">Criminal</option>
                  <option value="Family">Family</option>
                </select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <Label htmlFor="judge">Judge</Label>
                <select
                  name="judge"
                  value={formData.judge.id || ""}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="" disabled>Select Judge</option>
                  {judges.map((j) => (
                    <option key={j.id} value={j.id}>{j.fullName}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="lawyer">Lawyer</Label>
                <select
                  name="lawyer"
                  value={formData.lawyer.id || ""}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="" disabled>Select Lawyer</option>
                  {lawyers.map((l) => (
                    <option key={l.id} value={l.id}>{l.fullName}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="prosecutor">Prosecutor</Label>
                <select
                  name="prosecutor"
                  value={formData.prosecutor.id || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="" disabled>Select Prosecutor</option>
                  {prosecutors.map((p) => (
                    <option key={p.id} value={p.id}>{p.fullName}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="plaintiff">Plaintiff</Label>
                <select
                  name="plaintiff"
                  value={formData.plaintiff.id || ""}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="" disabled>Select Plaintiff</option>
                  {plaintiffs.map((p) => (
                    <option key={p.id} value={p.id}>{p.fullName}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="opponent">Opponent</Label>
                <select
                  name="opponent"
                  value={formData.opponent.id || ""}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="" disabled>Select Opponent</option>
                  {opponents.map((o) => (
                    <option key={o.id} value={o.id}>{o.fullName}</option>
                  ))}
                </select>
              </div>
            </div>
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 mt-4">
              Create Case
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClerkCreate;
