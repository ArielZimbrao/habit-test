import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDateString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationEntity } from './application.entity';

@Entity({ name: 'user', schema: 'public' })
export class UserEntity extends BaseEntity {
  @ApiProperty({ description: 'User ID' })
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'User name' })
  @IsNotEmpty()
  @MaxLength(100)
  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  name: string;

  @ApiProperty({ description: 'User email' })
  @IsNotEmpty()
  @MaxLength(100)
  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  email: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @MaxLength(100)
  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  password: string;

  @ApiProperty({ description: 'User actived' })
  @IsBoolean()
  @Column('boolean', {
    nullable: false,
    default: true,
  })
  actived: boolean;

  @ApiProperty({ description: 'User last sigin' })
  @IsDateString()
  @Column('timestamp', { nullable: true })
  last_sigin: Date;

  @ApiProperty({ description: 'User created date' })
  @IsDateString()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'User updated date' })
  @IsDateString()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({ description: 'User role' })
  @IsNotEmpty()
  @MaxLength(10)
  @Column('varchar', {
    length: 10,
    nullable: false,
  })
  role: string;

  @ManyToOne(() => ApplicationEntity, (applicationEntity) => applicationEntity.users, {
    nullable: true,
  })
  @JoinColumn()
  application?: ApplicationEntity | null;
}
