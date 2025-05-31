import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Judge {
  id: number;
  fullName: string;
}

interface Case {
  id: string;
}

interface CaseForm {
  caseId: string;
  startTime: string;
  nextHearing: string;
  judgeId: number;
}

const JudgeScheduleHearing: React.FC = () => {
  const [formData, setFormData] = useState<CaseForm>({
    caseId: '',
    startTime: '',
    nextHearing: '',
    judgeId: 0,
  });

  const [cases, setCases] = useState<Case[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const SuccessPopup: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
    <div className="fixed bottom-6 right-6 z-50 w-80 bg-green-100 border border-green-400 text-green-800 p-4 rounded-lg shadow-lg flex items-center justify-between">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 font-bold text-green-700 hover:text-green-900"
        aria-label="Close success message"
      >
        &times;
      </button>
    </div>
  );
const currentUserName= sessionStorage.getItem("currentUserName");
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
  
        const response = await fetch('http://localhost:8080/api/cases/display', { headers });
  
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
  
        const casesData: Case[] = await response.json();
        console.log(casesData);
        const filteredCases = casesData
          .filter((c) => c.judgeName?.includes(currentUserName))
          .sort((a, b) => {
            const numA = Number(a.id);
            const numB = Number(b.id);
  
            if (!isNaN(numA) && !isNaN(numB)) {
              return numA - numB;
            }
            return a.id.localeCompare(b.id);
          });
          console.log(filteredCases);
  
        setCases(filteredCases);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };
  
    fetchDropdownData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJudgeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      judgeId: Number(value),
    }));
  };

  const handleCaseChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      caseId: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    try {
      const response = await fetch(
        `http://localhost:8080/api/cases/${formData.caseId}/next-hearing`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            nextHearing: `${formData.nextHearing}T${formData.startTime}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update next hearing: ${response.statusText}`);
      }

      setSuccessMessage('Hearing scheduled successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);

    } catch (error) {
      console.error('Error updating next hearing:', error);
      alert('Failed to update next hearing');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {successMessage && (
        <SuccessPopup
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Schedule Hearing</h1>
      <Card className="max-w-3xl mx-auto bg-white shadow-md border border-gray-300"> 
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div >
                <Label htmlFor="caseId">Case ID</Label>
                <Select onValueChange={handleCaseChange} value={formData.caseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Case ID" />
                  </SelectTrigger>
                  <SelectContent className="max-w-3xl mx-auto bg-white shadow-md border border-gray-300">
                    {cases.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="nextHearing">Next Hearing</Label>
                <Input type="date" name="nextHearing" value={formData.nextHearing} onChange={handleChange} />
              </div>
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white mt-4">Schedule Hearing</Button>
          </form>
        </CardContent>
      </Card>

      
    </div>
  );
};

export default JudgeScheduleHearing;
