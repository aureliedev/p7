/* IMPORT */ 
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const { signUpErrors, logInErrors } = require('../utils/errors');

const maxAge = 3 * 24 * 60 * 60 * 1000; // =24h
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

/*----------------- SIGNUP ---------------*/ 
module.exports.signUp = async (req, res) => {
    console.log("req.body", req.body);
  const {pseudo, email, password} = req.body
    
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).json({ user: user._id}); // renvoi l'user id 
  }
  catch(err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors })
  }
};

/*----------------- LOGIN ---------------*/ 
module.exports.login = async (req, res) => {
  console.log("req.body", req.body);
  const { email, password } = req.body

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } 
  catch (err) {
    const errors = logInErrors(err);
    res.status(200).send({ errors });
  }
};

/*----------------- DECONNECTION ---------------*/ 
module.exports.logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // maxAge: 1 miliseconde
  res.redirect('/');
};