'use strict';

const request = require('supertest');
const server = require('../src/app');
const app = require('../src/app');

describe('app', () => {
  it('responds with 404 for unknown path', () => {
    return request(app)
      .get('/404')
      .expect(404)
      .expect('Content-Type', 'text/html')
      .expect('Resource Not Found');
  });
  it('responds with HTML for /', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', 'text/html')
      .expect(response => {expect(response.text[0]).toBe('<');
      });
  });

  it('respond with 500 for /500', () => {
    return request(app)
      .post('/500')
      .expect(500)
      .expect('Content-Type', 'text/html')
      .expect('Test Error');
  });

  it('responds with message for POST /api/cowsay', () => {
    return request(app)
      .post('/api/cowsay')
      .send({ text: 'Craig' })
      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect(response => {
        expect(response.body).toBeDefined();
        expect(response.body.message).toMatch('Hello, Craig!');
      });
  });
  describe('api routes', () => {
    it('can get /api/cowsay', () => {
      return request(app)
        .get('/api/cowsay?text=hi')
        .expect(200)
        .expect('Content-Type', 'application/json')
        .expect(response => {
          expect(response.body).toBeDefined();
          expect(response.body.content).toMatch('hi');
        });
    });

    it('can delete /api/cowsay=deleteme', () => {
      return request(app)
        .delete('/api/cowsay?id=1')
        .expect(200)
        .expect('Content-Type', 'application/json')
        .expect({ message: `Cow number 1 is deleted` });
    });
  });


});//closes describe app
