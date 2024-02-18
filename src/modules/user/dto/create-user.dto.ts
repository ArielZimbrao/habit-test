import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { RoleUserEnum } from 'src/util/enum/role.enum';

export class CreateUserDto {
  @ApiProperty({ description: 'name of user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'email of user' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'password of user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'application of user' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  applicationId?: string;

  @ApiProperty({ description: 'role of user', enum: RoleUserEnum })
  @IsNotEmpty()
  @IsEnum(RoleUserEnum)
  role: RoleUserEnum;
}
