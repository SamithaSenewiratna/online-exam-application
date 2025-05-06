import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {config} from 'dotenv';
import router from './router/route.js';

const app = express()


//import connection files
import connect from './database/connection.js';


//app middlewear
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
config();

//appliction port
const port = process.env.PORT || 8080 ;


// routes
app.use('/api',router) // apis

app.get('/',(req,res)=>{

     try{
        res.json("Get Request")
     }catch(error){
        res.json(error)
     }

})

// start server only when we have vaild connection 
connect().then(()=>{
    try{

        app.listen(port,()=>{
            console.log(`servsr connected to http://localhost:${port}`)
        })

    }catch(error){
       console.log(error);
    }
}).catch(error=>{
    console.log("invaild connection.."+error);
})




