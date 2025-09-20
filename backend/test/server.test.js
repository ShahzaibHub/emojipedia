const request = require('supertest');
const app = require('../server');

describe('GET /api/emojis', () => {
  it('should return all emojis', async () => {
    const res = await request(app).get('/api/emojis');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return filtered emojis when search query is used', async () => {
    const res = await request(app).get('/api/emojis?search=dog');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].name.toLowerCase()).toContain('dog');
  });
});

