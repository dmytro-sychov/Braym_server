import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import logger from '../logger/logger.js';

export const signup = async (req, res) => {
  const { email, password } = req.body;

  logger.info(`Signup request received for email: ${email}`);

  if (email.length > 4 && password.length > 8) {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      logger.error(`User already exists for email: ${email}`);

      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '1h' });

    res.cookie('authToken', token, { maxAge: 3600000 });

    res.status(200).json({ message: 'Signup successful' });
  } else {
    logger.error(`Signup failed for email: ${email}`);

    res.status(400).json({ message: 'Signup failed' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  logger.info(`Login request received for email: ${email}`);

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    logger.error(`User does not exist for email: ${email}`);

    return res.status(400).json({ message: 'User does not exist' });
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);

  if (passwordMatch) {
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: existingUser.id }, jwtSecret, { expiresIn: '1h' });

    res.cookie('authToken', token, { maxAge: 3600000 });

    res.status(200).json({ message: 'Login successful' });
  } else {
    logger.error(`Invalid email or password for email: ${email}`);

    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const logout = (_, res) => {
  res.clearCookie('authToken');
  res.status(200).json({ message: 'Logout successful' });
};
