const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized!!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SCERET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unauthorized!!",
    });
  }
};

module.exports = auth;
