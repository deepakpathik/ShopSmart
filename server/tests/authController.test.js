const { signup, login } = require('../src/controllers/authController');
const prisma = require('../src/config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/config/db', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn()
  }
}));

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        email: 'test@shopsmart.com',
        password: 'password123'
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('returns 400 if email or password missing', async () => {
      mockReq.body.email = null;
      await signup(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Email and password are required' });
    });

    it('returns 409 if user already exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: '1', email: 'test@shopsmart.com' });
      await signup(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(409);
    });

    it('creates user and returns token on success', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashed_pwd');
      prisma.user.create.mockResolvedValue({ id: 'user1', email: 'test@shopsmart.com' });
      jwt.sign.mockReturnValue('fake_jwt_token');

      await signup(mockReq, mockRes);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: { email: 'test@shopsmart.com', password: 'hashed_pwd' }
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'fake_jwt_token',
        user: { id: 'user1', email: 'test@shopsmart.com' }
      });
    });
  });

  describe('login', () => {
    it('returns 400 if fields missing', async () => {
      mockReq.body.password = null;
      await login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('returns 401 on invalid user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      await login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('returns 401 on password mismatch', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'user1', password: 'hashed_pwd' });
      bcrypt.compare.mockResolvedValue(false);
      await login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(401);
    });

    it('returns token on valid credentials', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'user1', email: 'test@shopsmart.com', password: 'hashed_pwd' });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake_jwt_token');

      await login(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        token: 'fake_jwt_token',
        user: { id: 'user1', email: 'test@shopsmart.com' }
      });
    });
  });
});
