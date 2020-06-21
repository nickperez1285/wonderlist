const jwt = require("jsonwebtoken");

function authorized(role = "authorized") {
  return async (req, res, next) => {
    const authError = {
      message: "You Are Not Authorized To Do That",
    };

    try {
      const token = req.cookies.token;

      if (!token) {
        res.status(401).json("authError");
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err || decodedPayload.role !== role) {
          return res.status(401).json(authError);
        }
        req.token = decodedPayload;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = authorized;
