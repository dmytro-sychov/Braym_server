import express from 'express';

const router = express.Router();

router.get('/ping', (_, res) => {
  res.send('pong');
});

export default router;
