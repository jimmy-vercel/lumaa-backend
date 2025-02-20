const request = require('supertest');
const app = require('../app'); // Import your Express app

let authToken; // Store the JWT token for authenticated requests

describe('Task Endpoints', () => {
  beforeAll(async () => {
    // Log in to get a token before running the tests
    const res = await request(app)
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword',
      });
    authToken = res.body.token;
  });

  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Task',
        description: 'This is a test task',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'Test Task');
  });

  it('should retrieve a list of tasks', async () => {
    const res = await request(app)
      .get('/tasks')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should update a task', async () => {
    const createRes = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Task to Update',
        description: 'This task will be updated',
      });

    const taskId = createRes.body.id;

    const updateRes = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Updated Task',
        isComplete: true,
      });
    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body).toHaveProperty('title', 'Updated Task');
    expect(updateRes.body).toHaveProperty('isComplete', true);
  });

  it('should delete a task', async () => {
    const createRes = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Task to Delete',
        description: 'This task will be deleted',
      });

    const taskId = createRes.body.id;

    const deleteRes = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${authToken}`);
    expect(deleteRes.statusCode).toEqual(204);
  });
});