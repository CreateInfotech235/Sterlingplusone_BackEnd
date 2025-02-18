const BlogPageSection = require('../../models/blogPageSection.schema');

// Create a new Blog Page section
exports.createBlogPageSection = async (req, res) => {
  try {
    const { blogPageSection } = req.body;
    if (!blogPageSection || !blogPageSection.Categorytitle || !blogPageSection.gallerytitle || !blogPageSection.galleryImage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a Blog Page section already exists
    const existingSection = await BlogPageSection.findOne();

    if (existingSection) {
      // Update existing Blog Page section instead of creating new one
      console.log("blogPageSection", blogPageSection);
      const updatedSection = await BlogPageSection.findOneAndUpdate(
        {},
        { blogPageSideSection:blogPageSection },
        { new: true }
      );
      return res.status(200).json(updatedSection);
    }

    // If no existing Blog Page section, create new one
    const sectionData = new BlogPageSection({
      blogPageSection,
    });

    const savedSection = await sectionData.save();
    res.status(201).json(savedSection);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Blog Page sections
exports.getBlogPageSections = async (req, res) => {
  try {
    const sections = await BlogPageSection.findOne();
    res.status(200).json(sections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Blog Page section by ID
exports.getBlogPageSectionById = async (req, res) => {
  try {
    const section = await BlogPageSection.findById(req.params.id);
    if (!section) return res.status(404).json({ message: "Blog Page section not found" });
    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Blog Page section
exports.updateBlogPageSection = async (req, res) => {
  try {
    const { blogPageSection } = req.body;
    const updatedSection = await BlogPageSection.findByIdAndUpdate(
      req.params.id,
      { blogPageSection },
      { new: true }
    );
    if (!updatedSection) return res.status(404).json({ message: "Blog Page section not found" });
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Blog Page section
exports.deleteBlogPageSection = async (req, res) => {
  try {
    const deletedSection = await BlogPageSection.findByIdAndDelete(req.params.id);
    if (!deletedSection) return res.status(404).json({ message: "Blog Page section not found" });
    res.status(200).json({ message: "Blog Page section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
