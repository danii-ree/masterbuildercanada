import React from 'react';
import { Phone, Mail, MapPin, Hammer, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <div 
        className="h-[60vh] bg-cover bg-center relative"
        style={{
          backgroundImage: 'url("https://i.imgur.com/GdIkuL6.jpeg")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center mb-4">
              <Hammer className="w-12 h-12 mr-2" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Wood Cabin Decor</h1>
            <p className="text-xl">Custom carpentry</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-amber-900 mb-8 text-center">Get in Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-amber-700" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-lg text-gray-700">(647) 525-1581</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-amber-700" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg text-gray-700">mohsenrayati@yahoo.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-amber-700" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="text-lg text-gray-700">Toronto, Ontario</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">Working Hours</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-700">6:00 AM - 11:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Saturday & Sunday</span>
                  <span className="text-gray-700">6:00 AM - 2:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex justify-center space-x-6">
            <a href="https://www.youtube.com/channel/UCIsa4_K-06uI0lYo9j5xAiw" className="text-amber-700 hover:text-amber-900 transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/master_builder_ca/" className="text-amber-700 hover:text-amber-900 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;