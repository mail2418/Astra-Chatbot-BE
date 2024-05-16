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
        let fulfillmentResponse:any = {
            "messages": [
                {
                    "payload":{
                        "richContent":[
                            
                        ]
                    }
                }
            ]
        }
        let message = {
            "type":"accordion",
            "title":"Simulasi Kredit",
            "text":""
        }
        for (let i = 1; i <= Months; i++) {
            message["text"] += (`Bulan ke-${i}: <b>Rp${(total_cost + monthlyPayment).toLocaleString("id-ID")}</b><br/>`)
            total_cost += monthlyPayment
        }
        fulfillmentResponse["messages"][0]["payload"]["richContent"].push([message])
        return {
            "fulfillment_response":fulfillmentResponse
        }
    }
}

module.exports = new loanServices()