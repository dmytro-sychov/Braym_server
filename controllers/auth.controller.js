import jwt from 'jsonwebtoken';

const mockedEmail = 'test@example.com';
const mockedPassword = 'password123';

export const login = (req, res) => {
  const { email, password } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (email === mockedEmail && password === mockedPassword) {
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

    res.cookie('authToken', token, { maxAge: 3600000 });

    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

export const logout = (_, res) => {
  res.clearCookie('authToken');
  res.status(200).json({ message: 'Logout successful' });
};
