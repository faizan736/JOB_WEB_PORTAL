// secret key for generating the json web token

require("dotenv").config();

module.exports = {
	jwtSecretKey: process.env.SECRET_KEY,
};
