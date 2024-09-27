const request = require('supertest');
const app = require('../app'); // Import the app directly

describe('Todo API', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(0, () => {
      console.log(`Test server running on port ${server.address().port}`);
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('GET /api/todos should return an array of todos', async () => {
    const res = await request(server).get('/api/todos');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('POST /api/todos should create a new todo', async () => {
    const res = await request(server)
      .post('/api/todos')
      .send({ text: 'Test todo' });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.text).toEqual('Test todo');
  });

  // You can add more test cases here
});