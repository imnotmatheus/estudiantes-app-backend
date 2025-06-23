import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  registerUserController,
  loginUserController,
  getUserByIdController,
  getAllUsersController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.post("/login", loginUserController);
userRouter.get("/:id", authMiddleware, getUserByIdController);
userRouter.get("/", authMiddleware, getAllUsersController);

export default userRouter;
