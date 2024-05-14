import type { Router } from "express";
const express = require("express")
const carListController = require("../controller/carlist_controller")

class carListRoutes {
    router: Router
    constructor(){
        this.router = express.Router()
        this.initRoutes()
    }
    initRoutes(){
        this.router.post('/getlistcarbycriteria', carListController.getListCarsByCriteria)
        this.router.post('/getlistcars', carListController.getListCars)
        this.router.get('/getdetailcar/:id', carListController.getDetailCarById)
    }
}

module.exports = new carListRoutes().router