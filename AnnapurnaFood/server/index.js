import express from "express";
const app =express();
app.use("/",(req,res)=>{
    res.send("hello")
})
app.listen(2000,()=>{
    console.log("app runntin on this port http://localhost:2000 ");
     
})