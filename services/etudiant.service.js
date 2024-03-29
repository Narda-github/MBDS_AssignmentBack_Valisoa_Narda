
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let mongoose = require('mongoose');
const Student = require('../models/assignment');
const Stu = mongoose.model('Student', Student.studentSchema);
const { ObjectId } = require('mongodb');

async function authenticate(req, res, next) {
  console.log("calling authenticate .....");
  try {
    const {pseudo,mdp} = req.body;
    /* Student.findOne({ "pseudo": req.body.pseudo })
      .then(user => {
          console.log("in findOne .....");
          if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          if (user.mdp ===req.body.mdp){
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
              )
            });
          }
          
        })
      .catch(error => res.status(500).json({ error:error.message+"ro" }));*/
    console.log(req.body);
    const user = await Student.findOne({ "pseudo": pseudo , "mdp": mdp});
    if(!user){
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }else{
      console.log("user OK");
      res.status(200).json({
        userId: user._id,
        token: jwt.sign(
            { userId: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
        )
      });
    }
  } catch (error) {
    //res.status(400).json({ message: error.message });
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}

async function getAssignment(req, res, next) {
  try {
    const assignmentId = req.body.assiId;
    const student = await Stu.findOne({ "pseudo": req.body.pseudo });

    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    const Id = ObjectId(assignmentId);
    const assignment = student.assignments.find(a => a._id.equals(Id));

    if (!assignment) {
      return res.status(404).json({ message: "Assignement non trouvé pour cet étudiant" });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
async function getAssignments(req, res, next) {
  try {
    const student = await Student.findOne({ "pseudo": req.body.pseudo });

    if (!student) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }
    const assignments = student.assignments;
    console.log("assignements de "+ req.body.pseudo);
    console.log(assignments);

    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ message: "Aucun assignement trouvé pour cet étudiant" });
    }
    res.status(200).json(assignments);
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
          mdp: "$2b$10$QyZT1F/f/GFY22Ou6O7xU.vNdEeT1Y1Cymje/BhRq6fYjQTTDrLF6",
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
        {
          pseudo: 'etudiant2',
          mdp: "$2b$10$erOVr7DTZu6iBbBoV9Gpp.wRXNOjmxgJzQWJShG3CJzhkL4zH5sFy",
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
              remarques: 'Mediocre!'
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
              remarques: 'Fais un effort'
            }
          ]
        }
        // Répétez le modèle pour les deux autres étudiants
        // ...
      ];
  
      await Student.create(studentsData);
  
      console.log('Données générées avec succès');
    } catch (error) {
      console.error('Erreur lors de la génération des données :', error);
      throw error;
    }
  }
  function hashString(inputString) {
    try {
        const saltRounds = 10;
        const hashedString = bcrypt.hash(inputString, saltRounds);
        console.log(hashedString.toString())
        return hashedString.toString();
    } catch (error) {
        console.error("Erreur lors du hachage de la chaîne:", error);
        throw error;
    }
}
/**
 * input
 * {
 *    pseudo 
 *    assignment : Assignement obj
 * }
 * *exemple**
 * {
   "pseudo":"etudiant1",
   "addAssignment":
      {
         "id":"1",
         "dateDeRendu":"2024-03-23",
         "titre":"Nouveau update",
         "rendu":true,
         "auteur":{
            "nom":"Auteur 1",
            "photo":"/chemin/vers/photo1.jpg",
            "email":"auteur1@email.com"
         },
         "matiere":{
            "titre":"Matiere 2",
            "prof":{
               "nom":"Professeur 2",
               "photo":"/chemin/vers/photo_prof1.jpg",
               "email":"prof1@email.com"
            }
         },
         "remarques":"Très bien fait!"
      }
      }
*
*OUTPUT
*message
*"1  assignment ajouté pour + pseudo"
 */
async function addAssignmentByStudent(req,res){
  try{
    const {pseudo,addAssignment } = req.body;
    const student =  await Student.findOne({pseudo : pseudo});
    if(!student){
      return res.status(401).json({ error: 'Etudiant non trouvé !' });
    }
    let studentAssignment = student.assignments;
    studentAssignment.push(addAssignment);
    await Student.updateOne({pseudo:pseudo},{assignments:studentAssignment})
    .then(response => {
      res.status(200).json(response.nModified+"  assignment ajouté pour "+pseudo);
    }).catch(error => {
      console.log(error);
      res.status(500).send({message :"Ajout Assignement erreur  : "+error});
    });
  }catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}
  
module.exports = {
    addAssignmentByStudent,
    generateSampleData,
    authenticate,
    getAssignment,
    getAssignments

};
