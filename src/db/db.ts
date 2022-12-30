import mongoose, { connect } from "mongoose";

const connectToDb = (connectionString: string) => {
    mongoose.set('strictQuery', true);
    connect(`${connectionString}`, (err) => {
        if (err)
            console.log(err.message)
        else
            console.log('connected to db')

            
            
    })
}
export default connectToDb