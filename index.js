require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT||4000
const route = require( './Routes/index');
const logger = require('./Middlewares/logger');
const { fileURLToPath } = require("url");
const path = require('path');
const { Dog } = require("./model");
const cors = require("cors")

// mongodb
const { connectToDatabase} = require("./db");



const app = express();



// mongodb
// app.get('/Books', (req, res) =>{
//     db.collections('Books')
//     .find()
//     .sort({author:1})
//     .forEach(book => Books.push(book))
//     .then(()=>{
//         res.status(200).json((books))
//     })
//     .catch((err)=>{
//         res.status(500).json({error: 'did not fetch'})
//     })
//     res.json({msg: 'welcome'})
// })

app.use(cors({ exposedHeaders: "x-auth-token" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/', route);

// middleware for route level
// const logger = (req, res, next) => {
//     console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`);
//     next();
// }
// using logger file at file/app level;
app.use(logger);

app.use(express.json());

// 
const fileName = __filename;
console.log(fileName);

const dirName = path.dirname(fileName);
console.log(dirName);
// USE THE IMMEDIATE CODE ABOVE OR BELOW, THEY DO SAME THING
// const __dirName = __dirname
// console.log(__dirName)

 app.use(express.static(path.join(__dirname, 'Public')))


// app.put('/put', (req, res)=>{
//     res.send( 'recieved');
//     console.log(req.body)
// });



app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'Public', 'index.html'))
});

app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, 'Public', 'About.html'))
})



app.get("/dogs", async (req, res) => {
    const allDogs = await Dog.find();
    return res.status(200).json(allDogs);
  });

  app.post("/dogs", async (req, res) => {
    console.log(req.body)
    const newDog = new Dog({ ...req.body });
    const insertedDog = await newDog.save();
    return res.status(201).json(insertedDog);
  });


app.listen(port, () => {
    connectToDatabase().then(() => {
        console.log(
            `Server is running on port ${port} and on ${app.get("env")} grounds`
        );
    });
});
