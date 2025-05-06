import { Router } from 'express';
import { registerUser, loginUser, verifyToken } from '../services/auth_service';

const router = Router();

// Đăng ký (customer)
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  try {
    const user = await registerUser({ name, email, password });
    res.status(201).json(user);
  } catch (e) {
    res.status(409).json({ error: 'Email already exists' });
  }
});

// Đăng nhập
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  const result = await loginUser(email, password);
  if (!result) return res.status(401).json({ error: 'Invalid credentials' });
  res.json(result);
});

// Verify token
router.post('/verify', (req, res) => {
  const { token } = req.body;
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid token' });
  res.json(payload);
});

export default router; 