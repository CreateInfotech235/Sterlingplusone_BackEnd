const contectUs = require("../../models/contectUs.schema");

exports.createContectUs = async (req, res) => {
  try {
    const contectUsData = req.body;
    if (!contectUsData.name || !contectUsData.email || !contectUsData.contact || !contectUsData.message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contectUs = new contectUs(contectUsData);
    await contectUs.save();
    res.status(200).json({ message: "Contect Us created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getContectUs = async (req, res) => {
  try {
    const contectUs = await contectUs.find();
    res.status(200).json(contectUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getContectUsById = async (req, res) => {
  try {
    const contectUs = await contectUs.findById(req.params.id);
    res.status(200).json(contectUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateContectUs = async (req, res) => {
  try {
    const contectUs = await contectUs.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Contect Us updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteContectUs = async (req, res) => {
  try {
    await contectUs.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contect Us deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
