require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT||4000
const route = require( './Routes/index');
const logger = require('./Middlewares/logger');
const { fileURLToPath } = require("url");
const path = require('path');

// mongodb
const { connectToDatabase} = require("./db");



const app = express();


app.listen(port, () => {
    connectToDatabase().then(() => {
        console.log(
            `Server is running on port ${port} and on ${app.get("env")} grounds`
        );
    });
});

// mongodb
app.get('/Books', (req, res) =>{
    db.collections('Books')
    .find()
    .sort({author:1})
    .forEach(book => Books.push(book))
    .then(()=>{
        res.status(200).json((books))
    })
    .catch((err)=>{
        res.status(500).json({error: 'did not fetch'})
    })
    res.json({msg: 'welcome'})
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1/', route);

// middleware for route level
// const logger = (req, res, next) => {
//     console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}`);
//     next();
// }
// using logger file at file/app leve;
app.use(logger);

// 
const fileName = __filename;
console.log(fileName);

const dirName = path.dirname(fileName);
console.log(dirName);
// USE THE IMMEDIATE CODE ABOVE OR BELOW, THEY DO SAME THING
// const __dirName = __dirname
// console.log(__dirName)

 app.use(express.static(path.join(__dirname, 'Public')))


// exporing get, post and put on same file
// const posts = [
//     {
//         id:1,
//         title: 'one',
//         message: 'this is one'
//     },

//     {
//         id:2,
//         title: 'two',
//         message: 'this is two'
//     }
// ]

// app.get('/', (req, res)=>{
//     // const id = parseInt(req.params.id);
//     // res.status(200).json(posts.filter((post) => post.id === id));

//     res.send('hello peeps')
// });

// app.get('/:id', (req, res)=>{
//     const id = parseInt(req.params.id);
//     res.status(200).json(posts.filter((post) => post.id === id))
// });

// app.put('/put', (req, res)=>{
//     res.send( 'recieved');
//     console.log(req.body)
// });

// app.post('/api/',(req, res) => {
//     const newPost = {
//         id: posts.length + 1,
//         title: req.body.title,
//         message:req.body.message
//     }

//     if(!newPost.title || !newPost.message){
//         return res.status(400).json({msg: 'fill in the necessary details'})
//     }

//     posts.push(newPost);
//     res.status(201).json(newPost);

//     // This works
//     // const requestData = req.body;
//     // console.log(requestData);
//     // res.status(201).json('successfully')
// });

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'Public', 'index.html'))
});

app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, 'Public', 'About.html'))
})

app.use(express.json())


// app.listen(port, console.log('works smoothly'))