import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

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
  take?: number = 20;

  @Transform(({ obj }) => console.log(obj))
  @IsInt()
  @IsOptional()
  @Min(0)
  @Max(50)
  skip?: number = (this.page - 1) * this.take;

  @IsOptional()
  @IsString()
  username?: string = '';
}
