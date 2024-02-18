import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDTO } from 'src/util/pagination.dto';

export class FilterApplicationDto extends PaginationDTO {
  @ApiProperty({ description: 'filter applications by partial name' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;
}
