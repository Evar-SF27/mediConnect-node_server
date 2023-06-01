const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.user = decoded.info.id
            req.email = decoded.info.email
            if (decoded.info?.role) {
                req.role = decoded.info.role
            }
            if (decoded.info?.is_admin) {
                req.is_admin = decoded.info.is_admin
            }
            if (decoded.info?.is_superuser) {
                req.is_superuser = decoded.info.is_superuser
            }
            next()
        }
    )
}

module.exports = verifyJWT 