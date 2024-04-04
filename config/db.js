import mongooose from 'mongoose'

const connectDB = async() =>{
  try {
    const conn = await mongooose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongoDB database ${conn.connection.host}`)
  } catch (error) {
    console.log(`error in mongoose ${error}`)
  }
}

export default connectDB;