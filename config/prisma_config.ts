const {getDataDeployDB} = require("./secret_resource")
const { PrismaClient, Prisma } = require("@prisma/client");
const mysql = require('mysql2/promise')

const initializePrisma = async () => {
    let prisma:any;
    if (process.env.NODE_ENV === 'production') {
      const { payloadUser, payloadPass, payloadSchema } = await getDataDeployDB();
      // CLOUD SQL CONFIGURATION
      try {
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: payloadUser,
          password: payloadPass,
          database: payloadSchema,
          port: Number(process.env.DB_PORT),
          connectTimeout: 20000,
        });
        await connection.query('SELECT 1');
        console.log("connected");
        await connection.end();
      } catch (err) {
        console.error('ERROR:', err);
      }
      // CONNECT CLOUD SQL TO PRISMA ORM
      const sourceUrl = `mysql://${payloadUser}:${payloadPass}@${process.env.DB_HOST}:${process.env.DB_PORT}/${payloadSchema}`;
      prisma = new PrismaClient({
        datasources: {
          db: {
            url: sourceUrl,
          },
        },
      });
    } else {
      prisma = new PrismaClient();
    }
    return prisma;
  };
  
module.exports = {
    initializePrisma
}