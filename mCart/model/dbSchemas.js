const mongoose=require('mongoose');
let model={};

mongoose.connect("mongodb://localhost/mCart",{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to DB successfully :)");
}).catch((err)=>{
    console.log("Error connecting to database :(\n" + err.message);
})

//users collection
const userSchema=new mongoose.Schema({
    "username":{
        type: String,
        unique: true,
        required: true
    },
    "password":{
        type: String,
        required: true
    },
    "phoneNumber":{
        type:Number
    },
    "email":{
        type: String,
        match: /(.+)@(.+)\.com/
    }
},{
    collection:"users"
})

model.user=mongoose.model("users",userSchema);

//products collection
const productSchema=new mongoose.Schema({
    "productId":{
        type:Number,
        unique: true,
        required: true
    },
    "productName":{
        type: String,
        required: true
    },
    "productCode":{
        type: String,
        required: true,
        match: /^(MOB)|(TAB)\-[0-9]+/
    },
    "description":String,
    "price":{
        type:Number,
        min:1
    },
    "rating":{
        type:Number,
        min:0
    },
    "manufacturer":String,
    "osType":String
},{
    collection:"products"
})

model.product=mongoose.model("products",productSchema);


//products in cart Schema
const cartChildSchema=new mongoose.Schema({
    "productId":String,
    "productName":String,
    "quantity":Number
})

//cart collection
const cartSchema=new mongoose.Schema({
    "cartId":{
        type:Number,
        unique:true,
        required:true
    },
    "username":String,
    "productsInCart":[cartChildSchema],
    "statusOfCart":{
        type: String,
        enum:['Open','Closed'],
        default:'Open'
    }
},{
    collection:"cart",
    timestamps:true
})

model.cart=mongoose.model("cart",cartSchema);

//order collection
const orderSchema=new mongoose.Schema({
    "orderId":{
        type:Number,
        required: true
    },
    "cartId":{
        type:Number,
        required: true
    }
},{
    collection:"order"
})

model.order=mongoose.model("order",orderSchema);

module.exports=model;
