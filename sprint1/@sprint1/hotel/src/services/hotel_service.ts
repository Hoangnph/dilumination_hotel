import { Hotel } from '../models/hotel';
import { getDbConnection } from '../utils/db';

export async function createHotel(data: Partial<Hotel>): Promise<Hotel> {
  const conn = await getDbConnection();
  const [result] = await conn.execute(
    `INSERT INTO hotels (name, address, description, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())`,
    [data.name, data.address, data.description || null]
  );
  const id = (result as any).insertId;
  const [rows] = await conn.execute('SELECT * FROM hotels WHERE id = ?', [id]);
  await conn.end();
  return (rows as Hotel[])[0];
}

export async function getHotels(): Promise<Hotel[]> {
  const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT * FROM hotels');
  await conn.end();
  return rows as Hotel[];
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  const conn = await getDbConnection();
  const [rows] = await conn.execute('SELECT * FROM hotels WHERE id = ?', [id]);
  await conn.end();
  return (rows as Hotel[])[0] || null;
}

export async function updateHotel(id: number, data: Partial<Hotel>): Promise<Hotel | null> {
  const conn = await getDbConnection();
  await conn.execute(
    `UPDATE hotels SET name = COALESCE(?, name), address = COALESCE(?, address), description = ?, updated_at = NOW() WHERE id = ?`,
    [data.name ?? null, data.address ?? null, data.description ?? null, id]
  );
  const [rows] = await conn.execute('SELECT * FROM hotels WHERE id = ?', [id]);
  await conn.end();
  return (rows as Hotel[])[0] || null;
}

export async function deleteHotel(id: number): Promise<boolean> {
  const conn = await getDbConnection();
  const [result] = await conn.execute('DELETE FROM hotels WHERE id = ?', [id]);
  await conn.end();
  return (result as any).affectedRows > 0;
} 