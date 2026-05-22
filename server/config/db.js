import mongoose from "mongoose"
import dns from "dns"

dns.setServers(["8.8.8.8"])

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    } catch (error) {
        console.log("db error:", error.message)
    }
}

export default connectDb