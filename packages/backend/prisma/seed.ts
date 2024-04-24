/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      id: 'user1',
      username: 'user1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'user2',
      username: 'user2',
    },
  });

  const users = [user1, user2];

  for (let i = 1; i <= 20; i++) {
    await prisma.thread.create({
      data: {
        title: `Thread ${i}`,
        userId: users[Math.floor(Math.random() * users.length)].id,
      },
    });
  }

  const allThreads = await prisma.thread.findMany();

  for (let i = 1; i <= 20; i++) {
    await prisma.post.create({
      data: {
        content: `Post ${i}`,
        threadId: allThreads[Math.floor(Math.random() * allThreads.length)].id,
        userId: users[Math.floor(Math.random() * users.length)].id,
      },
    });
  }
}

main()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
