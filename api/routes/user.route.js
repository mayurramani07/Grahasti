import express from 'express';
import { getUser, profilePosts, savePost, updateUser, getNotificationNumber } from '../controllers/user.controller.js';
import verifyToken from '../middleware/varifyToken.js';
const router = express.Router();

router.get('/profilePosts', verifyToken, profilePosts);
router.get('/notification', verifyToken, getNotificationNumber);
router.get('/:id', getUser);
router.put('/:id', verifyToken, updateUser);
router.post('/save', verifyToken, savePost);

export default router;