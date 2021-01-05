const request = require("request");
const movies = require("./index");
const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/movies",async(req,res)=>{
    const Movies = await movies();
    res.send(Movies);
})
app.listen(port,()=>{
    console.log("Server Started");
})