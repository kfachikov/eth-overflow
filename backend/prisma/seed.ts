import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tagNames = ['Mathematics', 'Physics', 'Computer Science'];
  await Promise.all(tagNames.map(name => prisma.tag.upsert({
    where: { name },
    update: {},
    create: { name },
  })));
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
