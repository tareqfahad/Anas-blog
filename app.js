import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import mongoose from 'mongoose'
import passport from "passport";
import route from './route.js'


const app = express();

mongoose.connect(
    "mongodb://localhost:27017,127.0.0.1:27018/blog?replicaSet=rs0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
    () => console.log("DB is connected")
  );

  mongoose.set("debug" , true);

import './config/passportConfig.js'
app.use(passport.initialize());

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

route(app);



app.listen(3000, ()=>{
    console.log("Server is running");
})