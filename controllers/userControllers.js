const path = require("path");
const { fetchProducts, createCart, findUser, createUser, cartExist, fetchcart, updateCart } = require("../models/Query");
const { createDecipheriv } = require("crypto");
const { v4: uuid } = require("uuid");//
const jwt = require("jsonwebtoken");

const homepage = (req, res) => {
    res.sendFile(path.resolve("views/homepage.html"));
}

const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = await findUser(email)//check on the database
    console.log(user);
    if (user.length <= 0) {
        res.status(404).send("User not found")
        return;
    }
    if (user[0].password == password) {
        const token = jwt.sign({ u_id: user[0].u_id }, "payal")//paylaod ,secret key
        if(user[0].role=="user")
        res.status(200).json({ token, url: "/" })//generate token here and redirst to the home page
        else if (user[0].role=="seller")
        res.status(200).json({token,url:"/seller/home"})
    } else {
        //handle if password not mathces
        res.status(401).send("Password not matched")
    }
}

const showproducts = async (req, res) => {
    try {
        const data = await fetchProducts()
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Internal server error"
        })

    }
}
const addToCart = async (req, res) => {
    const token = req.headers.authorization;
    var decoded = jwt.verify(token, 'payal');
    const p_id = req.query.p_id; //query
    const u_id = decoded.u_id;
    //for terminate the duplication entry
    const iscartExist = await cartExist({ u_id, p_id })
    //database call id it exist or not
    console.log(iscartExist);
    if (iscartExist.length > 0) {
        res.status(409).end();
        return;
    }
    //  console.log(p_id,u_id);
    const result = await createCart({ u_id: u_id, p_id: p_id })//database call
    console.log(result);
    if (result.affectedRows > 0) {
        res.status(200).end();
    } else
        res.status(304).end();
}


const showcartpage = async (req, res) => {
    try {
        res.sendFile(path.resolve("views/cart.html"));
    } catch (error) {
        console.log(error);
        res.status(500).end();

    }
}

const getusercarts = async (req, res) => {
    try {
        console.log(req.headers);
        var decoded = jwt.verify(req.headers.authorization, 'payal');
        console.log(decoded);
        const carts = await fetchcart(decoded.u_id)
        console.log(carts);
        res.status(200).json(carts)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function updateCartQuantity(req, res) {
    try {
        const decoded = jwt.verify(req.headers.authorization, 'payal')
        const u_id = decoded.u_id
        const p_id = req.query.pid
        const quantity = req.query.quant
        const result = await updateCart({ quantity, p_id, u_id })
        if(result.changedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteCartProduct(req,res){
    try {
        console.log("deeeeee");
        const decoded = jwt.verify(req?.headers?.authorization, 'payal')
        const u_id = decoded.u_id
        const p_id = req.query.pid
        const result = await updateCart(null,{u_id,p_id})
        if(result.affectedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).send(error)
        console.log(error);
    }
}

const usersignup = async (req, res) => {//receive the data from the front end
    try {
        console.log(req.body);
        const id = uuid();
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const phone = req.body.phone;
        // const  role= 'user';
        // function call  
        const result = await createUser({ id, name, email, password, phone });
        res.status(200).json({
            result,
            message: "successfully signup"
        });

    } catch (error) {
        console.log(error.errno);
        if (error.errno == 1062) {

            res.status(403);
        } else {

            res.status(500).send("Internal error")
        }
        //console.log(error);
    }
}
const sendsignuppage = async (req, res) => {
    try {
        res.sendFile(path.resolve("views/signupEcommerce.html"))
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}
const showloginpage = (req, res) => {
    res.sendFile(path.resolve("views/loginEcommerce.html"))
}




module.exports = {
    homepage,
    showproducts,
    addToCart,
    loginUser,
    usersignup,
    sendsignuppage,
    showloginpage,
    showcartpage,
    getusercarts,
    updateCartQuantity,
    deleteCartProduct
}