const express=require('express');

const router=require('./routes/router.js');
const reqlog=require('./utilities/requestLogger');
const errlog=require('./utilities/errorLogger');

const app=express();
const port=process.env.PORT || 3000;

app.use(express.json());
app.use(reqlog);
app.use('/',router);
app.use(errlog);

app.listen(port,()=>{
    console.log(`weCare server is running on ${port}`);
})