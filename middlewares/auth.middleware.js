import jwt from 'jsonwebtoken';
import logger from '../logger/logger.js';

export const authenticate = (req, res, next) => {
  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    logger.error(err);

    res.status(401).json({ message: 'Invalid authentication token' });
  }
};
