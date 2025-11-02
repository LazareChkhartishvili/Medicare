import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phone?: string;

  @Prop()
  dateOfBirth?: Date;

  @Prop({ enum: Gender })
  gender?: Gender;

  @Prop()
  profileImage?: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: true })
  isActive: boolean;

  // Doctor specific fields
  @Prop()
  specialization?: string;

  @Prop()
  licenseDocument?: string; // File path/URL for medical license (PDF or Image)

  @Prop()
  degrees?: string;

  @Prop()
  experience?: string;

  @Prop()
  consultationFee?: number;

  @Prop()
  followUpFee?: number;

  @Prop()
  about?: string;

  @Prop()
  location?: string;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
