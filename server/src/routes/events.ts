import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/events - List upcoming events based on locality (mocked locality for now)
router.get('/', async (req, res) => {
  try {
    const { ward, pinCode } = req.query;

    // In a real app we'd filter by ward/pincode and date
    // For now we just return all events
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
      include: {
        organizer: {
          select: { name: true, profileImage: true }
        }
      }
    });

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id - Get event details
router.get('/:id', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: {
        organizer: { select: { name: true, profileImage: true } },
        attendees: {
          include: {
            user: { select: { name: true, profileImage: true } }
          }
        }
      }
    });

    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

// POST /api/events/:id/rsvp - RSVP to a free event
router.post('/:id/rsvp', async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = (req as any).user?.uid; // Assumes AuthGuard middleware sets req.user

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Mock successful RSVP
    res.json({ success: true, message: 'RSVP confirmed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to RSVP' });
  }
});

export default router;
