const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(feedbacks);
  } catch (err) {
    next(err);
  }
};

exports.createFeedback = async (req, res, next) => {
  try {
    const { name, message, rating } = req.body;
    const feedback = await prisma.feedback.create({
      data: { name, message, rating: parseInt(rating) },
    });
    res.status(201).json(feedback);
  } catch (err) {
    next(err);
  }
};
