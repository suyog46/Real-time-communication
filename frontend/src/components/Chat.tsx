'use client';
import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

// Declare the socket connection
let socket: Socket;

const Chat = () => {
  const [mySocketId, setMySocketId] = useState<string>("");
  const [recipientId, setRecipientId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);

  useEffect(() => {
    // Initialize Socket.IO
    socket = io('http://192.168.1.68:5000');

    // Get the client's socket ID
    socket.on("your-socket-id", (socketId: string) => {
        console.log("socket id is ",socketId);
      setMySocketId(socketId);
    });

    // Listen for private messages
    socket.on("private-message", (data: { message: string; senderId: string }) => {
      const { message, senderId } = data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: `Client ${senderId}`, message },
      ]);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Send the message to a specific recipient
  const sendMessage = () => {
    if (!recipientId || !message) return;

    socket.emit("private-message", { recipientId, message });

    // Display the message in the current chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "You", message },
    ]);

    // Clear the message input
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
    {/* Header */}
    <header className="text-center py-6 bg-gradient-to-r from-indigo-700 to-purple-800 shadow-md">
      <h1 className="text-4xl font-bold tracking-wide">Chat Application</h1>
    </header>

    {/* Chat Container */}
    <div className="flex-1 container mx-auto px-6 py-8 max-w-5xl">
      <div className="h-[70vh] overflow-y-auto p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex mb-4 ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md p-4 rounded-2xl shadow-md ${
                msg.sender === "You"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-gray-700 text-gray-300 rounded-bl-none"
              }`}
            >
              <p className="text-sm text-gray-400 mb-1">{msg.sender}</p>
              <p className="text-lg leading-relaxed">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Input Section */}
    <div className="container mx-auto px-6 pb-8 max-w-3xl">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Recipient's Socket ID"
          className="flex-1 p-4 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-4 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition-all"
        >
          Send
        </button>
      </div>
    </div>

    {/* Footer */}
    <footer className="text-center py-4 bg-gray-800 border-t border-gray-700">
      <p className="text-gray-400">Your Socket ID: <span className="text-white font-medium">{mySocketId}</span></p>
    </footer>
  </div>
  
  );
};

export default Chat;
