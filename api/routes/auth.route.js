import express from 'express'
import { login, logout, register, verifyOTP } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verifyOTP', verifyOTP);

export default router;