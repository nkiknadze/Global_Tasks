const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: "ტოკენი არ არსებობს" });
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        // აქ ვარდება შენი შეცდომა
        res.status(403).json({ message: "არავალიდური ტოკენი" });
    }
};

module.exports = { authMiddleware };