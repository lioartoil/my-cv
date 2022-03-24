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
});
