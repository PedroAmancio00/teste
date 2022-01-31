import { Injectable } from '@nestjs/common';
import { CachePersistance } from './cache';

const myCache = new CachePersistance(60 * 60 * 24 * 90);

@Injectable()
export class UsuarioService {
  async getUsuario(usuario: string): Promise<boolean> {
    const value = await myCache.getSync(usuario);
    if (value === undefined) {
      await myCache.putSync(usuario, { noventena: true });
      return true;
    } else {
      return false;
    }
  }
}
