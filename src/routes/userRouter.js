import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  registerUserController,
  loginUserController,
  getUserByIdController,
  getAllUsersController,
} from "../controllers/userController.js";

const userRouter = express.Router();

// Route to register a new user
userRouter.post("/register", registerUserController);
// Route to login user
userRouter.post("/login", loginUserController);

userRouter.get("/:id", getUserByIdController);
userRouter.get("/", getAllUsersController);

export default userRouter;
