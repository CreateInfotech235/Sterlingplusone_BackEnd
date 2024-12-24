const HeroOurTeam = require("../../models/heroOurTeam.schema");

// Create a new HeroOurTeam
exports.createHeroOurTeam = async (req, res) => {
  try {
  const data =req.body

    if (!heroOurTeam.maintitle || !heroOurTeam.teamMember) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a HeroOurTeam already exists
    const existingHeroOurTeam = await HeroOurTeam.findOne({});

    if (existingHeroOurTeam) {
      // Update existing HeroOurTeam instead of creating new one
      const updatedHeroOurTeam = await HeroOurTeam.findByIdAndUpdate(
        existingHeroOurTeam._id,
        { 
          heroOurTeam: {
            maintitle,
            teamMember
          }
        },
        { new: true }
      );
      return res.status(200).json(updatedHeroOurTeam);
    }

    // If no existing HeroOurTeam, create new one
    const heroOurTeam = new HeroOurTeam({
      heroOurTeam: {
        maintitle,
        teamMember
      }
    });

    const savedHeroOurTeam = await heroOurTeam.save();
    res.status(201).json(savedHeroOurTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all HeroOurTeams
exports.getHeroOurTeams = async (req, res) => {
  try {
    const heroOurTeams = await HeroOurTeam.find();
    res.status(200).json(heroOurTeams);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a HeroOurTeam by ID
exports.getHeroOurTeamById = async (req, res) => {
  try {
    const heroOurTeam = await HeroOurTeam.findById(req.params.id);
    if (!heroOurTeam) return res.status(404).json({ message: "HeroOurTeam not found" });
    res.status(200).json(heroOurTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update HeroOurTeam
exports.updateHeroOurTeam = async (req, res) => {
  try {
    const { maintitle, teamMember } = req.body;
    const updatedHeroOurTeam = await HeroOurTeam.findByIdAndUpdate(
      req.params.id,
      { 
        heroOurTeam: {
          maintitle,
          teamMember
        }
      },
      { new: true }
    );
    if (!updatedHeroOurTeam)
      return res.status(404).json({ message: "HeroOurTeam not found" });
    res.status(200).json(updatedHeroOurTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete HeroOurTeam
exports.deleteHeroOurTeam = async (req, res) => {
  try {
    const deletedHeroOurTeam = await HeroOurTeam.findByIdAndDelete(req.params.id);
    if (!deletedHeroOurTeam)
      return res.status(404).json({ message: "HeroOurTeam not found" });
    res.status(200).json({ message: "HeroOurTeam deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
