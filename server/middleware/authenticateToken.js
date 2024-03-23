

// const jwt = require('jsonwebtoken');

// const authenticateToken =  (req, res, next) => {

//     console.log("line number 7");
//     // console.log(req);
//     const authHeader = req.get('Authorization');

//     const token = authHeader && authHeader.split(' ')[1]; // Bearer Token

//     if (token == null) return res.sendStatus(401); // No token, unauthorized


//     console.log("Auth header: ", authHeader);

//     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {

//         console.log("Decoded user:", user);
//         if (err) return res.sendStatus(403); // Token not valid

//         console.log("Extracted user from token: ", user)

//         req.user = user;
        
//         // Check if roles array includes the user's role
//         if (roles.length && !roles.includes(user.role)) {
//             return res.sendStatus(403); // Forbidden access if user's role not in the roles array
//         }

//         next();
//     });
// };



// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    console.log("line number 7");
    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // Bearer Token

    if (token == null) {
        return res.sendStatus(401); // No token, unauthorized
    }

    console.log("Auth header: ", authHeader);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log("Decoded user:", user);
        if (err) {
            return res.sendStatus(403); // Token not valid
        }

        console.log("Extracted user from token: ", user);
        req.user = user;
        
        next();
    });
};

module.exports = authenticateToken;
