const express=require("express");
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");


const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  var firstName=req.body.fname;
  var lastName=req.body.lname;
  var eMail=req.body.email;
   var data={
     members:[
       {
         email_address:eMail,
         status:"subscribed",
         merge_fileds:{
           FNAME:firstName,
           LNAME:lastName
         }

       }
     ]
   };
  const jsonData=JSON.stringify(data)
  const url="https://us10.api.mailchimp.com/3.0/lists/c5feece266"
  const options={
    method:"POST",
    auth:"subu57:aae73ce4b7207e197a1592e01b2e1435-us10"

  }


   const request=https.request(url,options,function(response){

    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html")
    }
    else{
      res.sendFile(__dirname+"/failure.html")
    }


    response.on("data",function(data){

      console.log(JSON.parse(data));
    })

  })
request.write(jsonData);
request.end();
})

app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
 console.log("server @ 3000");
})

//aae73ce4b7207e197a1592e01b2e1435-us10
