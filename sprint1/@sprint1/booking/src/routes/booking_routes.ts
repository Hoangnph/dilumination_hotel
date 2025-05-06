import { Router } from 'express';
import {
  post_booking,
  get_all_bookings,
  get_booking,
  put_booking,
  delete_booking_ctrl
} from '../controllers/booking_controller';

const router = Router();

router.post('/', post_booking);
router.get('/', get_all_bookings);
router.get('/:id', get_booking);
router.put('/:id', put_booking);
router.delete('/:id', delete_booking_ctrl);

export default router; 