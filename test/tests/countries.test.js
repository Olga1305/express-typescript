const { request, routes } = require('../lib');
const debug = require('debug')('et:test:countries');

const filter = { de: 'de', and: 'and' };
const order = { asc: 'asc', desc: 'desc', whatever: 'whatever' };

describe('Countries suite', () => {
  describe('GET', () => {
    it('should get all countries', async () => {
      await request
        .get(routes.countries.getAll)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body).to.be.an('array');
          jestExpect(res.body).not.toHaveLength(0);
        });
    });

    it(`should get filtered countries by 'filter' query`, async () => {
      // Setup
      let expectedArray;

      await request
        .get(routes.countries.getAll)
        .expect(200)
        .then((res) => {
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);
          jestExpect(
            res.body.filter(
              (e) =>
                e.country.toLowerCase().includes(filter.and) ||
                e.code.toLowerCase().includes(filter.and)
            )
          ).not.toBe(undefined);
          expectedArray = res.body.filter(
            (e) =>
              e.country.toLowerCase().includes(filter.and) ||
              e.code.toLowerCase().includes(filter.and)
          );
        });

      // Test
      await request
        .get(routes.countries.getFiltered(filter.and))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          jestExpect(res.body).toEqual(expectedArray);
        });
    });

    it(`should get ordered countries by 'order' query 'asc'`, async () => {
      // Setup
      let expectedArray;

      await request
        .get(routes.countries.getAll)
        .expect(200)
        .then((res) => {
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);
          jestExpect(res.body.sort((a, b) => a.vat - b.vat)).not.toBe(
            undefined
          );
          expectedArray = res.body.sort((a, b) => a.vat - b.vat);
        });

      // Test
      await request
        .get(routes.countries.getOrdered(order.asc))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          jestExpect(res.body).toEqual(expectedArray);
        });
    });

    it(`should get ordered countries by 'order' query 'desc'`, async () => {
      // Setup
      let expectedArray;

      await request
        .get(routes.countries.getAll)
        .expect(200)
        .then((res) => {
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);
          jestExpect(res.body.sort((a, b) => b.vat - a.vat)).not.toBe(
            undefined
          );
          expectedArray = res.body.sort((a, b) => b.vat - a.vat);
        });

      // Test
      await request
        .get(routes.countries.getOrdered(order.desc))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          jestExpect(res.body).toEqual(expectedArray);
        });
    });

    it(`should get 422 with the 'order' query different from 'asc' or 'desc'`, async () => {
      await request
        .get(routes.countries.getOrdered(order.whatever))
        .expect(422);
    });

    it(`should get filtered countries by 'filter' query and ordered by 'order' query 'asc'`, async () => {
      // Setup
      let expectedArray;

      await request
        .get(routes.countries.getAll)
        .expect(200)
        .then((res) => {
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);
          jestExpect(
            res.body
              .filter(
                (e) =>
                  e.country.toLowerCase().includes(filter.de) ||
                  e.code.toLowerCase().includes(filter.de)
              )
              .sort((a, b) => a.vat - b.vat)
          ).not.toBe(undefined);
          expectedArray = res.body
            .filter(
              (e) =>
                e.country.toLowerCase().includes(filter.de) ||
                e.code.toLowerCase().includes(filter.de)
            )
            .sort((a, b) => a.vat - b.vat);
        });

      // Test
      await request
        .get(routes.countries.getFilteredAndOrdered(filter.de, order.asc))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          jestExpect(res.body).toEqual(expectedArray);
        });
    });
  });
});
