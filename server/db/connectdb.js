import mongoose from "mongoose";
import 'dotenv/config';

export async function connectdb(){
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('connected to database')
    } catch (error) {
        console.error('Something went wrong: ', error);
    }
}