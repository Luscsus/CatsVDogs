var typeToChange = ""
var newValue = 0
var NumberOfCatPeople = 0
var NumberOfDogPeople = 0
var NumberOfBothPeople = 0

// Load the needed dependencys:
const express = require('express')
var Datastore = require("nedb")

const app = express() // define the server
app.listen(3000, () => console.log("listening at 3000")) // Server starts listening at port 3000
app.use(express.static('public')) // Start running the files in the public folder 
app.use(express.json({ limit: '1mb' })) // Tell the server to read POST requests as json

// Create and load the database:
var database = new Datastore("database.db")
database.loadDatabase()

// Create the POST request reply:
app.post('/api', (request, response) => {

    database.find({}, (err, data) => {
        // Check for errors:
        if (err) 
        {
            response.end()
            return
        }

        // First define how many people are per animal:
        NumberOfCatPeople = data[0].Value
        NumberOfDogPeople = data[1].Value
        NumberOfBothPeople = data[2].Value

        // Then define the new value and typeToChange:
        if (request.body.AddedData == "cat")
        {
            NumberOfCatPeople = 1 + NumberOfCatPeople
            newValue = NumberOfCatPeople
            typeToChange = "Cat"
        }
        else if (request.body.AddedData == "dog")
        {        
            NumberOfDogPeople = 1 + NumberOfDogPeople
            newValue = NumberOfDogPeople
            typeToChange = "Dog"
        }
        else if (request.body.AddedData == "both")
        {
            NumberOfBothPeople = 1 + NumberOfBothPeople
            newValue = NumberOfBothPeople
            typeToChange = "Both"
        } 

        database.update({Type: typeToChange}, {Value: newValue, Type: typeToChange}, {}) // Save the new value to the database

        // Respond to the client:
        response.json({
            "NumberOfCatPeople": NumberOfCatPeople,
            "NumberOfDogPeople": NumberOfDogPeople,
            "NumberOfBothPeople": NumberOfBothPeople
        });
    })  

})