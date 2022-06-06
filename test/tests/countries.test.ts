const debug = require('debug')('et:test:countries');
import supertest from 'supertest';
import dotenv from 'dotenv';
import path from 'path';
import routes from '../lib/routes';
import { Countries } from '../types/index';
import { Country } from '../../src/common/types';

dotenv.config({
  path: path.join(__dirname, '../../../.env'),
});

const host =
  process.env.HOST || process.env.PORT
    ? `localhost:${process.env.PORT}`
    : 'localhost:3000';
debug('HOST', host);

const request = supertest(host);

let countries: Countries = routes.countries;

const filter = { de: 'de', and: 'and' };
const order = { asc: 'asc', desc: 'desc', whatever: 'whatever' };

describe('Countries suite', () => {
  describe('GET', () => {
    it('should get all countries', async () => {
      await request
        .get(countries.getAll)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).not.toHaveLength(0);
        });
    });

    it(`should get filtered countries by 'filter' query`, async () => {
      // Setup
      let expectedArray: Country[];

      await request
        .get(countries.getAll)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).not.toHaveLength(0);
          expect(
            res.body.filter(
              (e: Country) =>
                e.country.toLowerCase().includes(filter.and) ||
                e.code.toLowerCase().includes(filter.and)
            )
          ).not.toBe(undefined);
          expectedArray = res.body.filter(
            (e: Country) =>
              e.country.toLowerCase().includes(filter.and) ||
              e.code.toLowerCase().includes(filter.and)
          );
        });

      // Test
      await request
        .get(countries.getFiltered(filter.and))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          expect(res.body).toEqual(expectedArray);
        });
    });

    it(`should get ordered countries by 'order' query 'asc'`, async () => {
      // Setup
      let expectedArray: Country[];

      await request
        .get(countries.getAll)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).not.toHaveLength(0);
          expect(res.body.sort((a: Country, b: Country) => a.vat - b.vat)).not.toBe(
            undefined
          );
          expectedArray = res.body.sort((a: Country, b: Country) => a.vat - b.vat);
        });

      // Test
      await request
        .get(countries.getOrdered(order.asc))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          expect(res.body).toEqual(expectedArray);
        });
    });

    it(`should get ordered countries by 'order' query 'desc'`, async () => {
      // Setup
      let expectedArray: Country[];

      await request
        .get(countries.getAll)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).not.toHaveLength(0);
          expect(res.body.sort((a: Country, b: Country) => b.vat - a.vat)).not.toBe(
            undefined
          );
          expectedArray = res.body.sort((a: Country, b: Country) => b.vat - a.vat);
        });

      // Test
      await request
        .get(countries.getOrdered(order.desc))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          expect(res.body).toEqual(expectedArray);
        });
    });

    it(`should get 422 with the 'order' query different from 'asc' or 'desc'`, async () => {
      await request
        .get(countries.getOrdered(order.whatever))
        .expect(422);
    });

    it(`should get filtered countries by 'filter' query and ordered by 'order' query 'asc'`, async () => {
      // Setup
      let expectedArray: Country[];

      await request
        .get(countries.getAll)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).not.toHaveLength(0);
          expect(
            res.body
              .filter(
                (e: Country) =>
                  e.country.toLowerCase().includes(filter.de) ||
                  e.code.toLowerCase().includes(filter.de)
              )
              .sort((a: Country, b: Country) => a.vat - b.vat)
          ).not.toBe(undefined);
          expectedArray = res.body
            .filter(
              (e: Country) =>
                e.country.toLowerCase().includes(filter.de) ||
                e.code.toLowerCase().includes(filter.de)
            )
            .sort((a: Country, b: Country) => a.vat - b.vat);
        });

      // Test
      await request
        .get(countries.getFilteredAndOrdered(filter.de, order.asc))
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
