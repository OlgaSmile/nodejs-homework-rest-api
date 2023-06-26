const mongoose = require('mongoose');

// HE0QKEX9McCPJVnq

const app = require('./app')

const {DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
.then(()=>{app.listen(PORT, ()=>{console.log('Database connection successful')} )})
.catch(error=>{
  console.log(error.message);
  process.exit(1)
})

mongoose.set('strictQuery', false);