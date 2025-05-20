import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PlusCircle } from "lucide-react";
interface CaseForm {
  fullName: string;
  username: string;
  role: string;
  email: string;
  password: string;
  phone: string;
}

const ClerkCreateUser: React.FC = () => {
  const [formData, setFormData] = useState<CaseForm>({
    fullName: '',
    username: '',
    role: '',
    email: '',
    password: '',
    phone: '',

  });


  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.endsWith('Id') ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const token = sessionStorage.getItem('jwtToken'); // Retrieve JWT token from sessionStorage
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers,
        body: JSON.stringify(formData), // Send form data as JSON
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user. Please try again.');
      }
  
      const data = await response.json();
      console.log('User created successfully:', data);
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);

    }
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
                <Label htmlFor="fullName">Full Name</Label>
                <input
                  name="fullName"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleChange} // Bind onChange to update state
                />
              </div>

              <div>
                <Label htmlFor="username">User Name</Label>
                <input
                  name="username"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter User Name"
                  value={formData.username}
                  onChange={handleChange} // Bind onChange to update state
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange} // Bind onChange to update state
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="judge">Judge</option>
                  <option value="client">Client</option>
                  <option value="lawyer">Lawyer</option>
                </select>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <input
                  name="email"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange} // Bind onChange to update state
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <input
                  name="password"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange} // Bind onChange to update state
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <input
                  name="phone"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  placeholder="Enter Phone"
                  value={formData.phone}
                  onChange={handleChange} // Bind onChange to update state
                />
              </div>
            </div>
            <Button type="submit" className="bg-blue-100 mt-4">
              Create User
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClerkCreateUser;
