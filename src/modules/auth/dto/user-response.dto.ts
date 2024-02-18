import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserResponseDTO {
  @ApiProperty({ description: 'id that identify the user' })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'email that identify the user' })
  @IsNotEmpty()
  email: string;
}
