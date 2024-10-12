import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create 5 tags
  const tagNames = ['JavaScript', 'TypeScript', 'Prisma', 'PostgreSQL', 'Node.js'];
  const tags = await Promise.all(tagNames.map(name => prisma.tag.upsert({
    where: { name },
    update: {},
    create: { name },
  })));

  // Create 10 accounts (users)
  const accounts = await Promise.all(Array.from({ length: 10 }).map((_, i) => prisma.account.upsert({
    where: { email: `user${i + 1}@example.com` },
    update: {},
    create: {
      email: `user${i + 1}@example.com`,
      name: `User ${i + 1}`,
      username: `user${i + 1}`,
      karma: Math.floor(Math.random() * 100),
    },
  })));

  // Create 15 questions, each with 0-2 answers and 1-5 tags
  for (let i = 1; i <= 15; i++) {
    const question = await prisma.question.create({
      data: {
        title: `Question ${i}`,
        content: `This is the content of question ${i}.`,
        author: { connect: { id: accounts[Math.floor(Math.random() * accounts.length)].id } },
        tags: {
          connect: tags
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 5) + 1)
            .map(tag => ({ id: tag.id })),
        },
      },
    });

    // Create 0-2 answers for the question
    const answerCount = Math.floor(Math.random() * 3);
    for (let j = 1; j <= answerCount; j++) {
      await prisma.answer.create({
        data: {
          content: `This is answer ${j} for question ${i}.`,
          author: { connect: { id: accounts[Math.floor(Math.random() * accounts.length)].id } },
          question: { connect: { id: question.id } },
        },
      });
    }
  }
}

main()
  .then(async () => {
    console.log('Seeding completed.');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
