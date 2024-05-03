import type { Router } from "express";
const express = require("express")

class LoanRoutes {
    router: Router
    constructor(){
        this.router = express.Router()
        this.initRoutes()
    }
    initRoutes(){
        this.router.get('/', (req,res) => {
            console.log("LOAN ROUTES")
            res.send("Hello LOAN")
        })
    }
}

module.exports = new LoanRoutes().router