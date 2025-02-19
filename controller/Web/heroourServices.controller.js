const HeroOurServices = require('../../models/heroourServices.schema');
const { uploadImage } = require('./img');
// Create a new Hero Our Services section
exports.createHeroOurServices = async (req, res) => {
  try {
    const { heroOurServices } = req.body;
    
    if (!heroOurServices) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if any document already exists
    const existingService = await HeroOurServices.findOne();


    const nowdatawhiteurl = await Promise.all(heroOurServices.services.map(async (service) => {
      return { ...service, img: service.img.startsWith("data:image") ? await uploadImage(service.img) : service.img };
    }));

    if (existingService) {
      // Update existing document
      const updatedHeroOurServices = await HeroOurServices.findByIdAndUpdate(
        existingService._id,
        { heroOurServices: { ...heroOurServices, services: nowdatawhiteurl } },
        { new: true }
      );
      return res.status(200).json(updatedHeroOurServices);
    }

    // If no document exists, create new one
    const heroOurServicesSection = new HeroOurServices({
      heroOurServices: { ...heroOurServices, services: nowdatawhiteurl }
    });

    const savedHeroOurServices = await heroOurServicesSection.save();
    res.status(201).json(savedHeroOurServices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Hero Our Services sections
exports.getHeroOurServices = async (req, res) => {
  try {
    const heroOurServices = await HeroOurServices.find();
    res.status(200).json(heroOurServices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Hero Our Services section by ID
exports.getHeroOurServicesById = async (req, res) => {
  try {
    const heroOurServices = await HeroOurServices.findById(req.params.id);
    if (!heroOurServices) return res.status(404).json({ message: "Hero Our Services section not found" });
    res.status(200).json(heroOurServices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Hero Our Services section
exports.updateHeroOurServices = async (req, res) => {
  try {
    const { heroOurServices } = req.body;
    const updatedHeroOurServices = await HeroOurServices.findByIdAndUpdate(
      req.params.id,
      { heroOurServices },
      { new: true }
    );
    if (!updatedHeroOurServices) return res.status(404).json({ message: "Hero Our Services section not found" });
    res.status(200).json(updatedHeroOurServices);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Hero Our Services section
exports.deleteHeroOurServices = async (req, res) => {
  try {
    const deletedHeroOurServices = await HeroOurServices.findByIdAndDelete(req.params.id);
    if (!deletedHeroOurServices) return res.status(404).json({ message: "Hero Our Services section not found" });
    res.status(200).json({ message: "Hero Our Services section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
