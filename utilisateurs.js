var listeUtilisateurs = [];
var count = 0;

// Constructeur pour les utilisateurs
function Utilisateur(id, nom, dateNaissance, date) {
	this.id = id;
	this.nom = nom;
	this.dateNaissance = dateNaissance;
	this.date = new Date();
}

function Utilisateur(utilisateur) {
	this.id = utilisateur.id;
	this.nom = utilisateur.nom;
	this.dateNaissance = utilisateur.dateNaissance;
	this.date = new Date();
}

// créer un nouveau utilisateur
var creerUtilisateur = function (utilisateur) {
	if (typeof listeUtilisateurs[utilisateur.id] !== 'undefined') return {};
	else {
		// on le cree
		utilisateur.id = count;
		listeUtilisateurs[utilisateur.id] = new Utilisateur(utilisateur);
		count++;
		//console.log(listeUtilisateurs);
		return listeUtilisateurs[utilisateur.id];
	}
};

var getUtilisateur = function (id) {
	if (typeof listeUtilisateurs[id] === 'undefined') return {};
	else return listeUtilisateurs[id];
};

var supprimerUtilisateur = function (id) {
	// s'il n'existe pas
	if (typeof listeUtilisateurs[id] === 'undefined') return 0;
	else {
		delete listeUtilisateurs[id];
		return 1;
	}
};

var listerUtilisateurs = function () {
	return Object.values(listeUtilisateurs);
};

exports.creerUtilisateur = creerUtilisateur;
exports.getUtilisateur = getUtilisateur;
exports.supprimerUtilisateur = supprimerUtilisateur;
exports.listerUtilisateurs = listerUtilisateurs;
exports.listeUtilisateurs = listeUtilisateurs;
