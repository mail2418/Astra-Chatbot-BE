import type { Router } from "express";
const express = require("express");
// Import the car controller which contains the handler functions for the routes
const carController = require("../controller/car_controller");

class carRoutes {
    router: Router;
    constructor(){
        // Create a new router instance from Express
        this.router = express.Router();
        // Initialize the routes by calling the initRoutes method
        this.initRoutes();
    }
    initRoutes(){
        this.router.get('/getcars', carController.getCars);
    }
}

module.exports = new carRoutes().router;