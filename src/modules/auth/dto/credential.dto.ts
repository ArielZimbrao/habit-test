import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CredentialDTO {
  @ApiProperty({ description: 'email that identify the user' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'password for user' })
  @IsNotEmpty()
  password: string;
}
