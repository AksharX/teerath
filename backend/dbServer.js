const express = require("express")
const app = express()
const mysql = require("mysql")
const { MongoClient, Binary } = require('mongodb')
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require("fs")
var ImageKit = require("imagekit")

var imagekit = new ImageKit({
    publicKey: "public_YIc9+O1lNdUQvhNEAwVIjncH4fg=",
    privateKey: "private_lorh5Ma2iWDKLMGf7rs+IzmKOWY=",
    urlEndpoint: "https://ik.imagekit.io/atlas"
});

// const db = mysql.createPool({
//    connectionLimit: 100,
//    host: "127.0.0.1",       
//    user: "newuser",         
//    password: "password",  
//    database: "userDB",      
//    port: "3306"             
// })
// db.getConnection( (err, connection)=> {
//    if (err) throw (err)
//    console.log ("DB connected successful: " + connection.threadId)
// })

const uri =
    "mongodb+srv://tpatel62:roYixtDoKbAGufF3@atlas.gs32r.mongodb.net/ATLAS?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect().then(s => {
    console.log("Connected to Mongo Db!")
})



require("dotenv").config()
// const DB_HOST = process.env.DB_HOST
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD
// const DB_DATABASE = process.env.DB_DATABASE
// const DB_PORT = process.env.DB_PORT
// const DB = mysql.createPool({
//    connectionLimit: 100,
//    host: DB_HOST,
//    user: DB_USER,
//    password: DB_PASSWORD,
//    database: DB_DATABASE,
//    port: DB_PORT
// })






const port = process.env.PORT
app.listen(port,
    () => console.log(`Server Started on port ${port}...`))
client.connect()


const bcrypt = require("bcrypt")
app.use(express.json())
app.use(upload.single('file'))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});


// app.post("/createUser", async (req,res) => {
//     const user = req.body.name;
//     const hashedPassword = await bcrypt.hash(req.body.password,10);
//     db.getConnection( async (err, connection) => {
//         if (err) throw (err)
//         const sqlSearch = "SELECT * FROM userTable WHERE user = ?"
//         const search_query = mysql.format(sqlSearch,[user])
//         const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
//         const insert_query = mysql.format(sqlInsert,[user, hashedPassword])

//         await connection.query (search_query, async (err, result) => {
//             if (err) throw (err)
//             console.log("Search Results")
//             console.log(result.length)
//             if (result.length != 0) {
//                 connection.release()
//                 console.log("User already exists")
//                 res.sendStatus(409) 
//             } 
//             else {
//                 await connection.query (insert_query, (err, result)=> {
//                     connection.release()
//                     if (err) throw (err)
//                     console.log ("Created new User")
//                     console.log(result.insertId)
//                     res.sendStatus(201)
//                 })
//             }
//         })
//     })
// })

app.post("/blogs", async (req, res) => {

    console.log(req.file)
    const buffer = fs.readFileSync(req.file.path)
    console.log(buffer)
    imagekit.upload({
        file: buffer,
        fileName: req.file.filename,
    }).then(async (response) => {
        console.log(response.url)
        const database = client.db("ATLAS");
        const blogsCollection = database.collection("blogs");

        await blogsCollection.insertOne({
            caption: req.body.caption,
            imageUrl: response.url
        });
        res.sendStatus(200)
    }).catch(e => {
        res.sendStatus(500)
        console.log(e)
    })
})

app.get("/blogs", async (req, res) => {
    const database = client.db("ATLAS");
    const blogsCollection = database.collection("blogs");

    const blogs = await blogsCollection.find().toArray()
    res.send(blogs)
})
app.get("/events", async (req, res) => {
    const database = client.db("ATLAS");
    const eventsCollection = database.collection("events");

    const events = await eventsCollection.find().toArray()
    res.send(events)
})

app.post("/events", async (req, res) => {
    const event = req.body

    console.log(event)

    const database = client.db("ATLAS");
    const eventsCollection = database.collection("events");

    eventsCollection.insertOne(event)

    res.sendStatus(200)
})


app.get("/yelp", async (req, res) => {
    try {
        const axios = require('axios');
        const response = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.query.term || "Food"}&location=${req.query.location || "Manhattan"}`, {
            headers: {
                Authorization: 'Bearer ' + "c15imz89xvXSsGl10eiRJYU8xLhHievqkMC-7RvTnI9aIuLr2QM8Ayq_HuQd0c8vqmix7MtINV1Ba-qORG-NNPy32T7gH34EA7S7qvrN5fS2Whj-pdWeWsd8D-5UYnYx" //the token is a variable which holds the token
            }
        })

        res.send(response.data)
    } catch (error) {
        res.send(error)
    }

})

