const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", (req, res)=>{
    const fname= req.body.fname;
    const lname= req.body.lname;
    const dob= req.body.dob;
    const email= req.body.email;
    
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: fname,
                LNAME: lname,
                BIRTHDAY: dob
            
            }       
        }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/fbd0089046/";
    const options={
        method: "POST",
        auth: "saumya:541d4fcde5d669cbd99b8e2647abce6a-us21"
    }
    const request = https.request(url,options, (response)=>{
        const code = response.statusCode;
        if(code===200 && dob.length<=5){
            res.sendFile(__dirname+"/success.html");

        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data", (data)=>{
            
        })

    })
    request.write(jsonData);
    request.end();
    
});
app.post("/failure.html", (req, res)=>{
    res.redirect("/")
})



app.listen(process.env.PORT|| 3000, ()=>{
    console.log("Saumya, your server is working");
});

//apikey: 541d4fcde5d669cbd99b8e2647abce6a-us21
//audid: fbd0089046