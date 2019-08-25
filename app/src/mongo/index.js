import { mongo_url, mongo_password, mongo_user } from '../config/index'
import mongoose from "mongoose";

const connectionOptions = { 
    useNewUrlParser: true,
    user: mongo_user,
    pass: mongo_password
};

mongoose.plugin(require('mongoose-lean-virtuals'))
mongoose.set('useCreateIndex', true);
mongoose.connection
    .on('connecting', () => console.log('> Connecting to Mongo Database ...'))
    .on('connected', () => console.log('> Connected to Mongo Database!'))
    .on('error', (error) => {
        console.log('Connection error with Mongo', error);
        mongoose.connection.close();
    })

/**
 * In case Mongo container is not ready (because of credentials config)
 */
const connectWithRetry = function () {
    mongoose.connect(`mongodb://${mongo_url}?authSource=admin`, connectionOptions, ( err ) => {
        if (err) {
            setTimeout(connectWithRetry, 3000);
        }
    });
};

connectWithRetry();
module.exports = mongoose;