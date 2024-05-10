const carListService = require("../services/carlist_service")

class carListController {
    async getListCarsByCriteria(req:any,res:any) {
        try{
            console.log(req.query)

            const carMerk:string = req.query.cartype || "Honda"
            const carType:string = req.query.carmerk || "Jazz"
            let kmStart = req.query.kmstart || 200000
            let carPrice = req.query.carprice || 1000000
            const carYear:number = parseInt(req.query.caryear) || 2015

            kmStart = parseInt(kmStart.split(" ")[0].replace(".",""))
            carPrice = parseInt(carPrice.split(" ")[0].concat("000000"))

            const carLists = await carListService.getListCarByCriteria(carType,carMerk,carPrice,carYear,kmStart)
            // return res.status(200).json({
            //     "messages": "success get list of cars by criteria",
            //     "status":200,
            //     "data":carLists
            // })
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