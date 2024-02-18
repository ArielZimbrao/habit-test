import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PasswordRecoveryCode {
  @ApiProperty({ description: 'email that identify the user' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'code sended by email to recovery password' })
  @IsNotEmpty()
  code: string;
}
