import type { Router } from "express";
const express = require("express")
// Import the car list controller which contains the handler functions for the routes
const carListController = require("../controller/carlist_controller")

class carListRoutes {
    router: Router
    constructor(){
        // Create a new router instance from Express
        this.router = express.Router()
        // Initialize the routes by calling the initRoutes method
        this.initRoutes()
    }
    initRoutes(){
        this.router.post('/getlistcarbycriteria', carListController.getListCarsByCriteria)
        this.router.post('/getlistcars', carListController.getListCars)
        this.router.get('/getdetailcar/:id', carListController.getDetailCarById)
    }
}

module.exports = new carListRoutes().router