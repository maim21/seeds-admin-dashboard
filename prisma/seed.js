const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  //Seed Users with varied roles and dates
  await prisma.user.createMany({
    data: [
      { email: 'admin@seeds.com', role: 'admin', createdAt: new Date('2024-10-01') },
      { email: 'instructor1@seeds.com', role: 'instructor', createdAt: new Date('2025-01-10') },
      { email: 'instructor2@seeds.com', role: 'instructor', createdAt: new Date('2025-02-20') },
      { email: 'student1@seeds.com', role: 'student', createdAt: new Date('2025-07-21') },
      { email: 'student2@seeds.com', role: 'student', createdAt: new Date('2025-07-22') },
      { email: 'student3@seeds.com', role: 'student', createdAt: new Date('2025-07-23') },
      { email: 'student4@seeds.com', role: 'student', createdAt: new Date('2025-07-17') },
      { email: 'student5@seeds.com', role: 'student', createdAt: new Date('2025-06-30') },
    ],
  });

  //Seed Courses
  await prisma.course.createMany({
    data: [
      {
        title: 'Introduction to React',
        instructor: 'instructor1@seeds.com',
        enrolled: 30,
        status: 'Active',
        createdAt: new Date('2025-06-10'),
      },
      {
        title: 'Next.js Fundamentals',
        instructor: 'instructor1@seeds.com',
        enrolled: 22,
        status: 'Draft',
        createdAt: new Date('2025-07-01'),
      },
      {
        title: 'Data Structures in JS',
        instructor: 'instructor2@seeds.com',
        enrolled: 18,
        status: 'Active',
        createdAt: new Date('2025-07-15'),
      },
      {
        title: 'Firebase Authentication 101',
        instructor: 'instructor1@seeds.com',
        enrolled: 40,
        status: 'Published',
        createdAt: new Date('2025-07-20'),
      },
      {
        title: 'Tailwind CSS Masterclass',
        instructor: 'instructor2@seeds.com',
        enrolled: 15,
        status: 'Active',
        createdAt: new Date('2025-07-23'),
      },
      {
        title: 'Fullstack with Prisma',
        instructor: 'instructor2@seeds.com',
        enrolled: 12,
        status: 'Published',
        createdAt: new Date('2025-07-24'),
      },
      {
        title: 'Effective Debugging in React',
        instructor: 'instructor1@seeds.com',
        enrolled: 19,
        status: 'Draft',
        createdAt: new Date('2025-07-10'),
      },
    ],
  });
}

main()
  .then(() => console.log('Seed data inserted'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
