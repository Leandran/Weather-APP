
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

// function which represents the express module and saved in a new constant
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// using the get method and callback function
app.get("/", function(req, res){

// this allows to grab the current files location at anytime and append the location to it
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    
    
    const query = req.body.cityName                     //text that goes into the input box
    const apiKey = "6fdd5c88d2736fda3791cb76a07f0ab7"  // authentication for the api
    const unit ="metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode);
                
        //calling on method to search for data
        response.on("data", function(data){

            //saving the JSON data into a constant
            const weatherData = JSON.parse(data)

            //this allows to access specific data
            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in " + query + " is  "+ temp + " degrees Celcius.</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send()

       });
    });
});




app.listen(3000, function() {
    console.log("server has started on port 3000");

})