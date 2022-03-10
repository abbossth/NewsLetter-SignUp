// JShint ES6

// MODULES
const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const https = require('https');

// APP
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// ROOT
app.get('/', function(req,res){
    res.sendFile(__dirname + '/signUp.html');
});

app.post('/', function(req,res){
    const firstName = req.body.FName;
    const lastName = req.body.LName;
    const email = req.body.email;

    // console.log(firstName, lastName, email);

    const data = {
        members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        } 
        ]
    }

    const jsonData = JSON.stringify(data);

    const urlPost = "https://us14.api.mailchimp.com/3.0/lists/c7ba4c1c5e/";
    const options = {
        method: "POST",
        auth: "abbossth:80ae5a45030b94631a565ca3015886c7-us14"
    }


    const request = https.request(urlPost, options, function(response){
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");    
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

    
    
});

app.post('/failure', function(req,res){
    console.log(req);
    res.redirect('/');
});


// PORT
app.listen(process.env.PORT || 3000, function(){
    console.log('Server is running...');
});



// API key (MAilChimp) --> 80ae5a45030b94631a565ca3015886c7-us14

// Unique ID ---> c7ba4c1c5e