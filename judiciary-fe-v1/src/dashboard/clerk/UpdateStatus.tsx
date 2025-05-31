import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Case {
  id: string;
}

interface CaseForm {
  caseId: string;
  status: string;
  judgement: string;
}

const UpdateStatus: React.FC = () => {
  const [formData, setFormData] = useState<CaseForm>({
    caseId: '',
    status: '',
    judgement: '',
  });

  const [cases, setCases] = useState<Case[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const SuccessPopup: React.FC<{ message: string; onClose: () => void }> = ({
    message,
    onClose,
  }) => (
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

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (!token) {
      console.warn('No JWT token found in sessionStorage');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const fetchCases = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/cases/display', { headers });
        if (!res.ok) throw new Error('Failed to fetch cases');
        const data: Case[] = await res.json();

        data.sort((a, b) => {
          const numA = Number(a.id);
          const numB = Number(b.id);
          return !isNaN(numA) && !isNaN(numB) ? numA - numB : a.id.localeCompare(b.id);
        });

        console.log('Fetched Cases:', data);
        setCases(data);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaseChange = (value: string) => {
    setFormData((prev) => ({ ...prev, caseId: value }));
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem('jwtToken');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      console.log(JSON.stringify({
        status: formData.status,
        judgment: formData.judgement,
      }));
      const response = await fetch(
        `http://localhost:8080/api/clerks/cases/${formData.caseId}/status`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify({
            status: formData.status,
            judgment: formData.judgement,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to update case status');

      setSuccessMessage('Case status updated successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (error) {
      console.error('Error updating case status:', error);
      alert('Failed to update case status');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6">
      {successMessage && (
        <SuccessPopup message={successMessage} onClose={() => setSuccessMessage(null)} />
      )}

      <h1 className="text-2xl font-semibold text-slate-800 mb-6">Update Case Status</h1>

      <Card className="max-w-3xl mx-auto bg-white shadow-md border border-gray-300">
        <CardContent className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="caseId">Case ID</Label>
                <Select onValueChange={handleCaseChange} value={formData.caseId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Case ID">
                    {formData.caseId}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {cases.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={handleStatusChange} value={formData.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Dismissed">Dismissed</SelectItem>
                    <SelectItem value="On Hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="judgement">Judgement</Label>
                <Input
                  type="text"
                  name="judgement"
                  value={formData.judgement}
                  onChange={handleChange}
                  placeholder="Enter judgment text"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white mt-4">
              Update Status
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateStatus;
