"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = verifyTokenMiddleware;
const JWTUtils_1 = require("../utils/JWTUtils");
//la clé secrète est nécessaire pour decrypter le token
const SECRET_KEY = process.env.JWT_SECRET;
function verifyTokenMiddleware(req, res, next) {
    if (!SECRET_KEY) {
        throw new Error("JWT_SECRET non présente dans les variables d'environnement");
    }
    const cookie = req.headers.cookie;
    if (!cookie) {
        res.status(401).json({ message: "Access denies. COokie missing" });
        return;
    }
    //le cookie contient une donnée sous la forme jwt=....
    const token = cookie.split('=')[1];
    console.log(token);
    //Vérifier si le token est présent
    if (!token) {
        res.status(401).json({ message: 'Access Denied. Token Missing.' });
        return;
    }
    try {
        //Vérifier le token
        const decoded = (0, JWTUtils_1.verifyToken)(token);
        //on ajoute les données décodées dans la requête
        req.headers.payload = JSON.stringify(decoded);
        //passer au middleware suivant (ou au contrôleur)
        next();
        if (!decoded) {
            res.status(401).send({ message: 'Token invalide ou expiré' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
