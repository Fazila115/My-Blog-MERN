import {connect} from 'mongoose';

const connectDB = async() => {
    try{
        await connect(process.env.MONGODB_CLOUD_URI); 
        console.log('DB is connected!');
    }
    catch(error){
        console.log('DB connection is failed!'); 
        console.error(error.message);
    }
};

export default connectDB;