const ourPartner = require("../../models/ourPartner.schema");

// Create a new Our Partner Section
exports.createOurPartnerSection = async (req, res) => {
  try {
    const { title, partners } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!partners || !Array.isArray(partners)) {
      return res.status(400).json({ message: "Partners must be an array" });
    }

    // Validate each partner
    for (const partner of partners) {
      if (!partner.img || !partner.companyName || !partner.link) {
        return res.status(400).json({ message: "Missing required fields in partner" });
      }
    }

    // Check if a Our Partner Section already exists
    const existingOurPartnerSection = await ourPartner.findOne();

    if (existingOurPartnerSection) {
      // Update existing Our Partner Section
      const updatedOurPartnerSection = await ourPartner.findByIdAndUpdate(
        existingOurPartnerSection._id,
        { 
          title,
          ourPartnerSection: partners 
        },
        { new: true }
      );
      return res.status(200).json(updatedOurPartnerSection);
    }

    // If no existing Our Partner Section, create new one
    const ourPartnerSectionData = new ourPartner({
      title,
      ourPartnerSection: partners
    });

    const savedOurPartnerSection = await ourPartnerSectionData.save();
    res.status(201).json(savedOurPartnerSection);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Our Partner Sections
exports.getOurPartnerSections = async (req, res) => {
  try {
    const ourPartnerSections = await ourPartner.find();
    res.status(200).json(ourPartnerSections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Our Partner Section by ID
exports.getOurPartnerSectionById = async (req, res) => {
  try {
    const ourPartnerSection = await ourPartner.findById(req.params.id);
    if (!ourPartnerSection)
      return res
        .status(404)
        .json({ message: "Our Partner Section not found" });
    res.status(200).json(ourPartnerSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Our Partner Section
exports.updateOurPartnerSection = async (req, res) => {
  try {
    const { title, partners } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!partners || !Array.isArray(partners)) {
      return res.status(400).json({ message: "Partners must be an array" });
    }

    // Validate each partner
    for (const partner of partners) {
      if (!partner.img || !partner.companyName || !partner.link) {
        return res.status(400).json({ message: "Missing required fields in partner" });
      }
    }

    const updatedOurPartnerSection = await ourPartner.findByIdAndUpdate(
      req.params.id,
      { 
        title,
        ourPartnerSection: partners 
      },
      { new: true }
    );
    
    if (!updatedOurPartnerSection) {
      return res.status(404).json({ message: "Our Partner Section not found" });
    }
    res.status(200).json(updatedOurPartnerSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Our Partner Section
exports.deleteOurPartnerSection = async (req, res) => {
  try {
    const deletedOurPartnerSection = await ourPartner.findByIdAndDelete(req.params.id);
    if (!deletedOurPartnerSection)
      return res
        .status(404)
        .json({ message: "Our Partner Section not found" });
    res.status(200).json({ message: "Our Partner Section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
