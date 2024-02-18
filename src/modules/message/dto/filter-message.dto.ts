import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/util/pagination.dto';

export class FilterMessageDto extends PaginationDTO {
  @ApiProperty({ description: 'filter message by application' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  applicationId?: string;

  @ApiProperty({ description: 'filter message by user' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  userId?: string;
}
