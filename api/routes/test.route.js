import express from 'express'
import { shouldBeLoggedIn } from '../controllers/test.controller.js';
import verifyToken from '../middleware/varifyToken.js';

const router = express.Router();

router.get('/should-be-logged-in', verifyToken, shouldBeLoggedIn);

export default router;