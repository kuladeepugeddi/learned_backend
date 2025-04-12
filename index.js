const express = require("express");
const {connection} = require("./config/db");
const {userRouter} = require("./routes/User.routes");
const {auth} = require("./middleware/auth.middleware");
const {notesRouter} = require("./routes/Notes.routes");
const cors = require("cors");
require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express")

const app = express();

app.use(express.json());

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Learning API documentation using swagger',
        version: '1.0.0',
      },
    },
    apis: ['./routes*.js'], // files containing annotations as above
  };
  
  const specification = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specification))

app.use(cors())
 
app.use("/users", userRouter);

app.use(auth);

app.use("/notes", notesRouter)


app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("connected to database");
    }catch(error){
        console.log(error);
    }
    console.log(`running on the port ${process.env.port}`);
})