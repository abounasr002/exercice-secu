"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TodoController_1 = require("../controllers/TodoController");
const verifyTokenMiddleware_1 = require("../middleware/verifyTokenMiddleware");
const router = express_1.default.Router();
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Créer une nouvelle tâche Todo
 *     description: Crée une nouvelle tâche associée à l'utilisateur authentifié via un token JWT.
 *     tags:
 *       - Todo
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - task
 *             properties:
 *               task:
 *                 type: string
 *                 example: "Acheter du lait"
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c85"
 *                 task:
 *                   type: string
 *                   example: "Acheter du lait"
 *                 userId:
 *                   type: string
 *                   example: "60d21b4667d0d8992e610c99"
 *       400:
 *         description: Champ task manquant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "champs task requis"
 *       401:
 *         description: Utilisateur non authentifié (token JWT manquant ou invalide)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Non autorisé"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.post('/', verifyTokenMiddleware_1.verifyTokenMiddleware, TodoController_1.createTodo);
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Récupérer toutes les tâches Todo
 *     description: Retourne la liste de toutes les tâches disponibles dans la base de données. Nécessite une authentification via JWT.
 *     tags:
 *       - Todo
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tâches récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c85"
 *                   task:
 *                     type: string
 *                     example: "Acheter du lait"
 *                   userId:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c99"
 *       401:
 *         description: Utilisateur non authentifié (token JWT manquant ou invalide)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Non autorisé"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.get('/', verifyTokenMiddleware_1.verifyTokenMiddleware, TodoController_1.getAllTodos);
/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Modifier une tâche Todo
 *     description: Marque une tâche comme complétée. Nécessite une authentification via JWT.
 *     tags:
 *       - Todo
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche à mettre à jour
 *     responses:
 *       200:
 *         description: Tâche mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todo mise à jour avec succès"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d21b4667d0d8992e610c85"
 *                     task:
 *                       type: string
 *                       example: "Acheter du lait"
 *                     completed:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: ID manquant dans la requête
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ID requis pour mettre à jour une todo"
 *       404:
 *         description: Tâche non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Todo non trouvée"
 *       401:
 *         description: Utilisateur non authentifié (token JWT manquant ou invalide)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Non autorisé"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne"
 */
router.put('/:id', verifyTokenMiddleware_1.verifyTokenMiddleware, TodoController_1.modifyTodo);
/**
 * @swagger
 * /todos/false:
 *   get:
 *     summary: Récupérer toutes les tâches incomplètes
 *     description: "Retourne la liste de toutes les tâches Todo qui ne sont pas encore complétées (`completed: false`). Nécessite une authentification via JWT."
 *     tags:
 *       - Todo
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tâches incomplètes récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c85"
 *                   task:
 *                     type: string
 *                     example: "Acheter du lait"
 *                   completed:
 *                     type: boolean
 *                     example: false
 *                   userId:
 *                     type: string
 *                     example: "60d21b4667d0d8992e610c99"
 *       401:
 *         description: Utilisateur non authentifié (token JWT manquant ou invalide)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Non autorisé"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.get('/false', verifyTokenMiddleware_1.verifyTokenMiddleware, TodoController_1.getAllFalses);
/**
 * @swagger
 * /todos/fromUser:
 *   get:
 *     summary: Récupérer toutes les tâches d'un utilisateur
 *     description: Retourne la liste de toutes les tâches Todo associées à l'utilisateur authentifié via son token JWT.
 *     tags:
 *       - Todo
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tâches de l'utilisateur récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "todos de l'user : 60d21b4667d0d8992e610c99"
 *                 todos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c85"
 *                       task:
 *                         type: string
 *                         example: "Acheter du lait"
 *                       completed:
 *                         type: boolean
 *                         example: false
 *                       userId:
 *                         type: string
 *                         example: "60d21b4667d0d8992e610c99"
 *       400:
 *         description: Problème avec le payload du token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "payload incorrect"
 *       401:
 *         description: Utilisateur non authentifié (token JWT manquant ou invalide)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Non autorisé"
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erreur interne du serveur"
 */
router.get('/fromUser', verifyTokenMiddleware_1.verifyTokenMiddleware, TodoController_1.getAllFromUser);
exports.default = router;
