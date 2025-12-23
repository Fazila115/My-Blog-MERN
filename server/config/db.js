import {connect} from 'mongoose';

const VAR = process.env.MONGODB_CLOUD_URI

const connectDB = async() => {
    try{await connect(VAR); console.log('DB is connected!')}
    catch(error){console.log('DB connection is failed!'); console.error(error.message)}
};

export default connectDB;