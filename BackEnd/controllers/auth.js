require("dotenv").config();
const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

module.exports = {
  async createUser(req, res) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      cnfpassword: Joi.string().required(),
    });
    let { error, value } = schema.validate(req.body);
    if (error && error.details) {
      return res.status(500).json({ msg: error.details });
    }
    const { email, password, cnfpassword } = value;
    const userEmail = await User.findOne({ email });
    if (userEmail) {
      return res.status(403).json({ message: "Email Already exists" });
    }
    return bcrypt.hash(password, 10, (err, hashed) => {
      if (err) throw err;

      if (password !== cnfpassword) {
        return res.status(403).json({ message: "Password Does not match" });
      }
      const user = new User({
        email,
        password: hashed,
      });
      user
        .save()
        .then((user) => {
          const token = jwt.sign({ data: user }, process.env.jwt_secret, {
            expiresIn: "5h",
          });
          res
            .status(201)
            .json({ message: "Account created successfully", user, token });
        })
        .catch((err) => {
          return res.status(403).json({ message: "Error in account creating" });
        });
    });
  },

  // Login method
  LoginUser(req, res) {
    const {email, password} = req.body;
    if(!email || !password) {
      return res.status(403).json({message: 'No empty fields allowed'})
    }
      User.findOne({email}).then(user => {
        if(!user) {
          return res.status(404).json({message: 'Invalid credentials'})
        }
        return bcrypt.compare(password, user.password).then(result => {
          if(!result) {
            return res.status(404).json({message: 'Invalid credentials!'})
          }
          const token = jwt.sign({data: user}, process.env.jwt_secret, {
            expiresIn: '5h'
          })
          res.status(200).json({message: 'Login Successfully...', user, token})
        })
      }).catch(err => {
        return res.status(403).json({message: 'Error Occured', err})
      })
  },
};
