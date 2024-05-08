import type { Router } from "express";
const express = require("express")
const loanController = require("../controller/loan_controller")

class loanRoutes {
    router: Router
    constructor(){
        this.router = express.Router()
        this.initRoutes()
    }
    initRoutes(){
        this.router.get('/getloancars', loanController.getLoanCalculation)
    }
}

module.exports = new loanRoutes().router