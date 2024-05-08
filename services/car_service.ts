const carRepo  = require('../repository/car_repository');

class carServices{
    async getCarType(){
        return carRepo.getCarType()
    }
}
module.exports = new carServices()