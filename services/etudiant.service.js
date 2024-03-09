
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Student = require('../models/assignment');

async function authenticate(req, res, next) {
  try {
    const { pseudo, mdp } = req.body;
    const student = await Student.findOne({ pseudo });

    if (!student || !bcrypt.compareSync(mdp, student.mdp)) {
      throw new Error('Pseudo ou mot de passe incorrect');
    }

    const token = jwt.sign({ sub: student.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    req.student = student;
    req.token = token;

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function generateSampleData() {
    try {
      await Student.deleteMany();
  
      const studentsData = [
        {
          pseudo: 'etudiant1',
          mdp: 'motdepasse1',
          assignments: [
            {
              id: 1,
              dateDeRendu: new Date('2024-03-10'),
              titre: 'Assignement 1',
              rendu: true,
              auteur: {
                nom: 'Auteur 1',
                photo: '/chemin/vers/photo1.jpg',
                email: 'auteur1@email.com'
              },
              matiere: {
                titre: 'Matiere 1',
                prof: {
                  nom: 'Professeur 1',
                  photo: '/chemin/vers/photo_prof1.jpg',
                  email: 'prof1@email.com'
                }
              },
              note: 18,
              remarques: 'Très bien fait!'
            },
            {
              id: 2,
              dateDeRendu: new Date('2024-03-15'),
              titre: 'Assignement 2',
              rendu: false,
              auteur: {
                nom: 'Auteur 1',
                photo: '/chemin/vers/photo1.jpg',
                email: 'auteur1@email.com'
              },
              matiere: {
                titre: 'Matiere 2',
                prof: {
                  nom: 'Professeur 2',
                  photo: '/chemin/vers/photo_prof2.jpg',
                  email: 'prof2@email.com'
                }
              },
              note: null,
              remarques: ''
            }
          ]
        },
        // Répétez le modèle pour les deux autres étudiants
        // ...
      ];
  
      await Student.create(studentsData);
  
      console.log('Données générées avec succès');
    } catch (error) {
      console.error('Erreur lors de la génération des données :', error);
      throw error; // Propagez l'erreur pour la gérer en dehors de ce service si nécessaire
    }
  }
  
  
module.exports = {
    generateSampleData,
    authenticate
};
