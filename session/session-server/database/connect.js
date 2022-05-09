import mongoose from "mongoose"
import MongoDBSession from 'connect-mongodb-session';

const url = process.env.DB_URL || ''
const connect = () => {
    mongoose.connect(url, {
        useNewURLParser: true,
        userCreateIndex: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log('Connected to MongoDB instance')
    }).catch(err =>{
        console.log(`Error in connecting to MongoDB: ${err}`)
    })
}
const store = new MongoDBSession({
    uri:url,
    collection: 'mySessions'
})
export {
    connect, store
}