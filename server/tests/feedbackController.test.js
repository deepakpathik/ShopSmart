const { getFeedbacks, createFeedback } = require('../src/controllers/feedbackController');
const { PrismaClient } = require('@prisma/client');

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  const mPrisma = {
    feedback: {
      findMany: jest.fn(),
      create: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

const prisma = new PrismaClient();

describe('Feedback Controller', () => {
  let mockReq;
  let mockRes;
  let next;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('getFeedbacks', () => {
    it('should return a list of feedbacks', async () => {
      const mockData = [{ id: '1', name: 'Test', message: 'Hi', rating: 5 }];
      prisma.feedback.findMany.mockResolvedValue(mockData);

      await getFeedbacks(mockReq, mockRes, next);

      expect(prisma.feedback.findMany).toHaveBeenCalled();
      expect(mockRes.json).toHaveBeenCalledWith(mockData);
    });

    it('should call next on error', async () => {
      const error = new Error('Database fail');
      prisma.feedback.findMany.mockRejectedValue(error);

      await getFeedbacks(mockReq, mockRes, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('createFeedback', () => {
    it('should create a new feedback and return 201', async () => {
      mockReq.body = { name: 'New User', message: 'Good', rating: '4' };
      const createdFeedback = { ...mockReq.body, id: '2', rating: 4 };
      prisma.feedback.create.mockResolvedValue(createdFeedback);

      await createFeedback(mockReq, mockRes, next);

      expect(prisma.feedback.create).toHaveBeenCalledWith({
        data: { name: 'New User', message: 'Good', rating: 4 },
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(createdFeedback);
    });

    it('should call next if creation fails', async () => {
      mockReq.body = { name: 'Fail', message: 'No', rating: 1 };
      const error = new Error('Create error');
      prisma.feedback.create.mockRejectedValue(error);

      await createFeedback(mockReq, mockRes, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
