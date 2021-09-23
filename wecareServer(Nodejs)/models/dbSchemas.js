const mongoose=require('mongoose');

let model={};

mongoose.connect("mongodb://localhost/weCare",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database successfully :)");
}).catch((err)=>{
    console.log(`Error connecting to database :( ${err.message}`)
});

//users collection
let userSchema=new mongoose.Schema({
    userId:{
        type:String,
        unique: true,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    password:String,
    gender:String,
    dateOfBirth:Date,
    email:String,
    mobileNumber:Number,
    pincode:Number,
    city:String,
    state:String,
    country:String
},{
    collection:"users",timestamps:true
})

model.users=mongoose.model('users',userSchema);

//coaches collection
let coachSchema=new mongoose.Schema({
    coachId:{
        type:String,
        unique: true,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    password:String,
    gender:String,
    dateOfBirth:Date,
    mobileNumber:Number,
    speciality:String
},{
    collection:"coaches",timestamps:true
})

model.coaches=mongoose.model("coaches",coachSchema);

//bookings collection
let bookingSchema=new mongoose.Schema({
    bookingId:{
        type:String,
        unique: true,
        required: true
    },
    userId:String,
    coachId:String,
    appointmentDate:Date,
    slot:String
},{
    collection:"bookings",timestamps:true
})

model.bookings=new mongoose.model("bookings",bookingSchema);

module.exports=model;