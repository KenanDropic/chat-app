import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  take?: number = 10;

  @Transform(({ obj }) => (obj.page - 1) * obj.take)
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(50)
  skip?: number = (this.page - 1) * this.take;
}
