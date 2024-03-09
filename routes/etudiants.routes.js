const express = require('express');
const router = express.Router();
const authController = require('../controllers/etudiant.controller');
const authService = require('../services/etudiant.service');

router.post('/login', authService.authenticate, authController.login);
router.get('/generate', authService.generateSampleData, authController.generateSampleData);

module.exports = router;


let Assignment = require('../models/assignment');

function getAssignments(req, res){
    let aggregateQuery = Assignment.aggregate();

    Assignment.aggregatePaginate(
        aggregateQuery, 
        {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10
        },
        (err, data) => {
            if(err){
                res.send(err)
            }
            console.log("data");
            console.log(data);
            res.send(data);
        }
    );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;
    Assignment.findById(assignmentId, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })

    /*
    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
    */
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.titre = req.body.titre;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.auteur = req.body.auteur;
    assignment.auteur.nom = req.body.auteur.nom;
    assignment.auteur.photo = req.body.auteur.photo;
    assignment.auteur.email  = req.body.auteur.email;
    assignment.matiere = req.body.matiere;
    assignment.matiere.titre  = req.body.matiere.titre;
    assignment.matiere.prof  = req.body.matiere.prof;
    assignment.matiere.prof.nom = req.body.matiere.prof.nom;
    assignment.matiere.prof.email = req.body.matiere.prof.email;
    assignment.matiere.prof.photo = req.body.matiere.prof.photo;
    assignment.note = req.body.note;
    assignment.remarques = req.body.remarques; 
  
    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.titre} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({message: `${assignment.titre} deleted`});
    })
}



//module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
