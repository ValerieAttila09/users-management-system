# Database Seeder

This seeder file populates your database with realistic fake data using Faker.js.

## What it creates:

- **25 Users** with random names and emails
- **25 Profiles** (one per user) with random bios and hobbies
- **75-125 Posts** (3-5 posts per user) with random titles and content
- **150-875 Comments** (2-7 comments per post) from random users

## How to run:

### Option 1: Using npm script
```bash
npm run db:seed
```

### Option 2: Using Prisma CLI
```bash
npx prisma db seed
```

### Option 3: Direct execution
```bash
npx tsx prisma/seed.ts
```

## Before running:

1. Make sure you have generated Prisma Client:
   ```bash
   npx prisma generate
   ```

2. Make sure your database is set up and migrated:
   ```bash
   npx prisma migrate dev
   ```
   or
   ```bash
   npx prisma db push
   ```

## Note:

⚠️ **Warning**: This seeder will delete all existing data before creating new records!

The seeder creates realistic data including:
- Random user names and emails
- Random profile bios and hobbies
- Random post titles and content
- Random comments from various users
- Realistic timestamps for all records
