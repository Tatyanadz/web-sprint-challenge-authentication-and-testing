const jwt = require("jsonwebtoken")
const priv = require("../config/private")

function getToken(user) {
    const payload = {
        id: user.id,
        username: user.username
    }
    const token = jwt.sign(payload, priv.jwtPrivate)
    return token
}

module.exports = getToken