// components/ContactFormSection.tsx
"use client"; // Cần cho state quản lý form sau này

import React, { useState } from 'react';

// Định nghĩa các kiểu dữ liệu cho select options (ví dụ)
const locationOptions = ["Choose your location", "Hanoi", "Da Nang", "Ho Chi Minh City", "Other"];
const eventTypeOptions = ["Choose type of event", "Wedding", "Birthday Party", "Proposal", "Corporate Event", "Other"];
const budgetOptions = ["Choose your budget", "Below $10,000", "$10,000 - $20,000", "$20,000 - $50,000", "Above $50,000", "To be discussed"];

interface FormData {
  name: string;
  email: string;
  phone: string;
  currentLocation: string;
  eventType: string;
  guests: string; // Để là string để dễ xử lý input, có thể convert sang number sau
  budget: string;
  eventDate: string;
  eventLocation: string;
  requirement: string;
}

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    currentLocation: locationOptions[0],
    eventType: eventTypeOptions[0],
    guests: '',
    budget: budgetOptions[0],
    eventDate: '',
    eventLocation: locationOptions[0], // Có thể dùng lại locationOptions hoặc tạo mảng riêng
    requirement: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Xử lý gửi form (validation, gọi API, ...)
    console.log("Form Data Submitted:", formData);
    // Reset form hoặc hiển thị thông báo thành công
  };

  const renderInputLabel = (label: string, required: boolean = true) => (
    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );

  return (
    <div className="bg-[#f9f5ef] py-16 sm:py-20 md:py-24 lg:py-28"> {/* Nền kem nhạt */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl"> {/* Giới hạn chiều rộng form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Contact Info Section */}
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl text-gray-800 mb-8">Contact Info</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8">
              <div>
                {renderInputLabel("Name")}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Type your full name here"
                  className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors"
                  required
                />
              </div>
              <div>
                {renderInputLabel("Email Address")}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Type your email address here"
                  className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                <div>
                  {renderInputLabel("Phone/Mobile")}
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-sm">
                      +84
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      className="w-full p-3 border border-gray-300 rounded-r-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors"
                      required
                    />
                  </div>
                </div>
                <div>
                  {renderInputLabel("Your Current Location")}
                  <select
                    name="currentLocation"
                    value={formData.currentLocation}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors appearance-none"
                    required
                  >
                    {locationOptions.map(opt => <option key={opt} value={opt} disabled={opt === locationOptions[0]}>{opt}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Event Details Section */}
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl text-gray-800 mb-8 mt-12">Event Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              <div>
                {renderInputLabel("Type of Event")}
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors appearance-none"
                  required
                >
                  {eventTypeOptions.map(opt => <option key={opt} value={opt} disabled={opt === eventTypeOptions[0]}>{opt}</option>)}
                </select>
              </div>
              <div>
                {renderInputLabel("Number of Guests")}
                <input
                  type="text" // Có thể dùng "number" nhưng "text" dễ xử lý placeholder "eg. 500" hơn
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="eg. 500"
                  className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors"
                  required
                />
              </div>
              <div>
                {renderInputLabel("Budget (or please clarify...)")}
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors appearance-none"
                  required
                >
                  {budgetOptions.map(opt => <option key={opt} value={opt} disabled={opt === budgetOptions[0]}>{opt}</option>)}
                </select>
              </div>
              <div>
                {renderInputLabel("Event Date")}
                <input
                  type="date" // Sử dụng type="date" cho date picker của trình duyệt
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors"
                  required
                />
              </div>
              <div className="sm:col-span-2"> {/* Event Location chiếm 2 cột trên sm+ */}
                {renderInputLabel("Event Location (or please clarify...)")}
                <select
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-sm bg-white focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors appearance-none"
                  required
                >
                  {/* Bạn có thể dùng lại locationOptions hoặc tạo mảng riêng cho event location */}
                  {locationOptions.map(opt => <option key={opt} value={opt} disabled={opt === locationOptions[0]}>{opt}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Question or Requirement Section */}
          <div>
            {renderInputLabel("Question or Requirement for us?")}
            <textarea
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              placeholder="Let us know your requirement in more details..."
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-sm focus:ring-1 focus:ring-brand-red focus:border-brand-red transition-colors"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-white text-brand-red uppercase text-sm font-semibold py-3 px-12 sm:px-16 rounded-sm hover:bg-gray-100 transition-colors duration-300 tracking-wider border border-brand-red"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormSection;