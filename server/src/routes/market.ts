import { Router } from 'express';

const router = Router();

// GET /api/market/items - List classifieds and local products
router.get('/items', async (req, res) => {
  try {
    const items = [
      { id: '1', title: 'Used Royal Enfield Classic 350', price: '₹1,20,000', seller: 'Ramesh D.', condition: 'Good' },
      { id: '2', title: 'Home-made Odia Pickles', price: '₹150 / bottle', seller: 'Sujata Kitchen', condition: 'New' },
      { id: '3', title: 'Sofa Set (3+1+1)', price: '₹8,500', seller: 'Priya M.', condition: 'Used' }
    ];
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

export default router;
