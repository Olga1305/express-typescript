const { request, routes } = require('../lib');
const debug = require('debug')('et:test:append');

const start = 'hello';
const end = 'bye';

describe('Append strings suite', () => {
  describe('GET', () => {
    it(`should add to the start of the array the string you provide in the query 'start'`, async () => {
      // Setup
      let expectedArray;

      await request
        .get(routes.append.appendToStartAndToEnd('', ''))
        .expect(200)
        .then((res) => {
          debug(res.body);
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);

          expectedArray = res.body;
          expectedArray.unshift(start);
        });

      // Test
      await request
        .get(routes.append.appendToStart(start))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          jestExpect(res.body).toEqual(expectedArray);
        });
    });

    it(`should add to the end of the array the string you provide in the query 'end'`, async () => {
      // Setup
      let expectedArray;

      await request
        .get(routes.append.appendToStartAndToEnd('', ''))
        .expect(200)
        .then((res) => {
          debug(res.body);
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);

          expectedArray = res.body;
          expectedArray.push(end);
        });

      // Test
      await request
        .get(routes.append.appendToEnd(end))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          jestExpect(res.body).toEqual(expectedArray);
        });
    });

    it('should add to the start and to the end of the array the string you provide in the queries', async () => {
      // Setup
      let expectedArray;

      await request
        .get(routes.append.appendToStartAndToEnd('', ''))
        .expect(200)
        .then((res) => {
          debug(res.body);
          jestExpect(Array.isArray(res.body)).toBe(true);
          jestExpect(res.body).not.toHaveLength(0);

          expectedArray = res.body;
          expectedArray.unshift(start);
          expectedArray.push(end);
        });

      // Test
      await request
        .get(routes.append.appendToStartAndToEnd(start, end))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          jestExpect(res.body).toEqual(expectedArray);
        });
    });

    // it('should get 404 with empty string', async () => {
    //   await request.get(routes.reverse('')).expect(404);
    // });
  });
});
