// Import the loan services module which contains the business logic for loan calculations
const loanServices = require('../services/loan_service');

// Define the loanController class
class loanController {
    // Define an asynchronous method to handle loan calculation requests
    async getLoanCalculation(req: any, res: any) {
        try {
            // req.body.sessionInfo.parameters are parameters from dialogflow
            const parameters = req.body.sessionInfo.parameters;
            const tenure = parameters.number || 1;
            const carId = parameters.carid;
            const carsLoanMessages = await loanServices.getLoanCalculation(carId, tenure);
            res.status(200).send(carsLoanMessages);
        } catch (err) {
            console.log(err);
            // Send a response with status 404 (Not Found) and an error message
            return res.status(404).json({
                "messages": "error occurred in get loan cars",
                "status": 404,
            });
        }
    }
}
module.exports = new loanController();