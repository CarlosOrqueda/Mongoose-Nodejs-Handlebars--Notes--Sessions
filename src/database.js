import mongoose from 'mongoose';
import colors from 'colors';

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`;

async function connect () {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(colors.bgCyan('>>> DB is connected'));
    } catch (e) {
        console.log(colors.bgRed(e));
    }
}

module.exports = connect();