import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Mock auth middleware for now
const mockAuth = (req: any, res: any, next: any) => {
  req.user = { id: 'mock-user-id' };
  next();
};

// GET /api/feed
router.get('/', mockAuth, async (req, res) => {
  try {
    const { locality, cursor, limit = 20 } = req.query;
    
    // In a real app we'd filter by locality
    const posts = await prisma.post.findMany({
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, name: true, avatar: true } },
        _count: { select: { comments: true, likes: true } }
      }
    });

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feed' });
  }
});

// POST /api/feed
router.post('/', mockAuth, async (req: any, res: any) => {
  try {
    const { type, content, visibility, locality, imageUrls } = req.body;
    
    // Create post (requires a user to exist in the DB, so this might fail if DB is empty)
    // For now we'll just mock the response
    res.status(201).json({
      id: Math.random().toString(36).substring(7),
      type,
      content,
      visibility,
      locality,
      authorId: req.user.id,
      createdAt: new Date()
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

export default router;
