let validate={};

validate.password = (password) => {
    if(password.length >=5) {
        return true;
    }else{
        let err=new Error('Minimum 5 characters should be there in password');
        err.status=400;
        throw err;
    }
}

validate.phoneNumber=(ph)=>{
    if(ph.toString().match(/^[1-9][0-9]{9}$/)){
        return true;
    }else{
        let err=new Error('Phone number should be 10 digits');
        err.status=400;
        throw err;
    }
}

module.exports = validate;