const path = require("path");
const { v4: uuid } = require("uuid")
const {savesellerdetailuser,savesellerdetailseller}=require("../models/sellerquery");
const { fetchProducts } = require("../models/Query");
const signupSeller = async (req, res) => {
    try {
        const id= uuid();
        const { name, email, password, adharnumber, adharimg, pannumber, panimage, adressline1, adressline2, city, state, pincode, phonenumber } = req.body;
        const dataquery = await savesellerdetailuser({ name, email, password, adharnumber, adharimg, pannumber, panimage, adressline1, adressline2, city, state, pincode, phonenumber, id })
        const dataquery2 = await savesellerdetailseller({ name, email, password, adharnumber, adharimg, pannumber, panimage, adressline1, adressline2, city, state, pincode, phonenumber, id })
       
        res.status(200).end();
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

const getsignuppage = async (req, res) => {
    try {
        res.sendfile(path.resolve("views/sellersignup.html"))

    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}
const getsellerhomepage = async (req,res)=>{
  try{
    res.sendfile(path.resolve("views/sellerhomepage.html"))
  }catch(err){
    console.log(err);
    res.status(500).end();

  }
}
const getsellerproducts = async (req,res)=>{
    try{
        var decoded = jwt.verify(req.headers.authorization, 'payal');
        const productdata = await getsellerproductquery(decoded.u_id);
        res.status(200).json(productdata);
         

    }catch(err){
      console.log(err);
      res.status(500).end();
  
    }
  }

module.exports = { signupSeller, getsignuppage ,getsellerhomepage,getsellerproducts}