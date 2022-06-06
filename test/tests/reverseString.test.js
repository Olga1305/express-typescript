const { request, routes } = require('../lib');
const debug = require('debug')('et:test:reverse');

const string = 'mandarin';
const expectedString = 'nIrAdnAm';

describe('Reverse string suite', () => {
  describe('GET', () => {
    it('should get reversed string with all vowels in uppercase', async () => {
      await request
        .get(routes.reverse(string))
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          debug(res.body);
          expect(res.body).to.be.an('string');
          jestExpect(res.body).toEqual(expectedString);
        });
    });

    it('should get 404 with empty string', async () => {
      await request.get(routes.reverse('')).expect(404);
    });
  });
});
