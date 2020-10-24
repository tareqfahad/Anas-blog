import passport from 'passport';
import passportLocal from 'passport-local';
import passportJWT from "passport-jwt";
import bcrypt from 'bcryptjs';
import User from '../api/v1/Model/User.js';
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const LocalStrategy = passportLocal.Strategy;


// local options
// passport by default will check for username and password inside the body
// in localOptions we can change that behaviour 

const localOptions ={
    usernameField: "username",
    // example 
    // usernameField:"Email",
    // passwordFiled:"pass"
}

// check user email and passport
const verifyCallback = async(username,password, done) =>{
    try {
        const user = await User.findOne({ username });
        if (!user) return done(null, false);
    
        if (!user.password) return done(null, false);
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) return done(null, false);
    
        return done(null, user.toObject());
      } catch (err) {
        return done(err);
      }
}
passport.use(new LocalStrategy(localOptions, verifyCallback));



// JWT authentication

const JwtOptions = {
  // take the token from Authorization header :)
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  // the same secret which we use to generate the JWT token
  secretOrKey:'Secret!@#',
}

const verifyJwt = async (payload, done) => {
  try {
    const { exp } = payload; // token expired date
    if (Date.now() >= exp * 1000) return done(null, false); // token expired date
    const user = await User.findOne({ username: payload.sub });
    if (!user) return done(null, false);
    return done(null, user.toObject());
  } catch (err) {
    return done(err);
  }
}

passport.use(new JwtStrategy(JwtOptions,verifyJwt));
