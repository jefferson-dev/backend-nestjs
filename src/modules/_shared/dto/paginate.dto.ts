import { IsOptional, IsString } from 'class-validator';

export class PaginateDTO {
  @IsString()
  @IsOptional()
  skip?: string;

  @IsString()
  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  sort?: string;
}
