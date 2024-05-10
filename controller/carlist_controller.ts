const carListService = require("../services/carlist_service")

class carListController {
    async getListCarsByCriteria(req:any,res:any) {
        try{
            console.log(req.body)

            const carType:string = "Toyota"
            const carMerk:string = "Avanza"
            const kmStart:number = 40000
            const kmEnd:number = 45000
            const carPrice:number = 225000000
            const carYear:number = 2020

            const carLists = await carListService.getListCarByCriteria(carType,carMerk,carPrice,carYear,kmStart)
            return res.status(200).json({
                "messages": "success get list of cars by criteria",
                "status":200,
                "data":carLists
            })
        }catch(err){
            console.log(err)
            return res.status(404).json({
                "messages": "error occured in get list of cars by criteria",
                "status":404,
            })
        }
    }
    async getListCars(req:any,res:any){
        try{
            const carLists = await carListService.getListCar()
            return res.status(200).json({
                "messages": "success get list of cars",
                "status":200,
                "data":carLists
            })
        }catch(err){
            console.log(err)
            return res.status(404).json({
                "messages": "error occured in get list of cars",
                "status":404,
            })
        }
    }
}

module.exports = new carListController()