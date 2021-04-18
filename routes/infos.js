const express = require('express');
const app = express.Router();
var utilisateur = require('../utilisateurs');
const firebase = require('../db');
const firestore = firebase.firestore();

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
app.get('/', async (req, res) => {
	try {
		const utilisateurs = await firestore.collection('utilisateurs');
		const data = await utilisateurs.get();
		var usersArray = [];
		if (data.emty) {
			res.status(404).send('No users found');
		} else {
			usersArray = utilisateur.listerUtilisateurs(data, usersArray);
			res.status(200).json(usersArray);
			console.log(usersArray);
		}
	} catch (error) {
		res.status(500).send(error.message);
	}
});

//Get one
app.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const user = await firestore.collection('utilisateurs').doc(id);
		const data = await user.get();
		if (!data.exists) {
			res.status(404).json('Utilisateur not found');
		} else {
			res.status(200).json(data.data());
		}
	} catch (error) {
		res.send(error.message);
	}
});

// Create
app.post('/', async (req, res) => {
	try {
		const data = req.body;
		await firestore.collection('utilisateurs').doc().set(data);
		res.status(201).json(data);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Update
app.put('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const data = req.body;
		const user = await firestore.collection('utilisateurs').doc(id);
		await user.update(data);
		res.status(201).json('Utilisateur mis à jour successfuly');
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Delete
app.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const user = await firestore.collection('utilisateurs').doc(id);
		const data = await user.get();
		if (!data.exists) {
			res.status(404).json('Utilisateur not found');
		} else {
			await firestore.collection('utilisateurs').doc(id).delete();
			res.status(200).json('Utilisateur supprimé successfuly');
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
});

/* // Get all
app.get('/', (req, res) => {
	// Obtenir la liste des utilisateurs
	var objres = utilisateur.listerUtilisateurs();

	if (typeof objres[0] === 'undefined' || typeof objres[0] === []) {
		res.status(500).json("La liste n'existe pas");
	} else {
		res.status(200).json(objres);
	}
});

//Get one
app.get('/:nom', (req, res) => {
	// Récupérer le nom dans paramètres
	var nom = req.params.nom;

	// recupérer l'utilisateur
	var ut = utilisateur.getUtilisateur(nom);

	// Retourner l'utilisateur au client
	if (typeof ut.nom === 'undefined' || typeof ut.nom === {}) {
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
	if (typeof objres.nom === 'undefined' || typeof objres.nom === '{}') {
		res.status(400).json('Utilisateur existe déjà');
	} else {
		res.status(201).json(objres);
	}
});

// Update
app.put('/', function (req, res) {}); 

// Delete
app.delete('/:nom', function (req, res) {
	// Récupérer le nom dans les paramètres
	var nom = req.params.nom;

	// Supprimer l'utilisateur et récupérer le code retour
	var objres = utilisateur.supprimerUtilisateur(nom);

	//Retour au client
	if (objres == 0) {
		res.status(500).json("L'utilisateur n'existe pas");
	} else {
		res.status(200).json("L'utilisateur est supprimé");
	}
}); */

module.exports = app;
