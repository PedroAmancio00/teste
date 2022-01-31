import { Body, Controller, Get, ValidationPipe } from '@nestjs/common';
import { GetUsuarioDto } from './get-usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async getUsuario(
    @Body(ValidationPipe) getUsuarioDto: GetUsuarioDto,
  ): Promise<{ positivo: boolean }> {
    return {
      positivo: await this.usuarioService.getUsuario(getUsuarioDto.usuario),
    };
  }
}
