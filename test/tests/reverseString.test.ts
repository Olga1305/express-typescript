const debug = require('debug')('et:test:reverse');
import supertest from 'supertest';
import dotenv from 'dotenv';
import path from 'path';
import routes from '../lib/routes';
import { Reverse } from '../types/index';

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

const host =
  process.env.HOST || process.env.PORT
    ? `localhost:${process.env.PORT}`
    : 'localhost:3000';
debug('HOST', host);

const request = supertest(host);

const string = 'mandarin';
const expectedString = 'nIrAdnAm';

let reverse: Reverse = routes.reverse;

describe('Reverse string suite', () => {
  describe('GET', () => {
    it('should get reversed string with all vowels in uppercase', async () => {
      await request
        .get(reverse.getReversedString(string))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          expect(typeof (res.body)).toBe('string');
          expect(res.body).toEqual(expectedString);
        });
    });

    it('should get 404 with empty string', async () => {
      await request.get(reverse.getReversedString('')).expect(404);
    });
  });
});
