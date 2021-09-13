const fs=require('fs');

let errlog=(err,req,res,next) => {
    if(err){
        let msg=`${new Date()} - ${err.message}\n`;
        console.log(`Error Occured!! - ${err.message}\n`);
        fs.appendFile('errorLogger.txt',msg,(err)=>{
            if(err)
                console.log(`Error Logging failed!`);
        });
        if(err.status)
            res.status(err.status);
        else
            res.status(500);

        res.json({
            status: 'error',
            message: err.message
        })
    }
    next();
}

module.exports=errlog;