const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs")
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

router.post("/createuser", [
    body("email").isEmail(), // Corrected field name and added parentheses
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ error: errors.array() }); // Changed status code to 400 for validation errors
    }
    try {
        const salt=await bcrypt.genSalt(10)
        
        const { name, location, email, password } = req.body;
        const secpassword=await bcrypt.hash(req.body.password,salt)
        
        const data = await User.create({ name, location, email, password: secpassword }).then(res.json({success:true}));
        console.log(data);
        
    } catch (error) {
        console.error("Error creating user:", error);
        res.json({success:false})
    }
});
router.post("/login",[
    body("email","wrong email").isEmail(),
    body("password","wrong password").isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({ error: errors.array() }); // Changed status code to 400 for validation errors
    }
    try{
        const email=req.body.email
        const userData=await User.findOne({email})
        if(!userData)
        {
            return res.status(400).json({error:"Try logging with correct creditianls"})
        }
        const real=await bcrypt.compare(req.body.password,userData.password)
        if(!real)
        {
            return res.status(400).json({error:"Try logging with correct creditianls"})

        }
        const authtoken = jwt.sign({ userId: User._id }, secretKey, { expiresIn: '1h' });
        res.json({success:true , authtoken:authtoken})

    }
    catch (error) {
        console.error("Error creating user:", error);
        res.json({success:false})
    }
    

}
)
module.exports = router;
