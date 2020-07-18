require("dotenv").config()

module.exports = {
    jwtPrivate: process.env.JWT_SECRET || "it's private"
}