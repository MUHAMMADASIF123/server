const mongoose=require('mongoose')

const url="mongodb+srv://crud:crud@cluster0.iktz1.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url,{
    useNewUrlParser:true
})
const dbobj=mongoose.connection
dbobj.on('connected',()=>{
    console.log("Mongodb is connected successfully")
})
dbobj.on('error',()=>{
    console.log("mongodb not connected ")
})
module.exports=mongoose 