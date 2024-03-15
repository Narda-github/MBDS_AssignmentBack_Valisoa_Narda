let mongoose = require('mongoose');
let Schema = mongoose.Schema;
//const mongoosePaginate = require('mongoose-aggregate-paginate-v2');

let AssignmentSchema = new Schema({
    id: Number,
    dateDeRendu: Date,
    titre: String,
    rendu: Boolean,
    auteur: {
      nom: String,
      photo: String,
      email: String
    },
    matiere: {
      titre: String,
      prof: {
        nom: String,
        photo: String,
        email: String
      }
    },
    note: Number,
    remarques: String
  });
  const studentSchema = new mongoose.Schema({
    pseudo: { type: String, required: true },
    mdp: { type: String, required: true },
    assignments: [AssignmentSchema]
  });
  module.exports = mongoose.model('Student', studentSchema);
//module.exports = mongoose.model('assignments', AssignmentSchema);
//AssignmentSchema.plugin(mongoosePaginate);
//studentSchema.plugin(mongoosePaginate);
//module.exports = mongoose.model('assignments', AssignmentSchema);
