import { Router } from 'express';

const router = Router();

// GET /api/groups - List local groups
router.get('/', async (req, res) => {
  try {
    // Mock groups
    const groups = [
      { id: '1', name: 'Saheed Nagar Residents', members: 450, type: 'Ward' },
      { id: '2', name: 'Bhubaneswar Football Club', members: 120, type: 'Interest' },
      { id: '3', name: 'Smart City Startup Network', members: 85, type: 'Professional' }
    ];
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
});

// POST /api/groups/:id/join - Join a group
router.post('/:id/join', async (req, res) => {
  try {
    res.json({ success: true, message: 'Joined group successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join group' });
  }
});

export default router;
