import { Request, Response } from 'express';
import * as roomService from '../services/room_service';

export async function createRoom(req: Request, res: Response) {
  const room = await roomService.createRoom(req.body);
  res.status(201).json(room);
}

export async function getRooms(req: Request, res: Response) {
  const rooms = await roomService.getRooms();
  res.json(rooms);
}

export async function getRoomById(req: Request, res: Response) {
  const room = await roomService.getRoomById(Number(req.params.id));
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
}

export async function updateRoom(req: Request, res: Response) {
  const room = await roomService.updateRoom(Number(req.params.id), req.body);
  if (!room) return res.status(404).json({ message: 'Room not found' });
  res.json(room);
}

export async function deleteRoom(req: Request, res: Response) {
  const ok = await roomService.deleteRoom(Number(req.params.id));
  if (!ok) return res.status(404).json({ message: 'Room not found' });
  res.status(204).send();
} 