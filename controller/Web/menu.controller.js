const Menu = require('../../models/menu.schema');

// Create a new Menu
exports.createMenu = async (req, res) => {
  try {
    const { logo, menuList, button,favicon } = req.body;
    
    if (!logo || !menuList || !button || !favicon) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a Menu already exists
    const existingMenu = await Menu.findOne();

    if (existingMenu) {
      // Update existing Menu instead of creating new one
      const updatedMenu = await Menu.findByIdAndUpdate(
        existingMenu._id,
        { logo, menuList, button, favicon },
        { new: true }
      );
      return res.status(200).json(updatedMenu);
    }

    // If no existing Menu, create new one
    const menu = new Menu({
      logo,
      menuList,
      button,
      favicon
    });

    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Menus
exports.getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Menu by ID
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: "Menu not found" });
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Menu
exports.updateMenu = async (req, res) => {
  try {
    const { logo, menuList, button, favicon } = req.body;
    const updatedMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      { logo, menuList, button, favicon },
      { new: true }
    );
    if (!updatedMenu) return res.status(404).json({ message: "Menu not found" });
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Menu
exports.deleteMenu = async (req, res) => {
  try {
    const deletedMenu = await Menu.findByIdAndDelete(req.params.id);
    
    if (!deletedMenu) return res.status(404).json({ message: "Menu not found" });
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
