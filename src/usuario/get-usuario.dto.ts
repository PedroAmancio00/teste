import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GetUsuarioDto {
  @MinLength(2)
  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  usuario: string;
}
