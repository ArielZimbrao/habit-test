import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditPasswordDTO {
  @ApiProperty({ description: 'code sended by email to recovery password' })
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'password for the user' })
  @IsNotEmpty()
  password: string;
}
