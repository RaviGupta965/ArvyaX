import express from 'express';
import {
  getPublicSessions,
  getMySessions,
  getSingleSession,
  saveDraft,
  publishSession,
  deleteSession
} from '../controllers/sessionController.js';

import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes related tp session will be listed there
router.get('/', getPublicSessions);
router.post('/my-sessions', authMiddleware, getMySessions);
router.get('/my-sessions/:id', authMiddleware, getSingleSession);
router.post('/my-sessions/save-draft', authMiddleware, saveDraft);
router.post('/my-sessions/publish', authMiddleware, publishSession);
router.delete('/my-sessions/delete-session/:id', authMiddleware, deleteSession);

export default router;