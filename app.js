// Import express and mongooese packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();

//import router
const routes = require('./Routers/index');

const host = "localhost";
const port = 8090;
const Database = process.env.DATABASE_URL
// MogngoDB connecting string
// const uri = "mongodb+srv://client:client2021@cluster0.40etm.mongodb.net/DB-1?retryWrites=true&w=majority";
// const uri = "mongodb+srv://zomato:zc1396@zomatocluster.tzgmm5h.mongodb.net/zomatodb";
const app = express();
// Middleware to handle json date
app.use(express.json());

// Handling CORS
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type', 'Authorization');
    next();
})

// Navigate all req to router
app.use('/',routes);

// Connect to Database and starting server
mongoose.connect(Database,{useNewUrlParser: true, useUnifiedTopology: true}).
    then(() => {
        app.listen(port,host,() => {
            console.log(`Server running at ${host}:${port}`);
        });
    }).
    catch((err) => {
        console.log(err);
    }
)
