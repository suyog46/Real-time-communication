'use client';
import React, { useState } from 'react';
import Notification from '@/components/Notification';
import Chat from '@/components/Chat';
import Link from 'next/link';

function Page() {
  const [activeView, setActiveView] = useState<'notifications' | 'chat'>('notifications');

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 p-6">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-800">
        Real-time Communication System
      </h1>
      <p className="text-slate-400 text-xl">See the demo for:</p>
      <br />

      {/* Tabs Container */}
      <div className="mb-6 w-full max-w-3xl">
        <div className="flex justify-around bg-white shadow-md rounded-lg">
          {/* Notifications Tab */}
          <button
            className={`w-1/2 py-3 text-xl font-medium rounded-tl-lg ${
              activeView === 'notifications'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-300`}
            onClick={() => setActiveView('notifications')}
          >
            Notifications
          </button>

          {/* Chat Tab */}
          <button
            className={`w-1/2 py-3 text-xl font-medium rounded-tr-lg ${
              activeView === 'chat'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } transition-colors duration-300`}
            onClick={() => setActiveView('chat')}
          >
            Chat
          </button>
        </div>
        <div className="border-b-2 border-gray-200 mt-1 w-full"></div>
      </div>

      {/* Conditionally render the active view */}
      <div className="w-full  mt-6">
        {activeView === 'notifications' ? (
          <Notification />
        ) : (
          <Chat />
        )}
      </div>

     
     
    </div>
  );
}

export default Page;
