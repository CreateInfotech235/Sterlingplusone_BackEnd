const ServicesPage = require("../../models/servicesPage.schema");
const { uploadImage, checkImageType } = require('./img');
// Create a new Services Page section
exports.createServicesPage = async (req, res) => {
  try {
    const { servicesPage } = req.body;

    if (
      !servicesPage ||
      !servicesPage.title ||
      !servicesPage.bgImage ||
      !servicesPage.subTitle ||
      !servicesPage.button ||
      !servicesPage.button.name ||
      !servicesPage.button.link
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a Services Page section already exists
    const existingServicesPage = await ServicesPage.findOne();

    const imageType1 = await checkImageType(servicesPage.bgImage);

    if (imageType1 === false) {
      return res.status(400).json({ message: "Invalid image type" });
    }

    const nowdatawhiteurl = await uploadImage(servicesPage.bgImage);

    if (existingServicesPage) {
      console.log(existingServicesPage);
      // Update existing Services Page instead of creating new one
      const updatedServicesPage = await ServicesPage.findByIdAndUpdate(
        existingServicesPage._id,
        { servicesPage: { ...servicesPage, bgImage: nowdatawhiteurl } },
        { new: true }
      );
      return res.status(200).json(updatedServicesPage);
    }

    // If no existing Services Page, create new one
    const servicesPageData = new ServicesPage({
      servicesPage: { ...servicesPage, bgImage: nowdatawhiteurl },
    });

    const savedServicesPage = await servicesPageData.save();
    res.status(201).json(savedServicesPage);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Services Page sections
exports.getServicesPages = async (req, res) => {
  try {
    const servicesPages = await ServicesPage.find();
    res.status(200).json(servicesPages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Services Page section by ID
exports.getServicesPageById = async (req, res) => {
  try {
    const servicesPage = await ServicesPage.findById(req.params.id);
    if (!servicesPage)
      return res
        .status(404)
        .json({ message: "Services Page section not found" });
    res.status(200).json(servicesPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Services Page section
exports.updateServicesPage = async (req, res) => {
  try {
    const { servicesPage } = req.body;
    const updatedServicesPage = await ServicesPage.findByIdAndUpdate(
      req.params.id,
      { servicesPage },
      { new: true }
    );
    if (!updatedServicesPage)
      return res
        .status(404)
        .json({ message: "Services Page section not found" });
    res.status(200).json(updatedServicesPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
