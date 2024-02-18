import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @ApiProperty({ description: 'name of application' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
