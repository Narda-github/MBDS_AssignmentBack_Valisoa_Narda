const authService = require('../services/etudiant.service');

function login(req, res) {
  authService.authenticate(req, res);
}
async function my_assignement_id(req, res) {
  await authService.getAssignment(req, res);
}
async function my_assignement_all(req, res) {
  await authService.getAssignments(req, res);
}
async function generateSampleData(req, res) {
  try {
    await authService.generateSampleData();
    res.status(200).send('Données générées avec succès');
  } catch (error) {
    res.status(500).send('Erreur lors de la génération des données : ' + error.message);
  }
}
module.exports = {
  login,
  generateSampleData,
  my_assignement_id,
  my_assignement_all
};