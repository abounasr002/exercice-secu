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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const TodoRoutes_1 = __importDefault(require("./routes/TodoRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const swagger_1 = __importDefault(require("./config/swagger"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
//Création serveur express
const app = (0, express_1.default)();
//chargement des variables d'environnement
dotenv_1.default.config();
//Définition du port du serveurS
const PORT = process.env.PORT;
//COnfig du serveur par défaut
app.use(express_1.default.json());
// Active CORS pour toutes les origines
app.use((0, cors_1.default)());
//connecter MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGO_URI);
        console.log('MongoDB connecté avec succès');
    }
    catch (err) {
        console.error('Erreur lors de la connexion à MongoDB:', err);
        process.exit(1);
    }
});
connectDB();
//TODO ajouter routes ici
app.use('/todos', TodoRoutes_1.default);
app.use('/auth', AuthRoutes_1.default);
app.use('/users', UserRoutes_1.default);
// Route pour accéder au JSON brut
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.default);
});
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.default);
});
// Swagger route
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
console.log(process.env.NODE_ENV);
//app.listen indique au serveur d'écouter les requêtes HTTP arrivant sur le
//port indiqué
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
