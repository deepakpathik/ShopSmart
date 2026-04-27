jest.mock('../src/config/db', () => ({
  feedback: {
    deleteMany: jest.fn(),
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
  },
}));

const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/db');

describe('Feedback API Integration', () => {
  const testFeedback = {
    name: 'Integration Test User',
    message: 'Integration test message',
    rating: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('POST /api/feedback should save feedback to DB', async () => {
    prisma.feedback.create.mockResolvedValue({ id: '1', ...testFeedback });
    prisma.feedback.findFirst.mockResolvedValue({ id: '1', ...testFeedback });

    const res = await request(app).post('/api/feedback').send(testFeedback);

    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual(testFeedback.name);

    // Verify it exists in the database
    const dbFeedback = await prisma.feedback.findFirst({
      where: { name: testFeedback.name },
    });
    expect(dbFeedback).not.toBeNull();
    expect(dbFeedback.message).toEqual(testFeedback.message);
  });

  it('GET /api/feedback should retrieve feedbacks including the new one', async () => {
    prisma.feedback.findMany.mockResolvedValue([{ id: '1', ...testFeedback }]);
    const res = await request(app).get('/api/feedback');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find((f) => f.name === testFeedback.name);
    expect(found).toBeDefined();
  });
});
