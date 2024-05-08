const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

class carListRepository {
  async getListCarByCriteria() {
    try {
      const carList = await prisma.carList.findMany({

      });
      return carList
    } catch (e) {
      console.error("Error in GET list of cars by criteria", e);
      throw e;
    }
  }
  async getListCar() {
    try {
      const carList = await prisma.carList.findMany();
      return carList
    } catch (e) {
      console.error("Error in GET list of cars", e);
      throw e;
    }
  }
}
module.exports = new carListRepository()