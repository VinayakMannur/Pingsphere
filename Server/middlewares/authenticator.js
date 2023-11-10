var jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.TOCKEN_SECRET;

const authenticate = (req, res, next) => {
    try {
        const token = req.header('authToken')

        if(!token){
            return res.status(401).send({msg:"Please authenticate using valid token"});
        }
        
        const data = jwt.verify(token, JWT_SECRET);
        try {
            if(data){
                req.user = data.user
                next()
            }
            else{
                return res.status(401).send({msg:"Please authenticate using valid token"});
            }
        } catch (error) {
            return res.status(401).send({msg:"Please authenticate using valid token"});
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).send({status: "error", msg: "Invalid Token" })
    }
    
}

module.exports = authenticate;