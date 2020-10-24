import JWT from "jsonwebtoken";
import passport from "passport";


const login = async (req, res) => {
    try {
      const { user } = req.user;
  
      const generatedToken = generateToken(user);
      return res.status(200).json({
        generatedToken,
      });
    } catch (error) {
      console.log(error);
      return serverError(res);
    }
  };

  const authenticate = (type, error, isStrict = true) =>
  function auth(req, res, next) {
    if (req.user) return next();
    return passport.authenticate(type, (err, user) => {
      if (err) return res.status(400);
      if (!user && isStrict)
        return res.status(401).json({
          error,
        });

      if (user) {
        req.user = {
          user,
        };
        return next();
      }
      return next();
    })(req, res, next);
  };


  const generateToken = (user) => {
    const { username, _id} = user;
    return JWT.sign(
      {
        iss: "ApiAuth",
        sub: username,
        id: _id,
      },
      // secret JWT do not share it with anyone even your CTO
     "Secret!@#",
      { expiresIn: "168h" }
    );
  };


  const authLocal = authenticate(
    "local",
    "Login email and/or password are wrong."
  );

  const authJwt = passport.authenticate("jwt", { session: false });

  export { authLocal, login , authJwt };
