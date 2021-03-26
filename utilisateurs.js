var listeUtilisateurs = [];

// Constructeur pour les utilisateurs
function Utilisateur(nom, dateNaissance, password, email, date) {
	this.nom = nom;
	this.dateNaissance = dateNaissance;
	this.password = password;
	this.email = email;
	this.date = new Date();
}

function Utilisateur(utilisateur) {
	this.nom = utilisateur.nom;
	this.dateNaissance = utilisateur.dateNaissance;
	this.password = utilisateur.password;
	this.email = utilisateur.email;
	this.date = new Date();
}

// créer un nouveau utilisateur
var creerUtilisateur = function (utilisateur) {
	if (typeof listeUtilisateurs[utilisateur.nom] !== 'undefined') return {};
	else {
		// on le cree
		listeUtilisateurs[utilisateur.nom] = new Utilisateur(utilisateur);
		//console.log(listeUtilisateurs);
		return listeUtilisateurs[utilisateur.nom];
	}
};

var getUtilisateur = function (nom) {
	if (typeof listeUtilisateurs[nom] === 'undefined') return {};
	else return listeUtilisateurs[nom];
};

var supprimerUtilisateur = function (nom) {
	// s'il n'existe pas
	if (typeof listeUtilisateurs[nom] === 'undefined') return 0;
	else {
		delete listeUtilisateurs[nom];
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
