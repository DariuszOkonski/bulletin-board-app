const mongoose = require('mongoose');
// const faker = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Ad = require('./models/Ad');
const { faker } = require('@faker-js/faker');

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bulletin-board-app';
const USERS_TO_CREATE = 2;
const ADS_PER_USER_MIN = 1;
const ADS_PER_USER_MAX = 5;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Helper function to generate a random number within a range
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Create a fake user
const createFakeUser = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10); // Same password for all test users

  return {
    login: faker.internet.userName(),
    password: hashedPassword,
    avatar: faker.image.avatar(),
    phone: faker.phone.number('+48 ### ### ###'),
    location: faker.location.city() + ', Poland',
  };
};

// Create a fake ad
const createFakeAd = (userId) => {
  return {
    title: faker.commerce.productName(),
    content: faker.commerce.productDescription(),
    publicationDate: faker.date.recent({ days: 30 }),
    picture: faker.image.url(),
    price: parseFloat(faker.commerce.price({ min: 10, max: 1000 })),
    location: faker.location.city() + ', Poland',
    user: userId,
  };
};

// Main seeding function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Promise.all([User.deleteMany({}), Ad.deleteMany({})]);

    console.log('🧹 Cleared existing data');

    // Create users
    const users = [];
    for (let i = 0; i < USERS_TO_CREATE; i++) {
      const userData = await createFakeUser();
      const user = await User.create(userData);
      users.push(user);
      console.log(`👤 Created user: ${user.login}`);

      // Create random number of ads for each user
      const adsToCreate = randomNumber(ADS_PER_USER_MIN, ADS_PER_USER_MAX);
      for (let j = 0; j < adsToCreate; j++) {
        const adData = createFakeAd(user._id);
        const ad = await Ad.create(adData);
        console.log(`📢 Created ad: ${ad.title} for user ${user.login}`);
      }
    }

    console.log('✅ Database seeding completed!');
    console.log(`Created ${users.length} users`);
    const adsCount = await Ad.countDocuments();
    console.log(`Created ${adsCount} ads`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close database connection
    await mongoose.disconnect();
    console.log('📋 Database connection closed');
  }
};

// Run the seeder
console.log('🌱 Starting database seed...');
seedDatabase();
