import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ForgotPasswordDTO {
  @ApiProperty({ description: 'email that identify the user' })
  @IsNotEmpty()
  email: string;
}
