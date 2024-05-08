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
        const carPrice = carListRepo.getCarPriceById(id)
        const interest = (6 + (tenure * 0.5))/100
        const principalAmount = carPrice - (carPrice * this.dpPercentage)
        const downPaymentPrice = carPrice - principalAmount
        const monthlyPayment = ((tenure * interest * principalAmount) + principalAmount)/ (tenure * 12)
        const initialCost = downPaymentPrice + monthlyPayment + (carPrice * this.insuranceRisk) + (carPrice * this.tloPercentage)
    }
}

module.exports = new loanServices()