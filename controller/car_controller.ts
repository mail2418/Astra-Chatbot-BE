const carService = require("../services/car_service")

class carController {
    async getCars(req:any,res:any) {
        try{
            const cars = await carService.getCarType()
            return res.status(200).json({
                "messages": "success get cars",
                "status":200,
                "data":cars
            })
        }catch(err){
            console.log(err)
            return res.status(404).json({
                "messages": "error occured in get cars",
                "status":404,
            })
        }
    }
}

module.exports = new carController()