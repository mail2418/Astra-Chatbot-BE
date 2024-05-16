const carListService = require("../services/carlist_service")

class carListController {
    async getListCarsByCriteria(req:any,res:any) {
        try{
            // console.log(req.body.sessionInfo.parameters)
            const parameters = req.body.sessionInfo.parameters
            const carType:string = parameters.cartype || "Honda"
            const carMerk:string = parameters.carmerk || "Jazz"
            let kmStart = parameters.kmstart || "20.000"
            let carPrice = parameters.carprice || "200"
            const carYear:number = parseInt(parameters.caryear) || 2020

            kmStart = parseInt(kmStart.split(" ")[0].replace(".",""))
            carPrice = parseInt(carPrice.split(" ")[0].concat("000000"))

            const jsonResponse = await carListService.getListCarByCriteria(carType,carMerk,carPrice,carYear,kmStart)
            return res.send(jsonResponse)
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
    async getDetailCarById(req:any,res:any){
        try{
            const id = req.params.id
            const carLists = await carListService.getDetailCarById(id)
            return res.status(200).json({
                "messages": "success get detail of car",
                "status":200,
                "data":carLists
            })
        }catch(err){
            console.log(err)
            return res.status(404).json({
                "messages": "error occured in get detail of car",
                "status":404,
            })
        }
    }
}

module.exports = new carListController()