const Footer = require('../../models/footer.schema');
const { uploadImage } = require('./img');

// Create or Update Footer
exports.createOrUpdateFooter = async (req, res) => {
  try {
    const { footer } = req.body;

    // Validate request payload
    if (!footer || !footer.section || !footer.socialMedia || !footer.copyright) {
      return res.status(400).json({ message: "Missing required fields: 'section', 'socialMedia', or 'copyright'." });
    }


    const nowdatawhiteurl = await Promise.all(footer.socialMedia.map(async (social) => {
      return { ...social, icon: social.icon.startsWith("data:image") ? await uploadImage(social.icon) : social.icon };
    }));

    // Upsert Footer
    const updatedFooter = await Footer.findOneAndUpdate(
      {},
      { footer: { ...footer, socialMedia: nowdatawhiteurl } },
      { new: true, upsert: true } // Upsert option creates a new document if none exists
    );

    res.status(200).json({ message: "Footer created or updated successfully", footer: updatedFooter });
  } catch (error) {
    console.error("Error in createOrUpdateFooter:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get Footer
exports.getFooter = async (req, res) => {
  try {
    const footer = await Footer.findOne();
    if (!footer) {
      return res.status(404).json({ message: "Footer not found" });
    }
    res.status(200).json(footer);
  } catch (error) {
    console.error("Error in getFooter:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update Footer by ID
exports.updateFooterById = async (req, res) => {
  try {
    const { footer } = req.body;

    if (!footer) {
      return res.status(400).json({ message: "Missing footer data in the request body." });
    }

    const updatedFooter = await Footer.findByIdAndUpdate(
      req.params.id,
      { footer },
      { new: true }
    );

    if (!updatedFooter) {
      return res.status(404).json({ message: "Footer not found" });
    }

    res.status(200).json({ message: "Footer updated successfully", footer: updatedFooter });
  } catch (error) {
    console.error("Error in updateFooterById:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete Footer by ID
exports.deleteFooterById = async (req, res) => {
  try {
    const deletedFooter = await Footer.findByIdAndDelete(req.params.id);

    if (!deletedFooter) {
      return res.status(404).json({ message: "Footer not found" });
    }

    res.status(200).json({ message: "Footer deleted successfully" });
  } catch (error) {
    console.error("Error in deleteFooterById:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Delete All Footers (Optional - if needed)
exports.deleteAllFooters = async (req, res) => {
  try {
    const result = await Footer.deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} footers deleted successfully.` });
  } catch (error) {
    console.error("Error in deleteAllFooters:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
