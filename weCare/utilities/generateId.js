const model=require('../models/dbSchemas');

let gen={};

gen.userId=async ()=>{
    let user=await model.users.find();
    let id="UI-"+("0000"+user.length).slice(-4);
    return id;
}

gen.coachId=async ()=>{
    let coach=await model.coaches.find();
    let id="CI-"+("0000"+coach.length).slice(-4);
    return id;
}

gen.bookingId=async ()=>{
    let booking=await model.bookings.findOne({})
        .sort({bookingId:-1});
    let len=0;
    if(booking!=null)
        len=parseInt((booking.bookingId).slice(-4))+1;
    let id="B-"+("0000"+len).slice(-4);
    return id;
}

module.exports = gen;