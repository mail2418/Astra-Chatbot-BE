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
        this.router.get('/getlistcarbycriteria', carListController.getListCarsByCriteria)
        this.router.get('/getlistcars', carListController.getListCars)
    }
}

module.exports = new carListRoutes().router