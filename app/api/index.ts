import express from 'express';
import app from '../../server/src/index';

// Dummy usage to ensure Vercel sees Express is imported
const _dummy = express;

export default function handler(req: any, res: any) {
  return app(req, res);
}
