const ServicesPageSection = require("../../models/servicesPageSection.schema");

// Create a new Services Page Section
exports.createServicesPageSection = async (req, res) => {
  try {
    const { servicesPageSection } = req.body;

    if (
      !servicesPageSection ||
      !servicesPageSection.img ||
      !servicesPageSection.title ||
      !servicesPageSection.description ||
      !servicesPageSection.button ||
      !servicesPageSection.button.name ||
      !servicesPageSection.button.link
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a Services Page Section already exists
    const existingServicesPageSection = await ServicesPageSection.findOne();

    if (existingServicesPageSection) {
      // Update existing Services Page Section instead of creating new one
      const updatedServicesPageSection = await ServicesPageSection.findByIdAndUpdate(
        existingServicesPageSection._id,
        { servicesPageSection },
        { new: true }
      );
      return res.status(200).json(updatedServicesPageSection);
    }

    // If no existing Services Page Section, create new one
    const servicesPageSectionData = new ServicesPageSection({
      servicesPageSection: servicesPageSection,
    });

    const savedServicesPageSection = await servicesPageSectionData.save();
    res.status(201).json(savedServicesPageSection);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Services Page Sections
exports.getServicesPageSections = async (req, res) => {
  try {
    const servicesPageSections = await ServicesPageSection.find();
    res.status(200).json(servicesPageSections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Services Page Section by ID
exports.getServicesPageSectionById = async (req, res) => {
  try {
    const servicesPageSection = await ServicesPageSection.findById(req.params.id);
    if (!servicesPageSection)
      return res
        .status(404)
        .json({ message: "Services Page Section not found" });
    res.status(200).json(servicesPageSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Services Page Section
exports.updateServicesPageSection = async (req, res) => {
  try {
    const { servicesPageSection } = req.body;
    const updatedServicesPageSection = await ServicesPageSection.findByIdAndUpdate(
      req.params.id,
      { servicesPageSection },
      { new: true }
    );
    if (!updatedServicesPageSection)
      return res
        .status(404)
        .json({ message: "Services Page Section not found" });
    res.status(200).json(updatedServicesPageSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Services Page Section
exports.deleteServicesPageSection = async (req, res) => {
  try {
    const deletedServicesPageSection = await ServicesPageSection.findByIdAndDelete(req.params.id);
    if (!deletedServicesPageSection)
      return res
        .status(404)
        .json({ message: "Services Page Section not found" });
    res.status(200).json({ message: "Services Page Section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
