const loanServices = require('../services/loan_service')
class loanController{
    async getLoanCalculation(req:any,res:any) {
        try{
            const id = "337ac555-f2ef-4168-94a3-f90c220ae604"
            const tenure = 1 // 1 Bulan
            // console.log(req.body)
            // const carId : any = req.params.carId
            // const tenure : any = req.params.tenure
            const carsLoanMessages = await loanServices.getLoanCalculation(id,tenure)
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