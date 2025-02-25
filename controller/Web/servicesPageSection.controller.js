const ServicesPageSection = require("../../models/servicesPageSection.schema");
const { uploadImage, checkImageType } = require('./img');

// Create a new Services Page Section
exports.createServicesPageSection = async (req, res) => {
  try {
    const { servicesPageSection } = req.body;

    if (!servicesPageSection || !servicesPageSection.services || !servicesPageSection.services.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate each service in the array
    for (const service of servicesPageSection.services) {
      if (
        !service.img ||
        !service.title ||
        !service.description ||
        !service.button ||
        !service.button.name ||
        !service.button.link
      ) {
        return res.status(400).json({ message: "Missing required fields in service" });
      }
    }

    // Check if a Services Page Section already exists
    const existingServicesPageSection = await ServicesPageSection.findOne();

    const imageTypes = await Promise.all(servicesPageSection.services.map(async (service) => {
      const isValid = await checkImageType(service.img);
      return { img: service.img, isValid };
    }));

    if (imageTypes.some(type => type.isValid === false)) {
      return res.status(400).json({ message: "Invalid image type" });
    }

    const nowdatawhiteurl = await Promise.all(servicesPageSection.services.map(async (service) => {
      return { ...service, img: service.img.startsWith("data:image") ? await checkImageType(service.img) ? await uploadImage(service.img) : service.img : service.img };
    }));
      if (existingServicesPageSection) {
      // Update existing Services Page Section instead of creating new one
      const updatedServicesPageSection = await ServicesPageSection.findByIdAndUpdate(
        existingServicesPageSection._id,
        { servicesPageSection: { ...servicesPageSection, services: nowdatawhiteurl } },
        { new: true }
      );
      return res.status(200).json(updatedServicesPageSection);
    }

    // If no existing Services Page Section, create new one
    const servicesPageSectionData = new ServicesPageSection({
      servicesPageSection: { ...servicesPageSection, services: nowdatawhiteurl },
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

    // Validate the services array
    if (!servicesPageSection || !servicesPageSection.services || !servicesPageSection.services.length) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate each service in the array
    for (const service of servicesPageSection.services) {
      if (
        !service.img ||
        !service.title ||
        !service.description ||
        !service.button ||
        !service.button.name ||
        !service.button.link
      ) {
        return res.status(400).json({ message: "Missing required fields in service" });
      }
    }

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
