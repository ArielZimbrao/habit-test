import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({ description: 'itens per page for filter' })
  @IsNotEmpty()
  @IsOptional()
  numPerPage = 10;

  @ApiProperty({ description: 'current page for filter' })
  @IsNotEmpty()
  @IsOptional()
  currentPage = 1;
}
