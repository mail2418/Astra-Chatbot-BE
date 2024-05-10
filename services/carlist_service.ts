const carListRepo = require('../repository/carlist_repository');

class carListService{
    async getListCarByCriteria(carType:string,carMerk:string,carPrice:any,carYear:any,kmStart:any){
        return await carListRepo.getListCarByCriteria(
            carType, 
            carMerk, 
            carPrice, 
            carYear, 
            kmStart
        )
    }
    async getListCar(){
        return await carListRepo.getListCar()
    }
}

module.exports = new carListService()