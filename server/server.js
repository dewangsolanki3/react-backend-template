const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Guest = require('./Schema/guestSchema.js')


// Data Parsing ka code
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Helps passing Data between Backend & Frontend as they run on different servers.
app.use(cors())



// mongoose connection code (can be found on npmjs.com - mongoose)
// Put your own cluster connection string below - 
mongoose.connect('mongodb+srv://dewangsolanki3:<YOUR PASSWORD>@cluster0.n0bdv.mongodb.net/<YOUR DATABASE NAME>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
},
 (error) => error ? console.log("Oops Error!") : console.log("=== Yaay DB connected ===")  // Our Pro code to check connection
)






// Saving Data to MOngoDB 
app.post('/save', (req, res) => {
    let data = req.body
    console.log(data)

    let newGuest = new Guest(data)
    newGuest.save( (error) => error ? console.log("Oops Error in saving data!") : res.send("=== Saved Data ===")  )
})



// Fetching Data from MongoDB
app.get('/', (req, res) => {
    Guest.find()
        .then( (data) => res.send(data))
        .catch( (error) => console.log(error))
})







// Code to run server live
app.listen(5000, () => console.log("Running on port " + 5000))
