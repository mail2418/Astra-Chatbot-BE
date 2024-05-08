import type { Router } from "express";
const express = require("express")
const carController = require("../controller/car_controller")

class carRoutes {
    router: Router
    constructor(){
        this.router = express.Router()
        this.initRoutes()
    }
    initRoutes(){
        this.router.get('/getcars', carController.getCars)
    }
}

module.exports = new carRoutes().router