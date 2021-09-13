const model = require('../model/dbSchemas');
const helper = require('../utilites/helper');
const validate=require('../utilites/validator');

exports.login =async(req,res)=>{
    try {
        let user=await model.user.findOne(
            {
                username:req.body.username,
                password:req.body.password
            });
        if(user!=null) {
            res.status(200).json({
                status: 'success',
                message: `Welcome ${req.body.username}`,
                result: true
            })
        }else{
            res.status(401).json({
                status: 'fail',
                message: `Invalid Credentials`
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.signup =async(req,res)=>{
    try {
        let user=await model.user.find({username:req.body.username});
        if(
            validate.password(req.body.password) &&
            validate.phoneNumber(req.body.phoneNumber) &&
            user.length==0
        ){
            user=await model.user.create(req.body);
            res.status(200).json({
                status: 'success',
                message: `User registered with name: ${req.body.username}`,
                data: user
            })
        }else{
            res.status(401).json({
                status: 'fail',
                message: `User already registered`
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.getTablets =async(req,res)=>{
    try {
        let tabs=await model.product.find({"productCode":/^TAB/},{__v:0,_id:0});
        if(tabs.length>0){
            res.status(200).json({
                status: 'success',
                message:`List of tablets`,
                data:tabs
            })
        }else{
            res.status(201).json({
                status: 'success',
                message:`No tablet available right now :(`
            })
        }     
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.getMobiles =async(req,res)=>{
    try {
        let mobs=await model.product.find({"productCode":/^MOB/},{__v:0,_id:0});
        if(mobs.length>0){
            res.status(200).json({
                status: 'success',
                message:`List of mobiles`,
                data:mobs
            })
        }else{
            res.status(201).json({
                status: 'success',
                message:`No mobiles available right now :(`
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.getCarts =async(req,res)=>{
    try {
        let carts=await model.cart.find({},{__v:0,_id:0});
        if(carts.length>0){
            res.status(200).json({
                status: 'success',
                data:carts
            })
        }else{
            res.status(201).json({
                status: 'success',
                message:`No carts found :(`
            })
        }  
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.addToCart =async(req,res)=>{
    try {
        let cart=await model.cart.findOne(
            {username:req.body.username,statusOfCart:{$ne:'Closed'}},
            {__v:0,_id:0}
        );
        if(cart!=null){
            let newProdsInCart=cart.productsInCart;
            newProdsInCart.push(req.body.productsInCart);
            let updCart=await model.cart.findOneAndUpdate(
                {cartId:cart.cartId},
                {productsInCart:newProdsInCart},
                {new:true,runValidators:true}
            );
            res.status(200).json({
                status: 'success',
                message:`User's cart is already available, append to the same cart`,
                data:   updCart
            })
        }else{
            let genId=await helper.cartId();
            let newCart=await model.cart.create({
                cartId:genId,
                username:req.body.username,
                productsInCart:req.body.productsInCart
            });
            res.status(200).json({
                status: 'success',
                msg: `New items got inserted into the cart with the ID : ${genId}`,
                data:newCart
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.getUserCart =async(req,res)=>{
    try {
        let carts=await model.cart.find({username:req.params.username},{__v:0,_id:0});
        if(carts.length!=0){
            res.status(200).json({
                status: 'success',
                data:carts
            })
        }else{
            res.status(404).json({
                status: 'success',
                message:`No cart found for user: ${req.params.username} :(`
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.updateUserCart =async(req,res)=>{
    try {
        let cart=await model.cart.findOneAndUpdate(
            {username:req.params.username,statusOfCart:'Open'},
            {productsInCart:req.body},
            {new:true,runValidators:true}
        );
        if(carts!=null){
            res.status(200).json({
                status: 'success',
                message: `CartId: ${cart.cartId} updated`,
                data:cart
            })
        }else{
            res.status(201).json({
                status: 'success',
                message:`No cart found for user: ${req.params.username} :(`
            })
        }
        
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.addUserOrder =async(req,res)=>{
    try {
        let cart=await model.cart.findOneAndUpdate(
            {username:req.params.username},
            {statusOfCart:'Closed'},
            {new:true,runValidators:true}
        );
        if(carts!=null){
            let genId=await helper.orderId();
            let order=await model.order.create({
                orderId:genId,
                cartId:cart.cartId
            });

            res.status(200).json({
                status: 'success',
                data:order
            })
        }else{
            res.status(404).json({
                status: 'fail',
                message:`No cart found for user: ${req.params.username} :(`
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.deleteProduct =async(req,res)=>{
    try {
        let delProd=await model.product.deleteOne({productId:req.params.productId});
        if(delProd.deletedCount!=0){
            res.status(200).json({
                status: 'success',
                message:`Product Id: ${req.params.productId} deleted`
            })
        }else{
            res.status(404).json({
                status: 'success',
                message:`No cart found for productId: ${req.params.productId} :(`
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
}

exports.invalid =async(req,res)=>{
    res.status(404).json({
        status: 'error',
        message: `Resource not found`
    });
}