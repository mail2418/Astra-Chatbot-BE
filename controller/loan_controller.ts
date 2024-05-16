const loanServices = require('../services/loan_service')
class loanController{
    async getLoanCalculation(req:any,res:any) {
        try{
            // console.log(req.body)
            const parameters = req.body.sessionInfo.parameters
            const tenure = parameters.number | 1
            const carId = parameters.carid
            const carsLoanMessages = await loanServices.getLoanCalculation(carId,tenure)
            console.log(carsLoanMessages)
            res.status(200).send(carsLoanMessages)
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