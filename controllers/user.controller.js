import logger from '../logger/logger.js';
import { User } from '../models/user.model.js';

export const getUser = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    logger.error('User id is required');

    return res.status(400).json({ message: 'User id is required' });
  }

  logger.info(`Get user request received for id: ${userId}`);

  const existingUser = await User.findOne({ _id: userId });

  if (!existingUser) {
    logger.error(`User does not exist for id: ${userId}`);

    return res.status(400).json({ message: 'User does not exist' });
  }

  res.json({ email: existingUser.email });
};
