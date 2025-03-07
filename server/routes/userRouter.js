import express from "express";
import { signup, login, protectedRoute } from '../controllers/userController.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', verifyToken, protectedRoute);

export default router;
