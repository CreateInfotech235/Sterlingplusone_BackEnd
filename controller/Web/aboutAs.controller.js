const AboutAs = require('../../models/aboutAs.schema');
const AbouttopAs = require('../../models/abouttopAs.schema');
// Create a new About Us section
exports.createAboutAs = async (req, res) => {
  try {
    const { aboutAs } = req.body;

    if (!aboutAs || !aboutAs.mainTitle || !aboutAs.title || !aboutAs.description || !aboutAs.button || !aboutAs.contectNumber || !aboutAs.achievements || !aboutAs.image || !aboutAs.infoTitle || !aboutAs.infoDescription || !aboutAs.services) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if an About Us section already exists
    const existingAboutAs = await AboutAs.findOne();

    if (existingAboutAs) {
      // Update existing About Us section instead of creating new one
      const updatedAboutAs = await AboutAs.findByIdAndUpdate(
        existingAboutAs._id,
        { aboutAs },
        { new: true }
      );
      return res.status(200).json(updatedAboutAs);
    }

    // If no existing About Us section, create new one
    const aboutAsData = new AboutAs({ aboutAs });
    const savedAboutAs = await aboutAsData.save();
    res.status(201).json(savedAboutAs);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all About Us sections
exports.getAboutAsSections = async (req, res) => {
  try {
    const aboutAsSections = await AboutAs.find();
    res.status(200).json(aboutAsSections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get an About Us section by ID
exports.getAboutAsById = async (req, res) => {
  try {
    const aboutAsSection = await AboutAs.findById(req.params.id);
    if (!aboutAsSection) return res.status(404).json({ message: "About Us section not found" });
    res.status(200).json(aboutAsSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an About Us section
exports.updateAboutAs = async (req, res) => {
  try {
    const { aboutAs } = req.body;

    if (!aboutAs || !aboutAs.mainTitle || !aboutAs.title || !aboutAs.description || !aboutAs.button || !aboutAs.contectNumber || !aboutAs.achievements || !aboutAs.image || !aboutAs.infoTitle || !aboutAs.infoDescription || !aboutAs.services) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const updatedAboutAs = await AboutAs.findByIdAndUpdate(
      req.params.id,
      { aboutAs },
      { new: true }
    );
    if (!updatedAboutAs) return res.status(404).json({ message: "About Us section not found" });
    res.status(200).json(updatedAboutAs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an About Us section
exports.deleteAboutAs = async (req, res) => {
  try {
    const deletedAboutAs = await AboutAs.findByIdAndDelete(req.params.id);
    if (!deletedAboutAs) return res.status(404).json({ message: "About Us section not found" });
    res.status(200).json({ message: "About Us section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.createAbouttopAs = async (req, res) => {
  try {
    const { abouttopAs } = req.body;
    console.log(abouttopAs,"abouttopAs");

    if (
      !abouttopAs ||
      !abouttopAs.title ||
      !abouttopAs.bgImage ||
      !abouttopAs.subTitle ||
      !abouttopAs.button ||
      !abouttopAs.button.name ||
      !abouttopAs.button.link
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a Services Page section already exists
    const existingAbouttopAs = await AbouttopAs.findOne();

    if (existingAbouttopAs) {
      console.log(existingAbouttopAs);
      // Update existing Services Page instead of creating new one
      const updatedAbouttopAs = await AbouttopAs.findByIdAndUpdate(
        existingAbouttopAs._id,
        { abouttopAs },
        { new: true }
      );
      return res.status(200).json(updatedAbouttopAs);
    }

    // If no existing Services Page, create new one
    const abouttopAsData = new AbouttopAs({
      abouttopAs: abouttopAs,
    });

    const savedAbouttopAs = await abouttopAsData.save();
    console.log(savedAbouttopAs,"savedAbouttopAs");
    res.status(201).json(savedAbouttopAs);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Services Page sections
exports.getAbouttopAs = async (req, res) => {
  try {
    const abouttopAs = await AbouttopAs.findOne();
    console.log(abouttopAs,"abouttopAs");
    res.status(200).json(abouttopAs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};