const request = require('supertest');
const app = require('../app'); // Import your Express app

describe('Authentication Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('username', 'testuser');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('error', 'Invalid credentials');
  });
});