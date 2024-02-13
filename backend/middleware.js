const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('./config');


const authMiddleware = (req , res , next) => {
    const authHeader = req.headers.authorization;
    // console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message : "invalid"
        })
    }

    const token = authHeader.split(' ')[1];
    console.log(token)

    try{
        const decoded = jwt.verify(token , JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({message : "wrong token"})
        }
        
    } catch(err){res.status(403).json({error : err})}
    
}

module.exports = {authMiddleware}