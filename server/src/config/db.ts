import mongoose from "mongoose";

const ConnectDb = async()=>{
    try{
     await mongoose.connect(process.env.MONGO_STRING as string);
        console.log("Db connected")
    }catch(error){
        console.log(error,"db failed to connect");
        process.exit(1);
    }

}

export default ConnectDb;