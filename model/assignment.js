let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

/*let AssignmentSchema = Schema({
    id: Number,
    dateDeRendu: Date,
    nom: String,
    rendu: Boolean
});*/
let AssignmentSchema = new Schema({
    id: Number,
    dateDeRendu: Date,
    titre: String,
    rendu: Boolean,
    auteur: {
      nom: String,
      photo: String, //chemin repertoire de stockage
      email: String
    },
    matiere: {
      titre: String,
      prof: {
        nom: String,
        photo: String, //chemin repertoire de stockage
        email: String
      }
    },
    note: Number,
    remarques: String
  });

AssignmentSchema.plugin(mongoosePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
// assignment est le nom de la collection dans la base de données
// Mongoose tolère certaines erreurs dans le nom (ex: Assignent au lieu de assignments)
module.exports = mongoose.model('assignments', AssignmentSchema);