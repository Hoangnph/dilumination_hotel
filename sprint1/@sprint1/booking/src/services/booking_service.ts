import { BookingModel } from '../models/booking.model';
import { Op } from 'sequelize';

export async function create_booking({ user_id, room_id, checkin, checkout, status }: {
  user_id: number;
  room_id: number;
  checkin: string;
  checkout: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}): Promise<BookingModel> {
  // Kiểm tra phòng trống
  const overlap = await BookingModel.findOne({
    where: {
      room_id,
      status: { [Op.ne]: 'cancelled' },
      [Op.or]: [
        { checkin: { [Op.lte]: checkin }, checkout: { [Op.gt]: checkin } },
        { checkin: { [Op.lt]: checkout }, checkout: { [Op.gte]: checkout } },
        { checkin: { [Op.gte]: checkin }, checkout: { [Op.lte]: checkout } }
      ]
    }
  });
  if (overlap) throw new Error('Room is not available');
  return BookingModel.create({ user_id, room_id, checkin, checkout, status });
}

export async function get_bookings(): Promise<BookingModel[]> {
  return BookingModel.findAll();
}

export async function get_booking_by_id({ id }: { id: number }): Promise<BookingModel | null> {
  return BookingModel.findByPk(id);
}

export async function update_booking({ id, ...data }: Partial<BookingModel> & { id: number }): Promise<BookingModel | null> {
  const booking = await BookingModel.findByPk(id);
  if (!booking) return null;
  await booking.update({ ...data });
  return booking;
}

export async function delete_booking({ id }: { id: number }): Promise<boolean> {
  const deleted = await BookingModel.destroy({ where: { id } });
  return deleted > 0;
}

export async function reset_bookings(): Promise<void> {
  await BookingModel.destroy({ where: {}, truncate: true });
} 