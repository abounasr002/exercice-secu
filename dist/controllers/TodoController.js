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
exports.createTodo = createTodo;
exports.getAllTodos = getAllTodos;
exports.modifyTodo = modifyTodo;
exports.getAllFalses = getAllFalses;
exports.getAllFromUser = getAllFromUser;
const Todo_1 = __importDefault(require("../DBSchemas/Todo"));
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = JSON.parse(req.headers.payload);
            const userId = payload.id;
            const { task } = req.body;
            //Validation des champs
            if (!task) {
                res.status(400).send({ message: "champs task requis" });
                return;
            }
            const newTodo = new Todo_1.default({ task, userId });
            const updatedTodo = yield newTodo.save();
            res.status(201).send(updatedTodo);
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }
    });
}
function getAllTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield Todo_1.default.find();
            res.status(200).send(todos);
        }
        catch (err) {
            res.status(500).send({ message: "err.message" });
        }
    });
}
function modifyTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params; // Récupérer l'ID depuis les paramètres de la requête
            // Validation des champs 
            if (!id) {
                res.status(400).json({ message: 'ID requis pour mettre à jour une todo' });
                return;
            }
            // Mise à jour des champs
            const updatedTodo = yield Todo_1.default.findByIdAndUpdate(id, // ID de l'utilisateur à mettre à jour
            { completed: true }, // Champs à mettre à jour
            { new: true, runValidators: true } // Options : retourner la nouvelle todo et valider les données
            );
            if (!updatedTodo) {
                res.status(404).json({ message: 'Todo non trouvée' });
                return;
            }
            // Réponse réussie
            res.status(200).json({ message: 'Todo mise à jour avec succès', data: updatedTodo });
        }
        catch (err) {
            // Gestion des erreurs
            res.status(500).json({ message: 'Erreur interne', error: err.message });
        }
    });
}
function getAllFalses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todos = yield Todo_1.default.find({ completed: false });
            res.status(200).send(todos);
        }
        catch (err) {
            res.status(500).send({ message: "err.message" });
        }
    });
}
function getAllFromUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payload = JSON.parse(req.headers.payload);
            const id = payload.id;
            if (!payload || !id) {
                res.status(400).send({ message: "payload incorrect" });
            }
            const todos = yield Todo_1.default.find({ userId: id });
            res.status(200).send({ message: "todos de l'user : " + id, todos: todos });
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    });
}
