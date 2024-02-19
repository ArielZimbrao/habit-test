import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/util/pagination.dto';

@ApiExtraModels(PaginationDTO)
export class FilterUserDto extends PaginationDTO {
  @ApiProperty({ description: 'filter user by partial email' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'filter user by partial name' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'filter user by application' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  applicationId?: string;
}
