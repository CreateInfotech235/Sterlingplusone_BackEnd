const HeroChooseUs = require('../../models/heroChooseUs.schema');

// Create a new Hero Choose Us section
exports.createHeroChooseUs = async (req, res) => {
  try {
    const { heroChooseUs } = req.body;
    
    if (!heroChooseUs) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if any document already exists
    const existingHeroChooseUs = await HeroChooseUs.findOne();

    if (existingHeroChooseUs) {
      // If document exists, update it
      const updatedHeroChooseUs = await HeroChooseUs.findByIdAndUpdate(
        existingHeroChooseUs._id,
        { heroChooseUs },
        { new: true }
      );
      return res.status(200).json(updatedHeroChooseUs);
    }

    // If no document exists, create new one
    const heroChooseUsSection = new HeroChooseUs({
      heroChooseUs
    });

    const savedHeroChooseUs = await heroChooseUsSection.save();
    res.status(201).json(savedHeroChooseUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Hero Choose Us sections
exports.getHeroChooseUs = async (req, res) => {
  try {
    const heroChooseUs = await HeroChooseUs.find();
    res.status(200).json(heroChooseUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Hero Choose Us section by ID
exports.getHeroChooseUsById = async (req, res) => {
  try {
    const heroChooseUs = await HeroChooseUs.findById(req.params.id);
    if (!heroChooseUs) return res.status(404).json({ message: "Hero Choose Us section not found" });
    res.status(200).json(heroChooseUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Hero Choose Us section
exports.updateHeroChooseUs = async (req, res) => {
  try {
    const { heroChooseUs } = req.body;
    const updatedHeroChooseUs = await HeroChooseUs.findByIdAndUpdate(
      req.params.id,
      { heroChooseUs },
      { new: true }
    );
    if (!updatedHeroChooseUs) return res.status(404).json({ message: "Hero Choose Us section not found" });
    res.status(200).json(updatedHeroChooseUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Hero Choose Us section
exports.deleteHeroChooseUs = async (req, res) => {
  try {
    const deletedHeroChooseUs = await HeroChooseUs.findByIdAndDelete(req.params.id);
    if (!deletedHeroChooseUs) return res.status(404).json({ message: "Hero Choose Us section not found" });
    res.status(200).json({ message: "Hero Choose Us section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
