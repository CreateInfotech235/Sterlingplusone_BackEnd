const Hero = require('../../models/hero.schema'); // Import the Hero model

// Create a new Hero Section
exports.createHeroSection = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    // Check if heroSectionData exists and has the required fields
    const { heroSectionData } = req.body;
    if (!heroSectionData || !heroSectionData.title || !heroSectionData.subTitle || !heroSectionData.description || !heroSectionData.button || !heroSectionData.button.name || !heroSectionData.button.link) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a Hero section already exists
    const existingHero = await Hero.findOne();

    if (existingHero) {
      // Update existing Hero instead of creating new one
      const updatedHero = await Hero.findByIdAndUpdate(
        existingHero._id,
        { heroSectionData },
        { new: true }
      );
      return res.status(200).json(updatedHero);
    }

    // If no existing Hero, create new one
    const heroData = new Hero({
      heroSectionData: heroSectionData,
    });

    const savedHero = await heroData.save();
    res.status(201).json(savedHero);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};


// Get all Hero Sections
exports.getHeroSections = async (req, res) => {
  try {
    const heroes = await Hero.find();
    res.status(200).json(heroes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Hero Section by ID
exports.getHeroSectionById = async (req, res) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (!hero) return res.status(404).json({ message: "Hero Section not found" });
    res.status(200).json(hero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Hero Section
exports.updateHeroSection = async (req, res) => {
  try {
    const { heroSectionData } = req.body;
    const updatedHero = await Hero.findByIdAndUpdate(req.params.id, heroSectionData, { new: true });
    if (!updatedHero) return res.status(404).json({ message: "Hero Section not found" });
    res.status(200).json(updatedHero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Hero Section
exports.deleteHeroSection = async (req, res) => {
  try {
    const deletedHero = await Hero.findByIdAndDelete(req.params.id);
    if (!deletedHero) return res.status(404).json({ message: "Hero Section not found" });
    res.status(200).json({ message: "Hero Section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
