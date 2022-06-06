const jwt = require("jsonwebtoken");
const UserModel = require("../models/users.model");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;

    if (token) {      
      decodedData = jwt.verify(token, process.env.PRIVATE_KEY);
      req.user = await UserModel.findById(decodedData?.id).select("-password");
      req.userId = decodedData?.id;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
    auth
}