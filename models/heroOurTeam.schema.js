var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const heroOurTeam = new Schema({
    maintitle: {
      type: String,
      required: true,
    },
    teamMember: [
      {
        img: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        experience: {
          type: String,
          required: true,
        },
      },
    ],
  });
var heroOurTeamSchema = new Schema({
    heroOurTeam: heroOurTeam,
});

module.exports = mongoose.model("heroOurTeam", heroOurTeamSchema );
