const carListService = require("../services/carlist_service")

class carListController {
    async getListCarsByCriteria(req:any,res:any) {
        try{
            console.log(req.body)

            const carType:any = req.params.carType
            const carMerk:any = req.params.carMerk
            const kmStart:any = req.params.kmStart
            const kmEnd:any = req.params.kmEnd
            const carPrice:any = req.params.carPrice
            const carYear:any = req.params.carYear

            const carLists = await carListService.getListCarByCriteria()
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