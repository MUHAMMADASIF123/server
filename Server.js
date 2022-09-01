const { json } = require('body-parser');
const bodyParser = require('body-parser');
const express=require('express')
const app=express();
const Port=process.env.Port | 5000
const dbfile=require('./conn')
const postroute=require('./server/routes/post')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:'true'}))
app.use('/api/post',postroute)
app.get('/',()=>{
    console.log("hello from server")
})
app.listen(5000,()=>{
    console.log(`sever running at port${Port} `)
})