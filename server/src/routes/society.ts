import { Router } from 'express';

const router = Router();

// GET /api/society/notices - List RWA notices
router.get('/notices', async (req, res) => {
  try {
    const notices = [
      { id: '1', title: 'Water Supply Interruption', date: '25 Aug', description: 'No water from 10 AM to 2 PM due to tank cleaning.' },
      { id: '2', title: 'Ganesh Puja Contribution', date: '22 Aug', description: 'Please submit your contribution of ₹500 to the Secretary.' }
    ];
    res.json(notices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

// GET /api/society/visitors - List visitor logs (Guard portal)
router.get('/visitors', async (req, res) => {
  try {
    const visitors = [
      { id: '1', name: 'Amazon Delivery', flat: 'A-204', time: '10:30 AM', status: 'Inside' },
      { id: '2', name: 'Plumber', flat: 'B-101', time: '09:15 AM', status: 'Left' }
    ];
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

export default router;
