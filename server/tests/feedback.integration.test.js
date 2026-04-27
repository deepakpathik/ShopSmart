const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Feedback API Integration', () => {
  const testFeedback = {
    name: 'Integration Test User',
    message: 'Integration test message',
    rating: 5,
  };

  beforeAll(async () => {
    // Clean up before starting
    await prisma.feedback.deleteMany({
      where: { name: 'Integration Test User' },
    });
  });

  afterAll(async () => {
    // Final cleanup
    await prisma.feedback.deleteMany({
      where: { name: 'Integration Test User' },
    });
    await prisma.$disconnect();
  });

  it('POST /api/feedback should save feedback to DB', async () => {
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
    const res = await request(app).get('/api/feedback');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    const found = res.body.find((f) => f.name === testFeedback.name);
    expect(found).toBeDefined();
  });
});
