import { Room } from '../models/room';
import { getDbConnection } from '../utils/db';

export async function createRoom(data: Partial<Room>): Promise<Room> {
  const conn = await getDbConnection();
  const now = new Date();
  const [result] = await conn.execute(
    `INSERT INTO rooms (hotel_id, type, price, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`,
    [data.hotel_id, data.type, data.price, data.status || 'available', now, now]
  );
  const id = (result as any).insertId;
  const [rows] = await conn.execute('SELECT * FROM rooms WHERE id = ?', [id]);
  await conn.end();
  return (rows as any[])[0] as Room;
}

export async function getRooms(): Promise<Room[]> {
  const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT * FROM rooms');
  await conn.end();
  return rows as Room[];
}

export async function getRoomById(id: number): Promise<Room | null> {
  const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT * FROM rooms WHERE id = ?', [id]);
  await conn.end();
  return (rows as any[])[0] || null;
}

export async function updateRoom(id: number, data: Partial<Room>): Promise<Room | null> {
  const conn = await getDbConnection();
  const [result] = await conn.execute(
    `UPDATE rooms SET type = COALESCE(?, type), price = COALESCE(?, price), status = COALESCE(?, status), updated_at = ? WHERE id = ?`,
    [data.type ?? null, data.price ?? null, data.status ?? null, new Date(), id]
  );
  if ((result as any).affectedRows === 0) {
    await conn.end();
    return null;
  }
  const [rows] = await conn.execute('SELECT * FROM rooms WHERE id = ?', [id]);
  await conn.end();
  return (rows as any[])[0] || null;
}

export async function deleteRoom(id: number): Promise<boolean> {
  const conn = await getDbConnection();
  const [result] = await conn.execute('DELETE FROM rooms WHERE id = ?', [id]);
  await conn.end();
  return (result as any).affectedRows > 0;
} 