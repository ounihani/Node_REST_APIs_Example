const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const postsRoutes = require('./routes/posts');



//importing models
const Post = require('./models/Post');
//init the app
const app = express();

//middlwares
app.use(cors);
app.use(bodyParser.json());//must be before the routes
app.use('/posts',postsRoutes);

//database connection
//connect to mongo db atlas
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true  })
let db = mongoose.connection;

//check db connection
db.once('open',()=>{
    console.log("connected to mongodb");
});
//check for db error
db.on('error',(err)=>{
    console.log(err)
});





//routes
app.get('/',(req,res)=>{
    res.send('Home directory');
});



//listening to the server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));