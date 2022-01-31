import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as faker from 'faker';
import { reset, set } from 'mockdate';
import * as request from 'supertest';

import { AppModule } from '../../../src/app.module';
import { GetUsuarioDto } from '../../../src/usuario/get-usuario.dto';

describe('@GET /usuarios', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });

  it('should return BadRequestException if provided data not pass on validation pipe', async () => {
    await request(app.getHttpServer())
      .get(`/usuario`)
      .expect(({ body, status }) => {
        expect(status).toBe(HttpStatus.BAD_REQUEST);
        expect(body.message).toStrictEqual([
          'usuario should not be empty',
          'usuario must be a string',
          'usuario must be shorter than or equal to 200 characters',
          'usuario must be longer than or equal to 2 characters',
        ]);
      });
  });

  it('should return false if user is already registered', async () => {
    const getUsuarioDto: GetUsuarioDto = {
      usuario: `${faker.name.firstName()} ${faker.name.lastName()}`,
    };

    await request(app.getHttpServer()).get(`/usuario`).send(getUsuarioDto);
    await request(app.getHttpServer())
      .get(`/usuario`)
      .send(getUsuarioDto)
      .expect(({ body }) => {
        expect(body).toStrictEqual({ positivo: false });
      });
  });

  it('should return true if user is not already registered', async () => {
    const getUsuarioDto: GetUsuarioDto = {
      usuario: `${faker.name.firstName()} ${faker.name.lastName()}`,
    };
    await request(app.getHttpServer())
      .get(`/usuario`)
      .send(getUsuarioDto)
      .expect(({ body }) => {
        expect(body).toStrictEqual({ positivo: true });
      });
  });

  it('should return true if 90 days passes after user is registered', async () => {
    const getUsuarioDto: GetUsuarioDto = {
      usuario: `${faker.name.firstName()} ${faker.name.lastName()}`,
    };
    await request(app.getHttpServer()).get(`/usuario`).send(getUsuarioDto);
    const fakeDate = new Date().setUTCDate(new Date().getDate() + 91);
    set(fakeDate);
    await request(app.getHttpServer())
      .get(`/usuario`)
      .send(getUsuarioDto)
      .expect(({ body }) => {
        expect(body).toStrictEqual({ positivo: true });
      });
    reset();
  });
});
