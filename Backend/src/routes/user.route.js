import { Router } from "express";
import { register,login,logout } from "../controller/user.controller.js";
import upload from "../middleware/multer.js";
const userRouter =Router();

userRouter.route("/register").post(upload.fields(
    [{name:"userProfile",
        maxCount:1
    }]
    ),register)
userRouter.route("/login").post(login);

export default userRouter;
