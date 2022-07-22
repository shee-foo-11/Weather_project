const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({
  extended:true
}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){

  const city=req.body.cityName;
  const app_id="d3b024f7a491994e904ff5d14f9a2694";
  const unit="metric";

  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+app_id+"&units="+unit;
  https.get(url,function(response){

    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp
      const weatherDescription=weatherData.weather[0].description
      const weather_icon=weatherData.weather[0].icon
      const icon_url="http://openweathermap.org/img/wn/"+weather_icon+"@2x.png"
      res.write("<h1>The weather is currently "+weatherDescription+"</h1>");
      res.write("<h2>The temperature in "+city+" is "+temp+" degrees celcius.</h2>");
      res.write("<img src="+icon_url+">");
      res.send();
    })
  })

})




app.listen(3000,function(){
  console.log("The server is running on port 3000!");
})
