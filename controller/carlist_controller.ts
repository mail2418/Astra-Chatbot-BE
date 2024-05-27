// Import the car List services module which contains the business logic for list of cars 
const carListService = require("../services/carlist_service")

// Define the carListController class
class carListController {
    async getListCarsByCriteria(req:any,res:any) {
        try{
            // req.body.sessionInfo.parameters are parameters from dialogflow
            const parameters = req.body.sessionInfo.parameters
            const carType:string = parameters.cartype || "Honda"
            const carMerk:string = parameters.carmerk || "Jazz"
            let kmStart = parameters.kmstart || "20.000"
            let carPrice = parameters.carprice || "200"
            const carYear:number = parseInt(parameters.caryear) || 2020

            kmStart = parseInt(kmStart.split(" ")[0].replace(".",""))
            let carPriceCondition = carPrice.split(" ")

            if(carPriceCondition.length > 1){
                let result_calculation = 0
                let i = 0
                while(i < carPriceCondition.length){
                    if(carPriceCondition[i+1] == "miliar" || carPriceCondition[i+1] === "milyar"){
                        result_calculation += parseInt(carPriceCondition[i].concat("000000000"))
                    }
                    else if(carPriceCondition[i+1] == "juta"){
                        result_calculation += parseInt(carPriceCondition[i].concat("000000"))
                    }  
                    i = i + 2
                }
                carPrice = result_calculation
            }
            else{
                carPrice = parseInt("534.000.000".replace(/\./g, ""))
            }
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