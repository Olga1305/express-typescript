const debug = require('debug')('et:test:append');
import supertest from 'supertest';
import dotenv from 'dotenv';
import path from 'path';
import routes from '../lib/routes';
import { Append } from '../types/index';

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

const host =
  process.env.HOST || process.env.PORT
    ? `localhost:${process.env.PORT}`
    : 'localhost:3000';
debug('HOST', host);

const request = supertest(host);

const start = 'hello';
const end = 'bye';

let append: Append = routes.append;

describe('Append strings suite', () => {
  describe('GET', () => {
    it(`should add to the start of the array the string you provide in the query 'start'`, async () => {
      // Setup
      let expectedArray: string[];

      await request
        .get(append.appendToStartAndToEnd('', ''))
        .expect(200)
        .then((res) => {
          debug(res.body);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).not.toHaveLength(0);

          expectedArray = res.body;
          expectedArray.unshift(start);
        });

      // Test
      await request
        .get(append.appendToStart(start))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          expect(res.body).toEqual(expectedArray);
        });
    });

    it(`should add to the end of the array the string you provide in the query 'end'`, async () => {
      // Setup
      let expectedArray: string[];

      await request
        .get(append.appendToStartAndToEnd('', ''))
        .expect(200)
        .then((res) => {
          debug(res.body);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).not.toHaveLength(0);

          expectedArray = res.body;
          expectedArray.push(end);
        });

      // Test
      await request
        .get(append.appendToEnd(end))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          expect(res.body).toEqual(expectedArray);
        });
    });

    it('should add to the start and to the end of the array the string you provide in the queries', async () => {
      // Setup
      let expectedArray: string[];

      await request
        .get(append.appendToStartAndToEnd('', ''))
        .expect(200)
        .then((res) => {
          debug(res.body);
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).not.toHaveLength(0);

          expectedArray = res.body;
          expectedArray.unshift(start);
          expectedArray.push(end);
        });

      // Test
      await request
        .get(append.appendToStartAndToEnd(start, end))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          expect(res.body).toEqual(expectedArray);
        });
    });
  });
});
