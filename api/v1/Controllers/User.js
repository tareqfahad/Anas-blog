import User from '../Model/User.js';
import bcrypt from 'bcryptjs';



const signUp = async ({body} , res) => {
    try {

    const {username , password} = body;
      
    const isUserExists = await User.findOne({username});

    if(isUserExists) return res.status(409).json({Error:"User is exists"});

    const hashedPass = await bcrypt.hash(password , 10);

    const user = new User({
        username,
        password:hashedPass,
    })

    await user.save();

    return res.status(202).json({Code:"User has been created"});


    } catch (err) {
        console.log(err);
        return res.status(500).json({
            code:"ServerError",
        })
    }




}


export {signUp}