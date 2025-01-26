import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
    availability: "Mon-Fri, 9AM-5PM",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "sarah.j@mediassist.ai"
    }
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
    availability: "Tue-Sat, 10AM-6PM",
    contact: {
      phone: "+1 (555) 234-5678",
      email: "michael.c@mediassist.ai"
    }
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
    availability: "Mon-Thu, 8AM-4PM",
    contact: {
      phone: "+1 (555) 345-6789",
      email: "emily.r@mediassist.ai"
    }
  }
];

export default function DoctorsList() {
  return (
    <section id="doctors" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Available Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-blue-600 mb-4">{doctor.specialty}</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{doctor.availability}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{doctor.contact.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-gray-500" />
                    <span>{doctor.contact.email}</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Schedule Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}