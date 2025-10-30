import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {DB_NAME} from '../constants.js'

dotenv.config()
console.log(`The server is running at:  ${process.env.PORT}`);
console.log(`The db name is: ${DB_NAME}`);

const mongo_Connect_DB = async () => {
    try {
        mongoose.connect(`${process.env.MONGO_DB_URL}/${DB_NAME}`);
        console.log("Logged in.. hehee");
    }
    catch (err) {
        console.log("Not connected, someerror occured? ");
        console.log(err)
    }
}

// mongo_Connect_DB()



export default mongo_Connect_DB;