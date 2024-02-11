const path=require("path");
const signupSeller = async (req,res)=>{
  try {
    
     console.log(req.body);
     res.status(200).end();
} catch (error) {
      console.log(error);
       res.status(500).end();
  }
}

const getsignuppage = async (req,res)=>{
    try {
        res.sendfile(path.resolve("views/sellersignup.html"))
        
    } catch (error) {
        console.log(error);
        res.status(500).end();
    }
}

module.exports= {signupSeller ,getsignuppage}