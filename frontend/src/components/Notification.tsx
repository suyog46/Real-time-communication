'use client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Notification {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
}

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  // Set up Socket.IO connection and listen for new alerts
  useEffect(() => {


    console.log("yo step ")
    const socket = io('http://localhost:5000'); //  Your server address
    
    socket.on('connect', () => {
      console.log('Connected to the server');
    socket.emit('sendMessage', { message: 'Hello, server!' });
        
  });

  socket.on('messageReceived', (data) => {
    console.log('Server response:', data.message);  // Log the response from the server
  });


  // Listen for 'disaster-alert' messages from the server

    socket.on('disaster-alert', (data: { message: string }) => {
      const newNotification: Notification = {
        id: Date.now(), // Unique ID based on timestamp
        message: data.message,
        type: 'info', // Set as 'info' type for disaster alerts
        timestamp: new Date().toISOString(),
      };
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    });

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
      console.log("server disconnectred")
    };
  }, []);

  const handleDeleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Notifications</h1>
      
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-600">No notifications available.</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg flex justify-between items-start ${
                notification.type === 'info'
                  ? 'bg-blue-100 text-blue-800'
                  : notification.type === 'warning'
                  ? 'bg-yellow-100 text-yellow-800'
                  : notification.type === 'error'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              <div className="flex flex-col">
                <span className="font-semibold">{notification.message}</span>
                <span className="text-sm text-gray-500">{new Date(notification.timestamp).toLocaleString()}</span>
              </div>
              <button
                onClick={() => handleDeleteNotification(notification.id)}
                className="ml-4 text-sm text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>

      {/* Display the disaster alert message at the bottom */}
      {alertMessage && (
        <div className="mt-4 p-4 rounded-lg bg-red-100 text-red-800">
          <h2 className="font-semibold">Disaster Alert</h2>
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
