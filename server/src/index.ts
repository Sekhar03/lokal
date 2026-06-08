import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import feedRoutes from './routes/feed';
import eventsRouter from './routes/events';
import groupsRouter from './routes/groups';
import societyRouter from './routes/society';
import marketRouter from './routes/market';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/feed', feedRoutes);
app.use('/api/events', eventsRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/society', societyRouter);
app.use('/api/market', marketRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
