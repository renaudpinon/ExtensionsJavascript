# Tests unitaires

Ce dossier contient les tests unitaires pour les fichiers standard.js et extensions.js. Les tests sont effectués par le composant javascript QUnit (https://code.jquery.com/qunit/qunit-2.4.1.js).

# Utilisation

Ouvrir le fichier tests.html dans un navigateur : l'interface affiche l'état des tests unitaires réussis ou échoués.
Note: nécessite un accès Internet.

# Fonctionnement

Charge les fichiers test_extension.js et test_standard.js du dossier testComponents. Pour rajouter un composant de test, créer un nouveau fichier, insérer la structure:

QUnit.module('MON_MODULE', function() {

  QUnit.test('MA_METHODE()', assert => {
  	// TODO: tests à insérer.
  });

  // TODO: Autres méthodes à tester...
};

