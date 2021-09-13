const model=require('../model/dbSchemas');
let generate={};

generate.cartId =async ()=>{
    let cart=await model.cart.find();
    return 101+ cart.length;
}

generate.orderId=async (len)=>{
    let order= await model.order.find();
    return 2001+ order.length;
}
module.exports = generate;