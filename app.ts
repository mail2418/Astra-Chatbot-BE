// Import TypeScript types for Express and Router
import type { Express, Router } from "express";

// Import necessary modules and middleware
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');

// Import route handlers from their respective files
const carRoutes = require('./router/car_routes');
const carListRoutes = require('./router/carlist_routes');
const loanRoutes = require('./router/loan_routes');

// Define the Chatbot class
class Chatbot {
  // Declare the types of the class properties
  app: Express;
  port: string | undefined;

  // Constructor to initialize the Express app and configure middleware and routes
  constructor() {
    // Create an instance of the Express application
    this.app = express();
    // Set the port from environment variable or default to "8080"
    this.port = process.env.PORT || "8080";
    // Configure the middleware
    this.configureMiddleware();
    // Configure the routes
    this.configureRoutes();
  }

  // Method to configure middleware
  configureMiddleware() {
    // Enable CORS for cross-origin requests
    this.app.use(cors());
    // Parse JSON payloads
    this.app.use(express.json());
    // Parse URL-encoded payloads
    this.app.use(express.urlencoded({ extended: true }));
    // Log HTTP requests using the "combined" format
    this.app.use(morgan("combined"));
  }

  // Method to configure routes
  configureRoutes() {
    // Set up routes for car-related API endpoints
    this.app.use('/api/car', carRoutes);
    // Set up routes for car listing-related API endpoints
    this.app.use('/api/carlist', carListRoutes);
    // Set up routes for loan-related API endpoints
    this.app.use('/api/loan', loanRoutes);
  }

  // Method to start the server
  start() {
    // Make the app listen on the specified port and log a message when it starts
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`);
    });
  }
}

// Instantiate the Chatbot class and start the server
const chatbot = new Chatbot();
chatbot.start();

// Export the Express app instance for use in other modules
module.exports = chatbot.app;
