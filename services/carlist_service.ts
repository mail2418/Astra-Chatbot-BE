const carListRepo = require('../repository/carlist_repository');

class carListService{
    async getListCarByCriteria(carType:string,carMerk:string,carPrice:any,carYear:any,kmStart:any){
        console.log(carType)
        const carLists = await carListRepo.getListCarByCriteria(
            carType, 
            carMerk, 
            carPrice, 
            carYear, 
            kmStart
        )
        let fulfillmentResponse:any = {
            "messages": []
        }
        if (carLists.length == 0) {
            let message = {
                text: {
                    text: ["Maaf tidak ada mobil yang sesuai dengan kriteria yang anda cari"],
                },
            }
            fulfillmentResponse["messages"].push(message)
            return {fulfillmentResponse}
        }
        Object.keys(carLists).forEach((key) => {
            let message = {
                payload:{
                    "richContent": [
                        [
                          {
                            "type": "image",
                            "rawUrl": carLists[key].carPhoto,
                            "accessibilityText": `${carLists[key].car.carType} ${carLists[key].car.carMerk}`,
                          }
                        ]
                    ]
                }
            }
            fulfillmentResponse["messages"].push(message)
        });
        return {fulfillmentResponse}
    }
    async getListCar(){
        return await carListRepo.getListCar()
    }
}

module.exports = new carListService()