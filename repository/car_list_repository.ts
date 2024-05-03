import { PrismaClient } from "@prisma/client/extension";
const prismaClient = new PrismaClient();

class CarListRepository {
    async getPriceCar(carId: string) {
        try{
            
        }catch(e){
            console.error('Error in GET Price Car', e);
            throw e;
        }
    }
}