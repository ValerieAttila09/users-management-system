import { PrismaClient } from "../app/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  console.log("🗑️  Clearing existing data...");
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  console.log("✅ Existing data cleared");

  console.log("👤 Creating 25 users...");
  const users = [];

  for (let i = 0; i < 25; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        createdAt: faker.date.past({ years: 2 }),
      },
    });
    users.push(user);
    console.log(`   Created user ${i + 1}/25: ${user.name}`);
  }

  console.log("📝 Creating profiles...");
  for (let i = 0; i < users.length; i++) {
    await prisma.profile.create({
      data: {
        userId: users[i].id,
        bio: faker.lorem.paragraph(),
        hobby: faker.helpers.arrayElement([ "Reading", "Gaming", "Cooking", "Traveling", "Photography", "Music", "Sports", "Art", "Writing", "Coding", ]),
        createdAt: faker.date.past({ years: 1 }),
      },
    });
    console.log(`   Created profile ${i + 1}/${users.length}`);
  }

  console.log("📄 Creating posts...");
  const posts = [];
  let postCount = 0;

  for (const user of users) {
    const numPosts = faker.number.int({ min: 3, max: 5 });
    
    for (let i = 0; i < numPosts; i++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(faker.number.int({ min: 2, max: 5 })),
          authorId: user.id,
          createdAt: faker.date.past({ years: 1 }),
        },
      });
      posts.push(post);
      postCount++;
    }
  }
  console.log(`   Created ${postCount} posts`);

  console.log("💬 Creating comments...");
  let commentCount = 0;

  for (const post of posts) {
    const numComments = faker.number.int({ min: 2, max: 7 });
    
    for (let i = 0; i < numComments; i++) {
      await prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          authorId: faker.helpers.arrayElement(users).id,
          postId: post.id,
          createdAt: faker.date.past({ years: 1 }),
        },
      });
      commentCount++;
    }
  }
  console.log(`   Created ${commentCount} comments`);

  console.log("\n✅ Seed completed successfully!");
  console.log(`📊 Summary:`);
  console.log(`   - Users: 25`);
  console.log(`   - Profiles: 25`);
  console.log(`   - Posts: ${postCount}`);
  console.log(`   - Comments: ${commentCount}`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
