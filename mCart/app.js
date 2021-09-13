const express=require('express');
const router=require('./routes/router');
const errlog=require('./utilites/errorLogger');
const reqlog=require('./utilites/requestLogger');

const app=express();

app.use(express.json());
app.use(reqlog);
app.use('/',router);
app.use(errlog);

const port=process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`mCart running on port ${port}`);
});