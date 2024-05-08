const carListRepo = require('../repository/carlist_repository');

class carListService{
    async getListCarByCriteria(){
        return carListRepo.getListCarByCriteria()
    }
    async getListCar(){
        return carListRepo.getListCar()
    }
}

module.exports = new carListService()