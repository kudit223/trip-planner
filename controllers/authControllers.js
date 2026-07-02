const User = require("../models/User");
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //User detail validations
    const schema = joi.object({
      name: joi.string().trim().min(3).max(50).required(),
      email: joi.string().email().trim().lowercase().required(),
      password: joi
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
        .required(),
    });

    const { error } = schema.validate({
      name,
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const isEmailExists = await User.findOne({ email });

    if (isEmailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!!",
      });
    }

    const hashPassword = await bcrypt.hash(password, Number(process.env.SALT));

    const userDetails = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      success: true,
      message: "User Created Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};
// login controller
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //user login information validation
    const schema = joi.object({
      email: joi.string().email().trim().lowercase().required(),
      password: joi
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
        .required(),
    });

    const { error } = schema.validate({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    //Extracting user details with password
    const userDetails = await User.findOne({ email }).select("+password");

    // if user not exists
    if (!userDetails) {
      res.status(400).json({
        success: false,
        message: "Invalid Email or Password!!",
      });
    }

    // verifying user password
    const isPasswordValid = await bcrypt.compare(
      password,
      userDetails.password,
    );

    if (!isPasswordValid) {
      res.status(400).json({
        success: false,
        message: "Invalid Email or Password!!",
      });
    }

    //token created
    const token = jwt.sign(
      {
        name: userDetails.name,
        id: userDetails._id,
        role: userDetails.role,
      },
      process.env.JWT_SCERET,
      { expiresIn: "2d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "Login Successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!!",
    });
  }
};
