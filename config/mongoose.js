const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://soyebakhtar:YSAmwUPHS9NIJUnX@cluster0.2gemxit.mongodb.net/?retryWrites=true&w=majority');
// mongoose.connect('mongodb://127.0.0.1/habit-tracker');
//soyebakhtar
//YSAmwUPHS9NIJUnX
const db = mongoose.connection;

//if error then pritnt message
db.on('error', console.error.bind(console, 'error in connectin DB'));

// server is up then run a message 
db.once('open', () => {
    console.log('Succesfully !! Connected to the DataBase');
})
module.export = db;


