const HeroPlans = require('../../models/heroPlans.schema');

// Create a new Hero Plans section
exports.createHeroPlans = async (req, res) => {
  try {
    const { heroPlans } = req.body;
    
    if (!heroPlans) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a HeroPlans section already exists
    const existingHeroPlans = await HeroPlans.findOne();

    if (existingHeroPlans) {
      // Update existing HeroPlans instead of creating new one
      const updatedHeroPlans = await HeroPlans.findByIdAndUpdate(
        existingHeroPlans._id,
        { heroPlans },
        { new: true }
      );
      return res.status(200).json(updatedHeroPlans);
    }

    // If no existing HeroPlans, create new one
    const heroPlansSection = new HeroPlans({
      heroPlans
    });

    const savedHeroPlans = await heroPlansSection.save();
    res.status(201).json(savedHeroPlans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Hero Plans sections
exports.getHeroPlans = async (req, res) => {
  try {
    const heroPlans = await HeroPlans.find();
    res.status(200).json(heroPlans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Hero Plans section by ID
exports.getHeroPlansById = async (req, res) => {
  try {
    const heroPlans = await HeroPlans.findById(req.params.id);
    if (!heroPlans) return res.status(404).json({ message: "Hero Plans section not found" });
    res.status(200).json(heroPlans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Hero Plans section
exports.updateHeroPlans = async (req, res) => {
  try {
    const { heroPlans } = req.body;
    const updatedHeroPlans = await HeroPlans.findByIdAndUpdate(
      req.params.id,
      { heroPlans },
      { new: true }
    );
    if (!updatedHeroPlans) return res.status(404).json({ message: "Hero Plans section not found" });
    res.status(200).json(updatedHeroPlans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Hero Plans section
exports.deleteHeroPlans = async (req, res) => {
  try {
    const deletedHeroPlans = await HeroPlans.findByIdAndDelete(req.params.id);
    if (!deletedHeroPlans) return res.status(404).json({ message: "Hero Plans section not found" });
    res.status(200).json({ message: "Hero Plans section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
