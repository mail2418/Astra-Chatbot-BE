import type { Router } from "express";
const express = require("express")
// Import the loan controller which contains the handler functions for the routes
const loanController = require("../controller/loan_controller")

class loanRoutes {
    router: Router
    constructor(){
        // Create a new router instance from Express
        this.router = express.Router()
        // Initialize the routes by calling the initRoutes method
        this.initRoutes()
    }
    initRoutes(){
        this.router.post('/getloancars', loanController.getLoanCalculation)
    }
}

module.exports = new loanRoutes().router