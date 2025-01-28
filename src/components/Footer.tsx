import React from 'react';

export default function Footer() {
    return (
    <footer className="p-6 bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Left Section */}
        <div>
          <div>© 2024 ConvoHub. All rights reserved.</div>
          <div className="space-x-4 mt-2">
            <a href="/" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-6 md:mt-0 space-y-4">
          <input
            type="email"
            placeholder="Subscribe to our newsletter"
            className="w-full md:w-auto px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
    );
  }
  