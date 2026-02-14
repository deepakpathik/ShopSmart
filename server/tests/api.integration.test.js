const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/db');

jest.mock('../src/config/db', () => ({
  user: {
    create: jest.fn(),
    findUnique: jest.fn()
  }
}));

describe('API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('returns 200 health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toEqual('ok');
    });
  });

  describe('POST /api/auth/signup', () => {
    it('returns 201 when valid signup data is provided', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue({ id: 'int_usr_1', email: 'test_integration@shopsmart.com' });
      
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'test_integration@shopsmart.com', password: 'password123' });
        
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toEqual('test_integration@shopsmart.com');
    });
  });
});
