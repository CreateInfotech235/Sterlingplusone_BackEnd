const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.headers.token;
    console.log(token);
    try {
        console.log(token);
        if (!token) {
            throw new Error("No token provided 222");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (!decoded) {
            throw new Error("Invalid token2333");
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "Failed",
            message: error.message
        });
    }
};