import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";

const app=express();

app.use(
    cors({
      origin: '*'  ,//|| 'http://localhost:3000',  Allow specific origin
      credentials: true,  // Allow sending cookies and authorization headers
    })
  );

app.use(express.json({limit:"16kb"}));
//content-type:application/json lai handle garxa and keeps it in req.body
app.use(express.urlencoded({extended:true,limit:"16kb"}))
// Parses application/x-www-form-urlencoded payloads (form data) and makes them available under req.body.
// extended: true: Allows parsing of nested objects in the payload (e.g., { user: { name: "John" } }).
app.use(express.static("public"));
app.use(cookieParser())
// Parses cookies sent with the request and makes them available as a JavaScript object under req.cookies.
app.use("/api/v1/users",userRouter)

export default app;
