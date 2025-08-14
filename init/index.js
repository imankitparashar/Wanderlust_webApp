const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing.js");
main()
.then((res)=>{console.log("success")})
.catch((err)=>{console.log(err)});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
    };


const initDB = async ()=>{
    await Listing.deleteMany({});
   initData.data = await initData.data.map((obj)=>({...obj,owner:"68921b8583070da77d787d5a"}))
    await Listing.insertMany(initData.data);
    console.log("data entered")
}
initDB();
