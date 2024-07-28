import { IsOptional, IsString } from 'class-validator';

export class EditBookDto {
  @IsOptional()
  @IsString()
  title: string;
}
