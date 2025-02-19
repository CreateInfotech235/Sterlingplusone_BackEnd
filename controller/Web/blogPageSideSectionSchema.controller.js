const blogPageSideSectionSchema = require('../../models/blogPageSection.schema');
const { uploadImage, checkImageType } = require('./img');
// Create a new Blog Page section
exports.createBlogPageSideSection = async (req, res) => {
  try {
    const { blogPageSideSection } = req.body;

    if (!blogPageSideSection || !blogPageSideSection.topCategory || !blogPageSideSection.galleryImage || !blogPageSideSection.gallerytitle || !blogPageSideSection.galleryImage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const imageTypes = await Promise.all([blogPageSideSection.galleryImage].map(async (galleryImage) => {
      const isValid = await checkImageType(galleryImage);
      return { galleryImage, isValid };
    }));

    if (imageTypes.some(type => type.isValid === false)) {
      return res.status(400).json({ message: "Invalid image type" });
    }

    const nowdatawhiteurl = await Promise.all([blogPageSideSection.galleryImage].map(async (galleryImage) => {
      return galleryImage.startsWith("data:image") ? await uploadImage(galleryImage) : galleryImage;
    }));

    // Check if a Blog Page section already exists
    const existingSection = await blogPageSideSectionSchema.findOne();

    if (existingSection) {
      // Update existing Blog Page section instead of creating new one
      const updatedSection = await blogPageSideSectionSchema.findByIdAndUpdate(
        existingSection._id,
        { blogPageSideSection: { ...blogPageSideSection, galleryImage: nowdatawhiteurl } },
        { new: true }
      );
      return res.status(200).json(updatedSection);
    }

    // If no existing Blog Page section, create new one
    const sectionData = new blogPageSideSectionSchema({
      blogPageSideSection,
    });

    const savedSection = await sectionData.save();
    res.status(201).json(savedSection);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Blog Page sections
exports.getBlogPageSideSections = async (req, res) => {
  try {
    const sections = await blogPageSideSectionSchema.find();
    res.status(200).json(sections);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Blog Page section by ID
exports.getBlogPageSideSectionById = async (req, res) => {
  try {
    const section = await blogPageSideSectionSchema.findById(req.params.id);
    if (!section) return res.status(404).json({ message: "Blog Page section not found" });
    res.status(200).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete Blog Page section
exports.deleteBlogPageSideSection = async (req, res) => {
  try {
    const deletedSection = await blogPageSideSectionSchema.findByIdAndDelete(req.params.id);
    if (!deletedSection) return res.status(404).json({ message: "Blog Page section not found" });
    res.status(200).json({ message: "Blog Page section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
