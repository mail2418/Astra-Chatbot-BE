const loanServices = require('../services/loan_service')
class loanController{
    async getLoan(req:any,res:any) {
        try{
            // const carId : any = req.params.carId
            // const tenure : any = req.params.tenure
            const cars = await loanServices.getLoanCalculation()
            return res.status(200).json({
                "messages": "success get cars",
                "status":200,
                "data":cars
            })
        }catch(err){
            console.log(err)
            return res.status(404).json({
                "messages": "error occured in get loan cars",
                "status":404,
            })
        }
    }
}
module.exports = new loanController()