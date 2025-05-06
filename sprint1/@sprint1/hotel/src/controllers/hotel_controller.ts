import { Request, Response } from 'express';
import * as hotelService from '../services/hotel_service';

export async function createHotel(req: Request, res: Response) {
  const hotel = await hotelService.createHotel(req.body);
  res.status(201).json(hotel);
}

export async function getHotels(req: Request, res: Response) {
  const hotels = await hotelService.getHotels();
  res.json(hotels);
}

export async function getHotelById(req: Request, res: Response) {
  const hotel = await hotelService.getHotelById(Number(req.params.id));
  if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
  res.json(hotel);
}

export async function updateHotel(req: Request, res: Response) {
  const hotel = await hotelService.updateHotel(Number(req.params.id), req.body);
  if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
  res.json(hotel);
}

export async function deleteHotel(req: Request, res: Response) {
  const ok = await hotelService.deleteHotel(Number(req.params.id));
  if (!ok) return res.status(404).json({ message: 'Hotel not found' });
  res.status(204).send();
} 