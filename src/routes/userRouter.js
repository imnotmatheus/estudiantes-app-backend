import express from "express";
import { registerUserController } from "../controllers/userController.js";

const userRouter = express.Router();

// Route to register a new user
userRouter.post("/register", registerUserController);

export default userRouter;
