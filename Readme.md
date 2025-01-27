# Real-time Communication System

A full-stack web application that allows users to choose between a **Notification System** or a **Chat System**. The app uses **Socket.IO** for real-time communication and is built with **Next.js** for the frontend and **Node.js** for the backend.

## Features

- **Notification System**: Real-time notifications with types (info, warning, error, success). Users can view and dismiss notifications.
- **Chat System**: Real-time chat functionality where users can send and receive messages.
- **Tab Navigation**: Professional UI for switching between Notification and Chat systems.

## Tech Stack

### Frontend:
- React
- Next.js
- Tailwind CSS
- Socket.IO-client (for real-time communication)

### Backend:
- Node.js
- Express.js
- Socket.IO (for real-time communication)

## Project Structure

The repository is divided into two main directories: **frontend** and **backend**.

/real-time-communication 
    ├── /frontend # React and Next.js frontend 
    └── /backend # Node.js and Express.js backend



## Setup

### Frontend Setup

1. Clone the repository:

git clone https://github.com/your-username/real-time-communication.git
 cd real-time-communication



2. Navigate to the frontend directory:

cd frontend


3. Install frontend dependencies:

npm install



4. Start the frontend development server:

npm run dev


5. Open the app in your browser:

http://localhost:3000



### Backend Setup

1. Navigate to the backend directory:

cd backend



2. Install backend dependencies:

npm install


3. Start the backend server:

npm start



This will run the server on **port 5000** (or another port if configured differently).

Ensure that both the **frontend (localhost:3000)** and **backend (localhost:5000)** are running simultaneously in separate terminals.

## Environment Variables

For the backend, ensure that any required environment variables are configured, such as:

- `SERVER_PORT`: Port number for the backend server (default: 5000).
- `DATABASE_URL`: Connection string to your database if required.

These variables can be stored in a `.env` file in the backend directory.

### Example `.env` file:

SERVER_PORT=5000 
DATABASE_URL=mongodb://localhost:27017/mydatabase

## Demo

You can try out the demo locally by visiting the following URLs:

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## Usage

Once the servers are running:

- **Notifications**: The user can choose to view the Notifications system and receive real-time notifications. Users can dismiss notifications as needed.
- **Chat**: The user can switch to the Chat tab to engage in real-time communication with other users.
- **Tab Navigation**: The app provides easy navigation between the Notifications and Chat s