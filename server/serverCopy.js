const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Guest = require('./model/guestSchema.js')
const cors = require("cors")
 

// === Mongoose DataBase Connection === 
mongoose.connect('mongodb+srv://dewangsolanki3:Cluster@123@cluster0.n0bdv.mongodb.net/workshop-test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  },
  error => { error ? console.log("=== Oops MongoDB failed ===") : console.log("=== MongoDB Dewang success ===")}
)


// === Body parser ka code ===
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Helps passing Data between Backend & Frontend as they run of different servers.
app.use(cors())



// === Routes === 
app.post('/save', (req,res) => {
  const data = req.body
  console.log(data)
  const newGuest = new Guest(data)
  newGuest.save( error => { error ? res.send("=== Oops ===" + error) : res.send("Yay Data Saved Successfully!")})
})



app.get('/', (req, res) => {
  Guest.find({ })
    .then( data => res.send(data))
    .catch( error => res.send(error))
})


app.listen(5000, () => console.log("App running on Port " + 5000) )






















// ==========================================================================
// ^^^^^^^^^ WORKSHOP Codes above^^^^^
// ==========================================================================
















// Portfolio Backend
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
let PORT = process.env.PORT || 8000
const Bio = require("./model/Bio")
const path = require('path')


// Helps passing Data between Backend & Frontend as they run of different servers.
app.use(cors())

let MONGODB_URI = "mongodb+srv://dewangsolanki3:Cluster@123@cluster0-n0bdv.mongodb.net/testing?retryWrites=true&w=majority"
// Mongoose connection
mongoose.connect( MONGODB_URI || 'mongodb://localhost:27017/react-backend-template', { 
    useNewUrlParser: true , 
    useUnifiedTopology: true 
} , error => {
    error ? console.log("=======Oops Dewang=======" , error) : console.log("======Dewang MongoDB Successful======")  
})



// Data Parsing ka code
app.use(express.json())
app.use(express.urlencoded({extended: false}))









// Increment a Counter
// let counter = 0
// app.post("/add/:num", (req,res) => {
//     console.log("Counter got Hit!")
//     counter = counter + 1
//     console.log(counter)
//   })



// query and params always a GET Method !!!
app.get('/query/:num' , (req,res) => {
    let query = req.query
    console.log(query)

    let num = req.params.num
    console.log(num)
    console.log(req.params)

    console.log("hey!!!!!!!!!!!!!!!!!!")
    res.send(num)

})





// GET MongoDB Data
app.get("/api", (req,res) => {
    Bio.find({ })
    .then((data)=>{
        res.json(data);
    })
    .catch(err => console.log("Oops Dewang there was an erroR FINDING Data :( " , err))
})


// POST to MongoDB
app.post("/save" , (req,res) => {
    const data = req.body 
    console.log("Hey Dewang, found data", data)
    const newBio = new Bio(data);
    newBio.save( err => {
        if(err){
            res.send("Errort happende")
        }
        else{    
            res.send("saveds")
        }
})
})


// DELETE from MongoDB
app.get('/delete/:id' , (req,res) => {
    Bio.findByIdAndDelete({_id: req.params.id} , err =>{
        if(err)
            res.send("Could not delete, Sorry :(")
        else 
            res.send("Deleted Successfully")
    })
})


// Update to MongoDb
app.put("/edit/:id", async (req, res) => {
    // console.log("put req to " , req.params.id)
    const productId = req.params.id
    const productToUpdate = await Bio.findById(productId)
    console.log(productToUpdate)

    if(productToUpdate){
        productToUpdate.username = req.body.username;
        productToUpdate.useremail = req.body.useremail;
        productToUpdate.usermsg = req.body.usermsg;
    }
     await productToUpdate.save()
     return res.status(200).send("Updated Successfully")
    
})









if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));


    app.get('*', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}





app.listen(PORT, console.log(`listening to port ${PORT}`) )