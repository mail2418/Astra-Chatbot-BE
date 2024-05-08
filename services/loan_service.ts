const carListRepo  = require('../repository/carlist_repository');

class loanServices{
    insuranceRisk:number
    dpPercentage:number
    tloPercentage:number
    constructor(){
        this.dpPercentage = 0.2
        this.insuranceRisk = 0.042
        this.tloPercentage = 0.0056
    }
    async getLoanCalculation(id:string,tenure:number){
        const Months = tenure * 12
        const carPriceData = await carListRepo.getCarPriceById(id)
        const carPrice = carPriceData.carPrice
        // return carPrice
        const interest = (6 + ((tenure) * 0.5))/100
        const principalAmount = carPrice - (carPrice * this.dpPercentage)
        const downPaymentPrice = carPrice - principalAmount
        const monthlyPayment = (((tenure) * interest * principalAmount) + principalAmount)/ (tenure * 12)
        console.log(downPaymentPrice)
        const initialCost = downPaymentPrice + monthlyPayment + (carPrice * this.insuranceRisk) + (carPrice * this.tloPercentage)
        let total_cost = initialCost
        let fulfillmentResponse:any = {}
        let allMessages = []
        let message
        for (let i = 1; i <= Months; i++) {
            if (i == 1){
                message = {
                    "text": {
                        "text":[`Pembayaran Awal : Rp${initialCost.toLocaleString("id-ID")} | Total Tenure : ${tenure} Bulan | Monthly Payment : Rp${monthlyPayment.toLocaleString("id-ID")}`]
                    }
                }
                allMessages.push(message)
                continue
            }
            message = {
                "text": {
                    "text":[`Pembayaran bulan ke-${i} menjadi Rp${total_cost.toLocaleString("id-ID")} + Rp${monthlyPayment.toLocaleString("id-ID")} = Rp${(total_cost + monthlyPayment).toLocaleString("id-ID")}`]
                }
            }
            total_cost += monthlyPayment
            allMessages.push(message)
        }
        fulfillmentResponse["messages"] = allMessages
        return {
            "fulfillment_response":fulfillmentResponse
        }
    }
}

module.exports = new loanServices()