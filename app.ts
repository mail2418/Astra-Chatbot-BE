import type { Express,Router } from "express";
const express = require("express")
const cors = require('cors');
const morgan = require('morgan');
const LoanRoutes:Router = require('./router/loan_routes')
class Chatbot {
  app: Express;
  port : string | undefined;
  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.configureMiddleware();
    this.configureRoutes();
  }
  configureMiddleware(){
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("combined"))
  }
  configureRoutes() {
    this.app.use('/api/loan',LoanRoutes)
  }
  start(){
    this.app.listen(this.port, () => {
      console.log(`Listening on port ${this.port}`)
    })
  }
}
// ======================== INIT ========================

const chatbot = new Chatbot();
chatbot.start()
module.exports = chatbot.app