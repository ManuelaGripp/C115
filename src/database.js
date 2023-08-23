const mongoose = require('mongoose')
require('dotenv').config()

 function connect(){

    const mongoString = process.env.DATABASE_URL;
    
    mongoose.connect(mongoString);
    const database = mongoose.connection;
    
    database.on('error', (error) => {
        console.log(error)
    })
    
    database.once('connected', () => {
        console.log('Database Connected');
    })

}


module.exports = {
    connect
}


