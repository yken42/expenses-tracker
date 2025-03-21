import express from "express";
import { signup, login, protectedRoute, logout, refresh, getCurrentUser } from '../controllers/userController.js';
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/protected', verifyToken, protectedRoute);
router.post('/refresh', refresh);
router.get('/current', getCurrentUser);

export default router;
