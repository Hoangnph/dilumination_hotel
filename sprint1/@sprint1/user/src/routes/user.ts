import { Router } from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../services/user_service';
import { requireAuth, requireRole } from '../middleware/auth';

const router = Router();

// Lấy danh sách user (admin)
router.get('/', requireAuth, requireRole('admin'), async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

// Lấy chi tiết user (admin)
router.get('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const user = await getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

// Tạo user mới (admin)
router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

// Cập nhật user (admin)
router.put('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const user = await updateUser(Number(req.params.id), req.body);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

// Xóa user (admin)
router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const ok = await deleteUser(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

export default router; 