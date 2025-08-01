import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// All ROutes Related to user will be listed there
router.post('/register', register);
router.post('/login', login);

export default router;
