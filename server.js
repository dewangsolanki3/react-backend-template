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


// Mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/react-backend-template', { useNewUrlParser: true , useUnifiedTopology: true } , error => {
    error ? console.log("=======Oops Dewang=======" , error) : console.log("======Dewang MongoDB Successful======")  
})



// Data Parsing ka code
app.use(express.json())
app.use(express.urlencoded({extended: false}))




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





// app.get('/' , (req,res) => {
//     res.send("hello")
// })


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));


    app.get('/', (request, response) => {
        response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}






app.listen(PORT, console.log(`listening to port ${PORT}`) )
