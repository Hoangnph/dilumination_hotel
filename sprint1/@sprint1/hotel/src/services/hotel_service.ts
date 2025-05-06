import { Hotel } from '../models/hotel';

let hotels: Hotel[] = [];
let idCounter = 1;

export async function createHotel(data: Partial<Hotel>): Promise<Hotel> {
  const now = new Date();
  const hotel: Hotel = {
    id: idCounter++,
    name: data.name!,
    address: data.address!,
    description: data.description,
    created_at: now,
    updated_at: now
  };
  hotels.push(hotel);
  return hotel;
}

export async function getHotels(): Promise<Hotel[]> {
  return hotels;
}

export async function getHotelById(id: number): Promise<Hotel | null> {
  return hotels.find(h => h.id === id) || null;
}

export async function updateHotel(id: number, data: Partial<Hotel>): Promise<Hotel | null> {
  const hotel = hotels.find(h => h.id === id);
  if (!hotel) return null;
  if (data.name) hotel.name = data.name;
  if (data.address) hotel.address = data.address;
  if (data.description !== undefined) hotel.description = data.description;
  hotel.updated_at = new Date();
  return hotel;
}

export async function deleteHotel(id: number): Promise<boolean> {
  const idx = hotels.findIndex(h => h.id === id);
  if (idx === -1) return false;
  hotels.splice(idx, 1);
  return true;
} 