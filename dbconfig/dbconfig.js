const mongoose=require("mongoose")
const con=mongoose.connect(`mongodb+srv://aviligondayugendra18_db_user:mhSZeTi35EdXD4je@portfolio.ifj8olo.mongodb.net/?appName=portfolio`)

if(con){
    // console.log(" connected to database successfully")
}
else{
    console.log("not connected to database")
}