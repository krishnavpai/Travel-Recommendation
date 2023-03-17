import mongoose from "mongoose";
// const connection = {};
const connectDB = handler=> async (req, res) => {
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }
    await mongoose.connect(process.env.MONGO_URI) 
    return handler(req, res);
}
export default connectDB;

// async function connectDB() {
//     if (connection.isConnected) {
//         // Use existing database connection
//         console.log('Using existing connection');
//         return;
//     }
//     // Use new database connection
//     const db = await mongoose.connect(process.env.MONGO_URI);
//     console.log('DB Connected');

//     connection.isConnected = db.connections[0].readyState;
// }

// export default connectDB;

  