const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

class carListRepository {
  async getListCarByCriteria(carType:string,carMerk:string,carPrice:any,carYear:any,kmStart:any) {
    console.log(carType,carMerk,carPrice,carYear,kmStart)
    try {
        const carList = await prisma.carList.findMany({
          where: {
            carPrice: {
              lte: carPrice
            },
            carYear: {
              lt: carYear + 5,
              gte: carYear
            },
            kmStart: {
              gte: kmStart
            },
            car: {
              carType: carType,
              carMerk: carMerk
            }
          },
          take: 3
        });
        return carList
    } catch (e) {
        console.error("Error in GET list of cars by criteria", e);
        throw e;
    }
  }
  async getListCar() {
    try {
        const carList = await prisma.carList.findMany({
        });
        return carList
    } catch (e) {
        console.error("Error in GET list of cars", e);
        throw e;
    }
  }
  async getCarPriceById(id:string){
    try {
      const carPrice = await prisma.carList.findUnique({
        where:{
          id:id
        },
        select:{
          carPrice: true
        }
      });
      return carPrice
    }catch(err){

    }
  }
}
module.exports = new carListRepository()