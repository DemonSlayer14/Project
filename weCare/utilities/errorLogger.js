const fs=require('fs');

let errlog=(err,req,res,next)=>{
    if(err){
        let msg=`${new Date()} - ${err.message}`;
        fs.appendFile('errorLog.txt',msg,(err)=>{
            if(err){
                console.log(`Logging Failed`);
            }
        })
        if(err.status){
            res.status(err.status).json({
                status:`error`,
                message: err.message
            })
        }else{
            res.status(500).json({
                status:`error`,
                message: err.message
            })
        }
        
    }
}

module.exports =errlog;