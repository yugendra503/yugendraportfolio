let express=require("express");
require('./dbconfig/dbconfig')
let cors=require("cors");
const contactRouting = require("./router/contactRouting");

let app=express();

app.use(express.json());
app.use(cors())
app.use("/",contactRouting)

app.listen(4000,()=>{
    console.log("server is running on port 4000")
})
