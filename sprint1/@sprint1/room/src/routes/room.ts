import { Router } from 'express';
import * as roomController from '../controllers/room_controller';

const router = Router();

router.post('/rooms', roomController.createRoom);
router.get('/rooms', roomController.getRooms);
router.get('/rooms/:id', roomController.getRoomById);
router.put('/rooms/:id', roomController.updateRoom);
router.delete('/rooms/:id', roomController.deleteRoom);

export default router; 