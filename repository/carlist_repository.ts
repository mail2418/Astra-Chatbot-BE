const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

class carListRepository {
  async getListCarByCriteria(carType:string,carMerk:string,carPrice:any,carYear:any,kmStart:any) {
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
              lte: kmStart
            },
            car: {
              carType: carType,
              carMerk: carMerk
            }
          },
          include:{
            car:true
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
        const carList = await prisma.carList.findMany();
        return carList
    } catch (e) {
        console.error("Error in GET list of cars", e);
        throw e;
    }
  }
  async getDetailCarById(id:string){
    try {
      const carPrice = await prisma.carList.findUnique({
        where:{
          id:id
        },
        include:{
          car:true
        }
      });
      return carPrice
    }catch(e){
      console.error("Error in GET car detail by Id", e);
      throw e;
    }
  }
}
module.exports = new carListRepository()