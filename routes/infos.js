const express = require('express');
const app = express.Router();
var utilisateur = require('../utilisateurs');

// Pour éviter des erreurs
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	next();
});

// Get all
app.get('/', (req, res) => {
	// Obtenir la liste des utilisateurs
	var objres = utilisateur.listerUtilisateurs();

	if (typeof objres === 'undefined' || typeof objres === []) {
		res.status(500).json("La liste n'existe pas");
	} else {
		res.status(200).json(objres);
	}
});

//Get one
app.get('/:id', (req, res) => {
	// Récupérer l'id dans paramètres
	var id = req.params.id;

	// recupérer l'utilisateur
	var ut = utilisateur.getUtilisateur(id);

	// Retourner l'utilisateur au client
	if (typeof ut === 'undefined' || typeof ut === {}) {
		res.status(404).json('Utilisateur not found');
	} else {
		res.status(200).json(ut);
	}
});

// Create
app.post('/', (req, res) => {
	// Récupérer l'utilisateur du corps de ce que le client envoie
	var ut = req.body;

	// Création de l'utilisateur
	var objres = utilisateur.creerUtilisateur(ut);

	// Retourner l'utilisateur au client
	if (typeof objres === 'undefined' || typeof objres === {}) {
		res.status(400);
	} else {
		res.status(201).json(objres);
	}
});

/* // Update
app.put('/', function (req, res) {}); */

// Delete
app.delete('/:id', function (req, res) {
	// Récupérer l'id dans les paramètres
	var id = req.params.id;

	// Supprimer l'utilisateur et récupérer le code retour
	var objres = utilisateur.supprimerUtilisateur(id);

	//Retour au client
	if (objres == 0) {
		res.status(500).json("L'utilisateur n'existe pas");
	} else {
		res.status(200).json("L'utilisateur est supprimé");
	}
});

module.exports = app;