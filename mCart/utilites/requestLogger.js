const fs=require('fs');

let reqlog=(req,res,next)=>{
    let msg=`${new Date()} - ${req.method} - ${req.url}\n`;
    fs.appendFile("requestLogger.txt",msg,(err)=>{
        if(err){
            return next(err);
        }   
    });
    next();
}

module.exports =reqlog;