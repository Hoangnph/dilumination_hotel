import { Router } from 'express';
import * as hotelController from '../controllers/hotel_controller';

const router = Router();

router.post('/hotels', hotelController.createHotel);
router.get('/hotels', hotelController.getHotels);
router.get('/hotels/:id', hotelController.getHotelById);
router.put('/hotels/:id', hotelController.updateHotel);
router.delete('/hotels/:id', hotelController.deleteHotel);

export default router; 