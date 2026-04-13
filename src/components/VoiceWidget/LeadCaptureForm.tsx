import * as React from 'react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner';

export function LeadCaptureForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // In a real app, this would call your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Lead captured:', data);
      toast.success('Inquiry sent successfully! Aria will follow up soon.');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-200">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-white">Get in Touch</CardTitle>
        <CardDescription className="text-[10px] text-slate-400">
          Leave your details and Aria will coordinate a follow-up.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs">Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required className="h-8 text-xs bg-slate-800 border-slate-700" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="company" className="text-xs">Company</Label>
              <Input id="company" name="company" placeholder="Acme Inc" required className="h-8 text-xs bg-slate-800 border-slate-700" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs">Email / Phone</Label>
            <Input id="email" name="email" placeholder="john@example.com" required className="h-8 text-xs bg-slate-800 border-slate-700" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="type" className="text-xs">Inquiry Type</Label>
            <Select name="type" required>
              <SelectTrigger className="h-8 text-xs bg-slate-800 border-slate-700">
                <SelectValue placeholder="Select interest" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                <SelectItem value="sales" className="text-xs">Sales Inquiry</SelectItem>
                <SelectItem value="support" className="text-xs">Technical Support</SelectItem>
                <SelectItem value="consulting" className="text-xs">AI Consulting</SelectItem>
                <SelectItem value="other" className="text-xs">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
            {loading ? 'Sending...' : 'Send Inquiry'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
