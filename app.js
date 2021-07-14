const express = require( "express");
const https=require("https");
const bodyprser=require("body-parser");

const app=express();
app.use(bodyprser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html")
app.post("/",function(req,res){
  const uery=req.body.CityName;
  const id="5d8d5e2af0b7aca816f7c4aa22f901d6";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+uery+"&appid="+id+"&units="+unit;
  https.get(url,function(response){
  console.log(response.statusCode);
  response.on("data",function(data){
    const wether=JSON.parse(data);

    const temp=wether.main.temp;
    const desp=wether.weather[0].description
    const icon=wether.weather[0].icon;
    const iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"

    console.log(desp);

  res.write("<h1>The clouds r  "+desp+"  now</h1>");
    res.write("<h1>the Temp in   " +uery+"  is   " +temp+"</h1>");
    res.write("<img src="+iconURL+">");
  res.send();
  })
  });

})
});



app.listen(3000,function(){
  console.log("Server started at port 3000");
})
