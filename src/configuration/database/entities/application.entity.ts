import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDateString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

@Entity({ name: 'application', schema: 'public' })
export class ApplicationEntity extends BaseEntity {
  @ApiProperty({ description: 'Application ID' })
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Application name' })
  @IsNotEmpty()
  @MaxLength(100)
  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  name: string;

  @ApiProperty({ description: 'Application actived' })
  @IsBoolean()
  @Column('boolean', {
    nullable: false,
    default: true,
  })
  actived: boolean;

  @ApiProperty({ description: 'Application created date' })
  @IsDateString()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Application updated date' })
  @IsDateString()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => UserEntity, (userEntity) => userEntity.application)
  @JoinColumn()
  users: UserEntity[];
}
