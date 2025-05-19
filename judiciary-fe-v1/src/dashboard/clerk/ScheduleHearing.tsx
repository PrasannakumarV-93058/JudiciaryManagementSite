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

interface CaseForm {
  caseId: string;
  hearingDate: string;
  startTime: string;
  endTime: string;
  nextHearing: string;
  judgeId: number;
}

const ScheduleHearing: React.FC = () => {
  const [formData, setFormData] = useState<CaseForm>({
    caseId: '',
    hearingDate: '',
    startTime: '',
    endTime: '',
    nextHearing: '',
    judgeId: 0,
  });

  const [judges, setJudges] = useState<Judge[]>([]);

  useEffect(() => {
    // Fetch data for dropdowns
    const fetchDropdownData = async () => {
      try {
        const judgesRes = await fetch('/api/judges'); // Replace with your API
        setJudges(await judgesRes.json());
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting Hearing Schedule:', formData);
    // TODO: Replace with actual POST request to API
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Schedule Hearing</h1>
        <Card className="max-w-3xl mx-auto bg-white shadow-md border border-gray-300"> 
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="caseId">Case ID</Label>
                <Input name="caseId" value={formData.caseId} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="hearingDate">Hearing Date</Label>
                <Input type="date" name="hearingDate" value={formData.hearingDate} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="nextHearing">Next Hearing</Label>
                <Input type="date" name="nextHearing" value={formData.nextHearing} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="judgeId">Judge</Label>
                <Select onValueChange={handleJudgeChange} value={formData.judgeId.toString()}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Judge" />
                  </SelectTrigger>
                  <SelectContent>
                    {judges.map((judge) => (
                      <SelectItem key={judge.id} value={judge.id.toString()}>
                        {judge.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="bg-blue-100 mt-4">Schedule Hearing</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleHearing;
