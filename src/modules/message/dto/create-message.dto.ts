import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ description: 'text of message' })
  @IsNotEmpty()
  @IsString()
  text: string;
}
