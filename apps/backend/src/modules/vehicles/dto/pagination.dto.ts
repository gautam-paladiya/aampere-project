import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min, Max, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1; // Default to page 1 if not provided

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit: number = 9; // Default to limit 10 if not provided

  @IsOptional()
  @Type(() => String)
  @IsString()
  search: string = '';
}
