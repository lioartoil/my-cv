import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a sign-up request', () => {
    const email = 'test2@test.com';

    return request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email, password: 'P@ssw0rd' })
      .expect(201)
      .then(({ body }) => {
        expect(body.id).toBeDefined();
        expect(body.email).toEqual(email);
      });
  });

  it('sign-up as a new user then get the currently logged in user', async () => {
    const email = 'test@test.com';
    const response = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email, password: 'P@ssW0rd' })
      .expect(201);

    const cookie = response.get('Set-Cookie');
    const { body } = await request(app.getHttpServer())
      .get('/auth/who-am-i')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
