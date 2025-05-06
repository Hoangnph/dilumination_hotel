import { Room } from '../models/room';

let rooms: Room[] = [];
let idCounter = 1;

export async function createRoom(data: Partial<Room>): Promise<Room> {
  const now = new Date();
  const room: Room = {
    id: idCounter++,
    hotel_id: data.hotel_id!,
    type: data.type!,
    price: data.price!,
    status: data.status || 'available',
    created_at: now,
    updated_at: now
  };
  rooms.push(room);
  return room;
}

export async function getRooms(): Promise<Room[]> {
  return rooms;
}

export async function getRoomById(id: number): Promise<Room | null> {
  return rooms.find(r => r.id === id) || null;
}

export async function updateRoom(id: number, data: Partial<Room>): Promise<Room | null> {
  const room = rooms.find(r => r.id === id);
  if (!room) return null;
  if (data.type) room.type = data.type;
  if (data.price !== undefined) room.price = data.price;
  if (data.status) room.status = data.status;
  room.updated_at = new Date();
  return room;
}

export async function deleteRoom(id: number): Promise<boolean> {
  const idx = rooms.findIndex(r => r.id === id);
  if (idx === -1) return false;
  rooms.splice(idx, 1);
  return true;
} 