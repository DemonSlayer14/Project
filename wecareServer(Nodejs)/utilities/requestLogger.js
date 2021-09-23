const fs=require('fs');

let reqlog=(req,res,next)=>{
    let msg=`${new Date()} - ${req.method} - ${req.url}`;
    fs.appendFile('requestLogger.txt',msg,(err)=>{
        if(err){
            next(err);
        }
    })
    next();
}

module.exports=reqlog;