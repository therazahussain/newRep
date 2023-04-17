require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const booleanRouter = require("./routes/booleanbotRoute.js")


const app = express();


// Middelware
const corsOption = {
    credentials: true,
    origin: ['*'],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", booleanRouter);

app.listen(port,()=>{
    console.log("Listning on port: ",port)
})