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
                                "rawUrl": `${carLists[key].carPhoto}`,
                                "accessibilityText": `${carLists[key].car.carMerk} ${carLists[key].car.carType}`,
                                "reference": {
                                    "anchor": {
                                      "href": `http://localhost:3000/item/${carLists[key].id}` 
                                    },
                                }
                            },
                            {
                                "type": "list",
                                "title": `${carLists[key].car.carMerk} ${carLists[key].car.carType}`,
                                "subtitle": `Harga Rp${carLists[key].carPrice.toLocaleString("id-ID")}`,                      
                            }
                        ],
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
    async getDetailCarById(id:string){
        return await carListRepo.getDetailCarById(id)
    }
}

module.exports = new carListService()