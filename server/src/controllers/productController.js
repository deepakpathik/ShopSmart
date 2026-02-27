const prisma = require('../config/db');

const createProduct = async (req, res, next) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || price === undefined) {
      return res.status(400).json({ error: 'Title, description, and price are required' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        imageUrl,
        sellerId: req.user.id
      },
      include: { seller: { select: { id: true, name: true, email: true } } }
    });

    return res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { search } = req.query;

    const where = search
      ? { title: { contains: search, mode: 'insensitive' } }
      : {};

    const products = await prisma.product.findMany({
      where,
      include: { seller: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getTopProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { seller: { select: { id: true, name: true, email: true } } }
    });

    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price } = req.body;

    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (req.user.role !== 'ADMIN' && existing.sellerId !== req.user.id) {
      return res.status(403).json({ error: 'You can only update your own products' });
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : existing.imageUrl;

    const product = await prisma.product.update({
      where: { id },
      data: {
        title: title || existing.title,
        description: description || existing.description,
        price: price !== undefined ? parseFloat(price) : existing.price,
        imageUrl
      },
      include: { seller: { select: { id: true, name: true, email: true } } }
    });

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (req.user.role !== 'ADMIN' && existing.sellerId !== req.user.id) {
      return res.status(403).json({ error: 'You can only delete your own products' });
    }

    await prisma.product.delete({ where: { id } });

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getTopProducts,
  updateProduct,
  deleteProduct
};
