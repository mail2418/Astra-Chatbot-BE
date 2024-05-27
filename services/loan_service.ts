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
    async getLoanCalculation(id:string,tenure:any){
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
        let message = 
            [
                {
                    "payload":{
                        "richContent":[
                            [
                                {
                                    "type": "accordion",
                                    "title": "Hasil Perhitungan Kredit",
                                    "text": `<table><tr><th>Detail</th><th>Nilai</th></tr><tr><td>Total Tenure</td><td>${tenure} Tahun</td></tr><tr><td>Pembayaran Awal</td><td>Rp${initialCost.toLocaleString("id-ID")}</td></tr><tr></tr><tr><td>Pembayaran Perbulan</td><td>Rp${monthlyPayment.toLocaleString("id-ID")}</td></tr><tr></tr><tr><td>Total Harga Mobil</td><td>Rp${(initialCost + (monthlyPayment * (tenure * 12))).toLocaleString("id-ID")}</td></tr></table>`
                                },
                                {
                                    "type": "button",
                                    "icon": {
                                      "type": "chevron_right",
                                      "color": "#0E46A3"
                                    },
                                    "text": "Info Selanjutnya",
                                    "event": {
                                      "event": "next_action_step"
                                    }
                                }
                            ]
                        ]
                    },
                }
            ]
        fulfillmentResponse["messages"] = message
        return {
            "fulfillmentResponse":fulfillmentResponse
        }
    }
}

module.exports = new loanServices()