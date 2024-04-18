import { connect } from "mongoose";

const connectToMongoDB = async () => {
    try {
        const conn = await connect(process.env.DB_URL)
        if (conn) {
            console.log(`Connected to DB: ${conn.connection.host}`);
        }
    } catch (error) {
        console.log("Error in Connecting the Database: ", error);
    }
}

export default connectToMongoDB