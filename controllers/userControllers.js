const path = require("path");
const {
  fetchProducts,
  createCart,
  findUser,
  createUser,
  cartExist,
  fetchcart,
  updateCart,
  saveaddress,
  getAllOrders,
  saveorder,
  emptyCartOfUser,
  getMyOrdersQuery,
  cancelOrderQuery
} = require("../models/Query");
const { v4: uuid } = require("uuid"); //
const jwt = require("jsonwebtoken");

const homepage = (req, res) => {
  res.sendFile(path.resolve("views/user/userHomepage.html"));
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await findUser(email); //check on the database
  console.log(user);
  if (user.length <= 0) {
    res.status(404).send("User not found");
    return;
  }
  if (user[0].password == password) {
    let token;
    if(user[0]?.role=='transporter'){
      token = jwt.sign({ u_id: user[0].u_id, role: user[0].role, area_alloted:user[0].area_alloted }, "payal"); //paylaod ,secret key
    }else{
      token = jwt.sign({ u_id: user[0].u_id, role: user[0].role }, "payal"); //paylaod ,secret key
    }
    
      res
        .status(200)
        .json({
          token,
          url: (()=>{
            if(user[0].role == "user"){
              return '/'
            }else if(user[0].role == "seller"){
              return '/seller/home'
            }else if(user[0].role == "admin"){
              return '/admin/sellerRequestPage'
            }else if(user[0].role == "transporter"){
              return '/transporter/home'
            }
          })(),
        }); //generate token here and redirect to the home page
   
  } else {
    //handle if password not mathces
    res.status(401).send("Password not matched");
  }
};

const showproducts = async (req, res) => {
  try {
    const data = await fetchProducts();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
const addToCart = async (req, res) => {
  const token = req.headers.authorization;
  var decoded = jwt.verify(token, "payal");
  const p_id = req.query.p_id; //query
  const u_id = decoded.u_id;
  //for terminate the duplication entry
  const iscartExist = await cartExist({ u_id, p_id });
  //database call id it exist or not
  console.log(iscartExist);
  if (iscartExist.length > 0) {
    res.status(409).end();
    return;
  }
  //  console.log(p_id,u_id);
  const result = await createCart({ u_id: u_id, p_id: p_id }); //database call
  console.log(result);
  if (result.affectedRows > 0) {
    res.status(200).end();
  } else res.status(304).end();
};

const showcartpage = async (req, res) => {
  try {
    res.sendFile(path.resolve("views/user/userCart.html"));
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const getusercarts = async (req, res) => {
  try {
    var decoded = jwt.verify(req.headers.authorization, "payal");
    console.log(decoded);
    const carts = await fetchcart(decoded.u_id);
    console.log(carts);
    res.status(200).json(carts);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

async function updateCartQuantity(req, res) {
  try {
    const decoded = jwt.verify(req.headers.authorization, "payal");
    const u_id = decoded.u_id;
    const p_id = req.query.pid;
    const quantity = req.query.quant;
    const result = await updateCart({ quantity, p_id, u_id });
    if (result.changedRows > 0) {
      res.status(200).end();
    } else {
      res.status(304).end();
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteCartProduct(req, res) {
  try {
    console.log("deeeeee");
    const decoded = jwt.verify(req?.headers?.authorization, "payal");
    const u_id = decoded.u_id;
    const p_id = req.query.pid;
    const result = await updateCart(null, { u_id, p_id });
    if (result.affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(304).end();
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}

const usersignup = async (req, res) => {
  //receive the data from the front end
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
      message: "successfully signup",
    });
  } catch (error) {
    console.log(error.errno);
    if (error.errno == 1062) {
      res.status(403).end();
    } else {
      res.status(500).send("Internal error");
    }
    //console.log(error);
  }
};
const sendsignuppage = async (req, res) => {
  try {
    res.sendFile(path.resolve("views/signupEcommerce.html"));
  } catch (error) {
    res.status(500).json({
      message: "internal server error",
    });
  }
};
const showloginpage = (req, res) => {
  res.sendFile(path.resolve("views/loginEcommerce.html"));
};

const getPlaceOrderPage = (req, res) => {
  try {
    res.sendFile(path.resolve("views/user/useraddress.html"));
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const placeOrder = async (req, res) => {
  try {
    const decoded = jwt.verify(req?.headers?.authorization, "payal");
    const address_id=uuid();
    await saveaddress(decoded.u_id, req.body,address_id);
    console.log(address_id);
    const usersAllPlacedOrders = await getAllOrders(decoded.u_id);
    let response;
  
    usersAllPlacedOrders.forEach(async (e) => {
      await saveorder(decoded.u_id,e, address_id, req.body.payment_mode);
    });
  
    response = await emptyCartOfUser(decoded.u_id);
    console.log(response);
    if(response.affectedRows>0){
        res.status(200).end();
    }
    
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
  
};

function getMyOrdersPage(req,res){
    try {
        res.sendFile(path.resolve("views/user/order.html"));
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

async function getMyOrders(req, res){
    try {
        const decoded = jwt.verify(req?.headers?.authorization, "payal");
        const myOrders=await getMyOrdersQuery(decoded.u_id);
        res.status(200).json(myOrders);
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const cancelOrder=async (req, res)=>{
  try {
      const o_id=req.query.o_id;
      const response=await cancelOrderQuery(o_id,req.body.reason,req.body.cancel_date);
      console.log(response)
      if(response.affectedRows>0){
        res.status(200).end();
      }
  
  } catch (error) {
      console.log(error);
       res.status(500).send({error:"Internal Server Error"});
  }
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
  deleteCartProduct,
  getPlaceOrderPage,
  placeOrder,
  getMyOrdersPage,
  getMyOrders,
  cancelOrder
};
