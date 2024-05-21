const {initializePrisma} = require('./config/prisma_config');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

const runMigrations = async () => {
  const prisma = await initializePrisma();
  try {
    await execPromise('bunx prisma migrate deploy');
    console.log('Migrations deployed successfully.');
  } catch (error) {
    console.error('Error deploying migrations:', error);
  } finally {
    await prisma.$disconnect();
  }
};

runMigrations().catch((error) => {
  console.error('Unexpected error:', error);
});