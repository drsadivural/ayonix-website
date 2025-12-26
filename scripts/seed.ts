import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create admin test user
  const hashedPassword = await bcrypt.hash('johndoe123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      name: 'John Doe',
      company: 'Ayonix AI',
      role: 'admin',
    },
  });

  console.log('Admin user created:', adminUser.email);

  // Create sample contact inquiries
  const inquiry1 = await prisma.contactInquiry.create({
    data: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      company: 'TechCorp Inc.',
      message:
        'Interested in learning more about your healthcare AI solutions for our hospital network.',
      status: 'new',
    },
  });

  const inquiry2 = await prisma.contactInquiry.create({
    data: {
      name: 'Michael Chen',
      email: 'mchen@financeplus.com',
      company: 'FinancePlus',
      message:
        'Would like to schedule a demo of your AI agents for financial services.',
      status: 'new',
    },
  });

  console.log('Sample inquiries created');

  // Create news posts
  const newsData = [
    {
      title: 'Ayonix Launches Next-Gen AI Assistant',
      description: 'Introducing our latest AI model with improved accuracy and performance, setting new standards in enterprise AI solutions.',
      content: 'Our next-generation AI Assistant represents a breakthrough in enterprise artificial intelligence. With enhanced natural language processing capabilities, improved contextual understanding, and faster response times, this new model sets new industry standards for AI-powered business solutions.',
      category: 'Product Launch',
      imageUrl: '/images/news-ai-assistant-launch.jpg',
      sourceUrl: 'https://ayonix.com/company/news',
      publishedAt: new Date('2024-03-15'),
    },
    {
      title: 'Strategic Partnership with Global Tech Leader',
      description: 'Announcing strategic partnership to expand AI solutions worldwide, enhancing our global presence and technological capabilities.',
      content: 'Ayonix is proud to announce a strategic partnership with a leading global technology company. This collaboration will enable us to expand our AI solutions to new markets, enhance our technological capabilities, and deliver even greater value to our clients worldwide.',
      category: 'Partnership',
      imageUrl: '/images/news-partnership-announcement.jpg',
      sourceUrl: 'https://ayonix.com/company/news',
      publishedAt: new Date('2024-03-10'),
    },
    {
      title: 'Innovation Award 2024',
      description: 'Ayonix recognized for outstanding innovation in AI technology at the International Tech Awards 2024.',
      content: 'We are honored to receive the Innovation Award 2024 at the International Tech Awards ceremony. This recognition reflects our commitment to pushing the boundaries of AI technology and delivering innovative solutions that transform businesses worldwide.',
      category: 'Recognition',
      imageUrl: '/images/news-innovation-award-2024.jpg',
      sourceUrl: 'https://ayonix.com/company/news',
      publishedAt: new Date('2024-03-05'),
    },
    {
      title: 'New Research Breakthrough in Face Recognition',
      description: 'Our research team achieves breakthrough in facial recognition accuracy, pushing boundaries of AI technology.',
      content: 'Ayonix research team has achieved a significant breakthrough in facial recognition technology, reaching new levels of accuracy and performance. This advancement will enable more reliable and secure biometric authentication systems for our enterprise clients.',
      category: 'Research',
      imageUrl: '/images/news-face-recognition-research.jpg',
      sourceUrl: 'https://ayonix.com/company/news',
      publishedAt: new Date('2024-02-28'),
    },
  ];

  for (const news of newsData) {
    await prisma.newsPost.create({
      data: news,
    });
  }

  console.log('News posts created');
  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
