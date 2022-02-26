/* pre requisites  >npm init  -for package.json, >npm i express  -node modules folder created after installing any module,
   >npm i body-parser , nodemon is installed globally so >nodemon weatherApp.js to run & stay conencted to server.
*/
const express = require("express");
const bodyParser = require("body-parser");  //To get html data inputs.
const https = require("https");     // No need to install https npm package as it is already bundled up in node modules.

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/weather",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/weather",function(req,res){
  const cityName = req.body.cityName;   //will get user enter city name through name attribute in form
  //const units = "metric";
  const units = "metric";
  const apiKey = "1eefc20a0e3aab5f1abb51bc2f42d57b";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units="+units+"&appid="+apiKey;
  https.get(url,(response)=>{         //used to fetch data from ext server, this response is different than app.get "res"
    console.log(response.statusCode);
/*
    const object ={
      name:"Prajwal Kharode",
      profession:"IT Engineer"
    }
    JSON.stringify(object); // converts JSON into string
*/
    response.on('data',(data)=>{
      const weatherData = JSON.parse(data); //converts hexadecimal data to JSOn format
      // refer JSON api format of url for weather api.
      const city = weatherData.name;
      const temp = weatherData.main.temp;
      const descp = weatherData.weather[0].description; //weather is an array
      const icon = weatherData.weather[0].icon; //refer: openweathermap.org/weather-conditions
      const iconImg = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

      const date = new Date();
    /* we can only send res once but can send multiple res by res.write(); then res.send();
    res.write("<h2> City "+city+" weather is "+descp+" with temp "+temp+" degrees</h2>\n");
    res.write("<h3> Today "+date.toDateString()+" Humidity "+weatherData.main.humidity+" with max temp goes from "+weatherData.main.temp_min+" upto "+weatherData.main.temp_max+" degrees</h3>\n");
    res.write("<img src= "+iconImg+">");  */
      res.send("<h2> City "+city+" weather is "+descp+" with temp "+temp+" degrees</h2>\n"+
    "<h3> Today "+date.toDateString()+",  Humidity "+weatherData.main.humidity+", with max temp goes from "+weatherData.main.temp_min+" upto "+weatherData.main.temp_max+" degrees</h3>\n"+
    "<img src= "+iconImg+">");
    });
  });
  //res.send("Today's weather for "+cityName+" is ");
});

app.listen(3000,function(){
  console.log("Connected to the local server 3000");
});
