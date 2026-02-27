const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@shopsmart.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN'
    }
  });

  const seller1 = await prisma.user.create({
    data: {
      email: 'priya@shopsmart.com',
      password: hashedPassword,
      name: 'Priya Electronics',
      role: 'SELLER'
    }
  });

  const seller2 = await prisma.user.create({
    data: {
      email: 'arjun@shopsmart.com',
      password: hashedPassword,
      name: 'Arjun Lifestyle',
      role: 'SELLER'
    }
  });

  const products = [
    {
      title: 'Wireless Noise-Cancelling Headphones',
      description: 'Premium over-ear headphones with 40-hour battery life and adaptive noise cancellation. Perfect for commutes and deep focus sessions.',
      price: 7999.0,
      imageUrl: '',
      sellerId: seller1.id
    },
    {
      title: 'Mechanical Keyboard RGB',
      description: 'Hot-swappable mechanical keyboard with customizable RGB backlighting and Cherry MX switches. Built for speed and comfort.',
      price: 4599.0,
      imageUrl: '',
      sellerId: seller1.id
    },
    {
      title: 'Ultra-Slim Laptop Stand',
      description: 'Ergonomic aluminum laptop stand with adjustable height. Keeps your MacBook cool and your posture straight.',
      price: 1899.0,
      imageUrl: '',
      sellerId: seller1.id
    },
    {
      title: 'Smart Fitness Watch',
      description: 'Track heart rate, sleep quality, and 20+ workout modes. Water-resistant up to 50 meters with a stunning AMOLED display.',
      price: 3499.0,
      imageUrl: '',
      sellerId: seller2.id
    },
    {
      title: 'Bamboo Desk Organizer',
      description: 'Handcrafted bamboo organizer with compartments for pens, phone, and accessories. Minimalist design that elevates any workspace.',
      price: 999.0,
      imageUrl: '',
      sellerId: seller2.id
    },
    {
      title: 'Portable Bluetooth Speaker',
      description: 'Compact waterproof speaker delivering 360-degree sound. 12-hour playtime with deep bass and crystal-clear highs.',
      price: 2299.0,
      imageUrl: '',
      sellerId: seller1.id
    },
    {
      title: 'Organic Cotton Hoodie',
      description: 'Soft and sustainable hoodie made from 100% organic cotton. Relaxed fit with a kangaroo pocket and brushed interior.',
      price: 1599.0,
      imageUrl: '',
      sellerId: seller2.id
    },
    {
      title: 'USB-C Hub 7-in-1',
      description: 'All-in-one adapter with HDMI 4K, USB 3.0, SD card reader, and 100W power delivery pass-through. Essential for modern laptops.',
      price: 2799.0,
      imageUrl: '',
      sellerId: seller1.id
    }
  ];

  await prisma.product.createMany({ data: products });

  console.log(`Seeded: 1 admin, 2 sellers, ${products.length} products`);
  console.log('Login credentials for all users: password123');
  console.log(`  Admin:   ${admin.email}`);
  console.log(`  Seller:  ${seller1.email}`);
  console.log(`  Seller:  ${seller2.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
