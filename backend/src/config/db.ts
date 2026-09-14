import mongoose from "mongoose"
// import { DB_NAME } from "../constants"

export const connectDB = async()=>{
  try{
    const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`\n MONGODB connected !! DB HOST: ${connectionInstance}`);
  } catch(error){
    console.log("MONGODB Connetion error!", error);
    process.exit(1);
  }
}