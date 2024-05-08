const { PrismaClient, Prisma } = require("@prisma/client");
const prisma  = new PrismaClient();

class carRepository {
  async getCarType() {
    try {
      const cars = await prisma.car.findMany();
      return cars;
    } catch (e) {
      console.error("Error in GET Type Car", e);
      throw e;
    }
  }
}

module.exports = new carRepository();