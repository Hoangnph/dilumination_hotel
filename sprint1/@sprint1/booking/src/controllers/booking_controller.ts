import { Request, Response } from 'express';
import {
  create_booking,
  get_bookings,
  get_booking_by_id,
  update_booking,
  delete_booking
} from '../services/booking_service';
import Joi from 'joi';

const bookingSchema = Joi.object({
  user_id: Joi.number().integer().required(),
  room_id: Joi.number().integer().required(),
  checkin: Joi.string().isoDate().required(),
  checkout: Joi.string().isoDate().required(),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled').required()
});

const bookingUpdateSchema = Joi.object({
  user_id: Joi.number().integer(),
  room_id: Joi.number().integer(),
  checkin: Joi.string().isoDate(),
  checkout: Joi.string().isoDate(),
  status: Joi.string().valid('pending', 'confirmed', 'cancelled')
}).min(1);

export async function post_booking(req: Request, res: Response) {
  const { error } = bookingSchema.validate(req.body);
  if (error) return res.status(400).json({ error: 'Invalid input', details: error.details });
  try {
    const booking = await create_booking(req.body);
    res.status(201).json(booking);
  } catch (err: any) {
    if (err.message === 'Room is not available') return res.status(409).json({ error: err.message });
    res.status(400).json({ error: err.message });
  }
}

export async function get_all_bookings(req: Request, res: Response) {
  const bookings = await get_bookings();
  res.json(bookings);
}

export async function get_booking(req: Request, res: Response) {
  const booking = await get_booking_by_id({ id: Number(req.params.id) });
  if (!booking) return res.status(404).json({ error: 'Not found' });
  res.json(booking);
}

export async function put_booking(req: Request, res: Response) {
  const { error } = bookingUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: 'Invalid input', details: error.details });
  const booking = await update_booking({ id: Number(req.params.id), ...req.body });
  if (!booking) return res.status(404).json({ error: 'Not found' });
  res.json(booking);
}

export async function delete_booking_ctrl(req: Request, res: Response) {
  const ok = await delete_booking({ id: Number(req.params.id) });
  if (!ok) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
} 