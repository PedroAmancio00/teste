import * as faker from 'faker';
import { reset, set } from 'mockdate';

import { UsuarioService } from '../../../src/usuario/usuario.service';

describe('CreateUser', () => {
  const sut = new UsuarioService();
  it('should return false if user is already registered ', async () => {
    const params = `${faker.name.firstName()} ${faker.name.lastName()}`;
    await sut.getUsuario(params);
    await expect(sut.getUsuario(params)).resolves.toBe(false);
  });

  it('should return true if user is not already registered ', async () => {
    const params = `${faker.name.firstName()} ${faker.name.lastName()}`;
    await expect(sut.getUsuario(params)).resolves.toBe(true);
  });

  it('should return true if 90 days passes after user is registered ', async () => {
    const params = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const fakeDate = new Date().setUTCDate(new Date().getDate() + 91);
    set(fakeDate);
    await expect(sut.getUsuario(params)).resolves.toBe(true);
    reset();
  });
});
