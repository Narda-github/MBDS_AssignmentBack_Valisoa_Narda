const authService = require('../services/etudiant.service');

async function login(req, res) {
  res.json({ student: req.student, token: req.token });
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
  generateSampleData
};