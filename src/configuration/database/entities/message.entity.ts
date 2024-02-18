import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsDateString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { ApplicationEntity } from './application.entity';

@Entity({ name: 'message', schema: 'public' })
export class MessageEntity extends BaseEntity {
  @ApiProperty({ description: 'Message ID' })
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Text of message' })
  @IsNotEmpty()
  @MaxLength(100)
  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  text: string;

  @ApiProperty({ description: 'Message actived' })
  @IsBoolean()
  @Column('boolean', {
    nullable: false,
    default: true,
  })
  actived: boolean;

  @ApiProperty({ description: 'Message created date' })
  @IsDateString()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({ description: 'Message updated date' })
  @IsDateString()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.messages)
  @JoinColumn()
  user: UserEntity;

  @ManyToOne(() => ApplicationEntity, (applicationEntity) => applicationEntity.messages)
  @JoinColumn()
  application: ApplicationEntity;
}
