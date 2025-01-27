import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
}
)
import connectDb from "./db/db.index.js";
import app from "./app.js";

import http from 'http';
import {Server} from 'socket.io';

const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: '*', 
    credentials: true,  
  },
});



let clients = {};


//building vitra xire paxi 
io.on('connection', (socket) => { 
    console.log('A user connected',socket.id);

      // Register the client with their socket ID
    clients[socket.id] = socket;

    socket.emit('your-socket-id', socket.id);

    socket.on('private-message', (data) => {
      const { recipientId, message } = data;
  
      // Send message to the specified recipient
      if (clients[recipientId]) {
        clients[recipientId].emit('private-message', {
          message,
          senderId: socket.id,
        });
      } else {
        console.log(`Recipient with ID ${recipientId} not found.`);
      }
    });
  
    // Send a test alert every 5 seconds
    setInterval(() => {
      socket.emit('disaster-alert', { message: 'High risk of storm in your area!' });
    }, 5000);

    socket.on('sendMessage', (data) => {
      console.log('Message from client:', data.message);  // Log the received message
      // Optionally, emit a response back to the client
      socket.emit('messageReceived', { message: 'Message received by the server!' });
    })
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    }); 
  });
  




//integrating open ai to the chat  

  // import OpenAI from "openai";

  // const openai = new OpenAI({
  //   apiKey: ""
  
  
  // const completion = openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   store: true,
  //   messages: [
  //     {"role": "user", "content": "write a haiku about ai"},
  //   ],
  // });
  // completion.then((result) => console.log(result.choices[0].message));
  
  // async function generateResponse(prompt) {
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: prompt }],
  //   });
  //   console.log(response.choices[0].message.content);
  // }
  // generateResponse("What are the benefits of using Node.js for backend AI integrations?")
  
  // app.post("/chat", async (req, res) => {
  //   const { message } = req.body;
  //   const response = await openai.chat.completions.create({
  //     model: "gpt-3.5-turbo",
  //     messages: [{ role: "user", content: message }],
  //   });
  //   res.json({ reply: response.choices[0].message.content });
  // });
  
  

//extra note on how connectdb works!!

// connectDb itself is not a Promise. Instead, it is a function that returns a resolved Promise once invoked
// connectDb is a function. It does not immediately do anything by itself.
// When called (connectDb()), the code inside executes.
// Why Does It Return a Promise?
// Because the function is marked as async, JavaScript wraps its return value in a Promise.
// Even if you don’t explicitly return a value in an async function, JavaScript will still wrap it in a resolved Promise..


connectDb().then(()=>{
    server.listen(process.env.port||5000,()=>{
        console.log("app is successfully working in the port",process.env.port)
        console.log("Socket.IO server is running");
    })
}).catch((error)=>{
console.log("error occured ",error.message)
})


//open ai 

