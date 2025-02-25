"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const pwdUtils_1 = require("../utils/pwdUtils");
const User_1 = __importDefault(require("../DBSchemas/User"));
const JWTUtils_1 = require("../utils/JWTUtils");
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, age } = req.body;
            if (!name || !email || !password) {
                res.status(400).send({ message: 'champs name, email et password obligatoires' });
                return;
            }
            const hashedPassword = yield (0, pwdUtils_1.hashPassword)(password);
            const newUser = new User_1.default({ name, email, hashedPassword, age });
            const createdUser = yield newUser.save();
            createdUser.hashedPassword = '';
            res.status(201).send({ message: 'Utilisateur créé avec succès', user: createdUser });
        }
        catch (err) {
            //erreur de duplication
            if (err.code === 11000) {
                res.status(400).send({ message: "email ou nom déjà existant." });
                return;
            }
            else {
                res.status(500).send({ message: err.message });
            }
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                res.status(400).send({ message: 'champs email et password obligatoires' });
                return;
            }
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                res.status(404).send({ message: 'utilisateur non trouvé' });
                return;
            }
            const isPasswordValid = yield (0, pwdUtils_1.verifyPassword)(password, user.hashedPassword);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Mot de passe invalide' });
                return;
            }
            const token = (0, JWTUtils_1.generateToken)({ id: user._id });
            //Envoyer le token dans un cookier sécurisé,
            //le cookie n'est pas accesible par le client et ne peut être enbvoyé qu'à son émetteur
            res.cookie('jwt', token, { httpOnly: true, sameSite: 'strict' });
            res.status(200).json({ message: 'Login succesful!' });
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }
    });
}
