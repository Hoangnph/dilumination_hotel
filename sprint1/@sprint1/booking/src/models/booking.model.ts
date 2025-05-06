import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface BookingCreation {
  user_id: number;
  room_id: number;
  checkin: string;
  checkout: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

@Table({ tableName: 'bookings', timestamps: true })
export class BookingModel extends Model<BookingModel, BookingCreation> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  room_id!: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  checkin!: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  checkout!: string;

  @Column({ type: DataType.ENUM('pending', 'confirmed', 'cancelled'), allowNull: false })
  status!: 'pending' | 'confirmed' | 'cancelled';

  @CreatedAt
  @Column({ type: DataType.DATE })
  created_at!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE })
  updated_at!: Date;
} 