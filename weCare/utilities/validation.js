let valid={};
const model = require('../models/dbSchemas');

valid.name=(name) => {
    if(name.length>=3 && name.length<=50)
        return true;
    else{
        let err=new Error('Name should have minimum 3 and maximum 50 characters');
        err.status=400;
        throw err;
    }
}

valid.password=(password) => {
    if(password.length>=5 && password.length<=10)
        return true;
    else{
        let err=new Error('Password should have minimum 5 and maximum 10 characters');
        err.status=400;
        throw err;
    }
}

valid.age=(dob) => {
    let userDOB=new Date(dob);
    let diff=(new Date())-userDOB;
    diff=new Date(diff);
    let age=Math.abs(diff.getFullYear()-1970);
    if(age>20 && age<100)
        return true;
    else{
        let err=new Error('Age should be greater than 20 and less than 100');
        err.status=400;
        throw err;
    }
}

valid.gender=(gen) => {
    if(gen=='M' || gen=='F')
        return true;
    else{
        let err=new Error('Gender should be either M or F');
        err.status=400;
        throw err;
    }
}


valid.mobileNumber=(mobno) => {
    if(mobno.toString().length==10)
        return true;
    else{
        let err=new Error('Mobile Number should have 10 digits');
        err.status=400;
        throw err;
    }
}


valid.email=(email) => {
    if(email.match(/(.+)@(.+)\.com/))
        return true;
    else{
        let err=new Error('Email should be a valid one');
        err.status=400;
        throw err;
    }
}

valid.pincode=(pin) => {
    if(pin.toString().length==6)
        return true;
    else{
        let err=new Error('Pincode should have 6 digits');
        err.status=400;
        throw err;
    }
}

valid.city=(city)=>{
    if(city.length>=3 && city.length<=20)
        return true;
    else{
        let err=new Error('City should have minimum 3 and maximum 20 characters');
        err.status=400;
        throw err;
    }
}

valid.state=(state)=>{
    if(state.length>=3 && state.length<=20)
        return true;
    else{
        let err=new Error('State should have minimum 3 and maximum 20 characters');
        err.status=400;
        throw err;
    }
}

valid.country=(country)=>{
    if(country.length>=3 && country.length<=20)
        return true;
    else{
        let err=new Error('Country should have minimum 3 and maximum 20 characters');
        err.status=400;
        throw err;
    }
}

valid.speciality=(speciality)=>{
    if(speciality.length>=10 && speciality.length<=50)
        return true;
    else{
        let err=new Error('Specialty should have 10 to 50 characters');
        err.status=400;
        throw err;
    }
}

valid.slot=(slot)=>{
    if(slot.match(/\b([1-9]|1[0-2])\b (A|P)M to \b([1-9]|1[0-2])\b (A|P)M/)){
        return true;
    }else{
        let err=new Error('Slot should be a valid one');
        err.status=400;
        throw err;
    }
}

valid.appointmentDate=(doa)=>{
    doa=new Date(doa);
    let oneDay=24*60*60*1000;
    let day=Math.abs(((new Date())-doa)/oneDay);
    if(day<=7 && day>=0){
        return true;
    }else{
        let err=new Error('Date should be any upcoming 7 days');
        err.status=400;
        throw err;
    }
}

valid.slotAvailability=async (uId,cId,req)=>{
    let userAppt=await model.bookings.findOne({
        userId:uId,
        slot:req.body.slot,
        appointmentDate:new Date(req.body.dateOfAppointment)
    });
    let coachAppt=await model.bookings.findOne({
        coachId:cId,
        slot:req.body.slot,
        appointmentDate:new Date(req.body.dateOfAppointment)
    });
    if(userAppt==null && coachAppt==null){
        return true;
    }else{
        let err=new Error('There is an appointment in this slot already');
        err.status=400;
        throw err;
    }
}

module.exports=valid;