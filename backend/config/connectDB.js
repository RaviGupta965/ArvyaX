import mongoose from 'mongoose'
// MongoDB connection handler
const connectDB = async () => {
  try {
     const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || 'arvyax',
    });
    if(conn){
      console.log('MONGODB :: CONNECTED SUCCESSFULLY!!!');
    }
    else{
      'something went wrong'
    }
  } catch (err) {
    console.error('MONGODB :: CONNECTION ERROR', err.message);
    process.exit(1);
  }
};
export default connectDB;
