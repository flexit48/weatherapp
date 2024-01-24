import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port= process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.post("/submit", async (req,res)=>{
    const long = req.body.long;
    const lati = req.body.lati;
    const time1 = req.body.time;
    const link = "https://api.open-meteo.com/v1/forecast?latitude=" + long + "&" + "longitude=" + lati + "&hourly=temperature_2m,precipitation_probability,wind_speed_10m"

    try {
        const result = await axios.get(link);
        const weatherData = result.data;

      const finalData = {
        temperature: weatherData.hourly.temperature_2m[time1],
        rain: weatherData.hourly.precipitation_probability[time1],
        windSpeed: weatherData.hourly.wind_speed_10m[time1],
      }
        res.render("index.ejs", {finalData1: finalData} );
      } catch (error) {
        res.render("index.ejs");
      }
  
  });
    


app.listen(port,()=>{
console.log(`Server is running on ${port}`);
});