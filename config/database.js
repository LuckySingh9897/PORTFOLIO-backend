import mongoose from "mongoose"


export const connectDatabase=()=>{
    mongoose
    .connect(process.env.MONGO_URI)
    .then((c)=>{
     console.log(`Database connected successfully `);
    })
    .catch((error)=>{
        console.log(error)

    });
};