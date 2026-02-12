const { createUser, getUsers } = require('../src/controllers/userController');
const prisma = require('../src/config/db');

jest.mock('../src/config/db', () => ({
  user: {
    create: jest.fn(),
    findMany: jest.fn()
  }
}));

describe('User Controller', () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should return 400 if email is omitted', async () => {
      await createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(400);
    });

    it('should return 201 on success', async () => {
      mockReq.body.email = 'new@shopsmart.com';
      prisma.user.create.mockResolvedValue({ id: '1', email: 'new@shopsmart.com' });
      await createUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({ id: '1', email: 'new@shopsmart.com' });
    });
  });

  describe('getUsers', () => {
    it('returns 200 with list of users', async () => {
      const users = [{ id: '1', email: 'test@shopsmart.com' }];
      prisma.user.findMany.mockResolvedValue(users);
      
      await getUsers(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(users);
    });
  });
});
