import mongo_Connect_DB from "./db/mongoDB.js";
import { doctor_details } from "./model/doctor.model.js";
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

const startServer = async () => {
    try {
        await mongo_Connect_DB();


        // await doctor_details.create({
        //     _id: 1,
        //     name: "Someone",
        //     speciality: "Code Surgeon",
        //     age: 20
        // })
        
        const doctors = await doctor_details.find();
        console.log(doctors);


        app.listen(PORT, () => {
            console.log(`The backend is successfully running at PORT: ${PORT}`);
        })

        app.get('/', (req, res) => {
            res.send("Backend is jogging!");
        })
        app.on("error", () => {
            console.log("Express app error occured! :-?")
        })
    }
    catch (error) {
        console.log("Error occured: ", error);
        process.exit(1);
    } 


}

startServer()
