const NavBar = require("../../models/navBar.schema");

// Create a new NavBar
exports.createNavBar = async (req, res) => {
  try {
    const { title, icons } = req.body;
    console.log(title, icons);

    if (!title || !icons) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a NavBar already exists
    const existingNavBar = await NavBar.findOne();

    if (existingNavBar) {
      // Update existing NavBar instead of creating new one
      const updatedNavBar = await NavBar.findByIdAndUpdate(
        existingNavBar._id,
        { title, icons },
        { new: true }
      );
      return res.status(200).json(updatedNavBar);
    }

    // If no existing NavBar, create new one
    const navBar = new NavBar({
      title,
      icons,
    });

    const savedNavBar = await navBar.save();
    res.status(201).json(savedNavBar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all NavBars
exports.getNavBars = async (req, res) => {
  try {
    const navBars = await NavBar.find({});
    res.status(200).json(navBars);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a NavBar by ID
exports.getNavBarById = async (req, res) => {
  try {
    const navBar = await NavBar.findById(req.params.id);
    if (!navBar) return res.status(404).json({ message: "NavBar not found" });
    res.status(200).json(navBar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update NavBar
exports.updateNavBar = async (req, res) => {
  try {
    const { title, icons } = req.body;
    const updatedNavBar = await NavBar.findByIdAndUpdate(
      req.params.id,
      { title, icons },
      { new: true }
    );
    if (!updatedNavBar)
      return res.status(404).json({ message: "NavBar not found" });
    res.status(200).json(updatedNavBar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete NavBar
exports.deleteNavBar = async (req, res) => {
  try {
    const deletedNavBar = await NavBar.findByIdAndDelete(req.params.id);
    if (!deletedNavBar)
      return res.status(404).json({ message: "NavBar not found" });
    res.status(200).json({ message: "NavBar deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
