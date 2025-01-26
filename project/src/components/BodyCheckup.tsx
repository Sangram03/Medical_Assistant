import React, { useState } from 'react';
import { Calendar, Clock, FileText } from 'lucide-react';
import { checkupTypes } from '../data/checkups';

interface FormData {
  name: string;
  age: string;
  date: string;
  time: string;
  checkupType: string;
  notes: string;
}

export default function BodyCheckup() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    date: '',
    time: '',
    checkupType: 'full',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Here you would integrate with Supabase
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: '',
          age: '',
          date: '',
          time: '',
          checkupType: 'full',
          notes: ''
        });
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="checkup" className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">Book Body Checkup</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  min="0"
                  max="150"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">Preferred Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Checkup Type</label>
              <select
                name="checkupType"
                value={formData.checkupType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {checkupTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
                placeholder="Any specific concerns or requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : success ? (
                <span className="flex items-center">
                  ✓ Appointment Scheduled
                </span>
              ) : (
                <>
                  <Calendar className="mr-2" />
                  Schedule Checkup
                </>
              )}
            </button>
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-semibold mb-1 dark:text-white">Flexible Scheduling</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Choose your preferred date and time</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-semibold mb-1 dark:text-white">Quick Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Get your results within 24-48 hours</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
              <h3 className="font-semibold mb-1 dark:text-white">Digital Reports</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Access your reports online anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}