import mongoose from "mongoose";

const connectDb=async()=>{
    try {
        const connect=await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`)
        console.log("db is connected successfully!")
    } catch (error) {
        console.log("eroor occured",error.message)
        process.exit();
    }
}
export default connectDb;