const Footer = require('../../models/footer.schema');

// Create or Update Footer
exports.createOrUpdateFooter = async (req, res) => {
  try {
    const { footer } = req.body;

    if (!footer || !footer.section || !footer.socialMedia || !footer.copyright) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a Footer already exists
    const existingFooter = await Footer.findOne();

    if (existingFooter) {
      // Update existing Footer
      const updatedFooter = await Footer.findByIdAndUpdate(
        existingFooter._id,
        { footer },
        { new: true }
      );
      return res.status(200).json(updatedFooter);
    }

    // Create new Footer if none exists
    const footerData = new Footer({ footer });
    const savedFooter = await footerData.save();
    res.status(201).json(savedFooter);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get Footer
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) return res.status(404).json({ message: "Footer not found" });
    res.status(200).json(footer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Footer by ID
exports.updateFooterById = async (req, res) => {
  try {
    const { footer } = req.body;
    const updatedFooter = await Footer.findByIdAndUpdate(
      req.params.id,
      { footer },
      { new: true }
    );
    if (!updatedFooter) return res.status(404).json({ message: "Footer not found" });
    res.status(200).json(updatedFooter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Footer by ID
exports.deleteFooterById = async (req, res) => {
  try {
    const deletedFooter = await Footer.findByIdAndDelete(req.params.id);
    if (!deletedFooter) return res.status(404).json({ message: "Footer not found" });
    res.status(200).json({ message: "Footer deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
