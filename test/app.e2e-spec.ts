import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/basic-report/employment-letter/1')
      .expect(200)
      .expect('Content-Type', /pdf/);
    //.expect('Hello World!');
  });

  it('/ (GET 404)', () => {
    return request(app.getHttpServer())
      .get('/basic-report/employment-letter/100000')
      .expect(404);
    //.expect('Hello World!');
  });

  it('/ (GET 400)', () => {
    return request(app.getHttpServer())
      .get('/basic-report/employment-letter/test')
      .expect(400);
    //.expect('Hello World!');
  });
});
