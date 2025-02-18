const BlogPage = require('../../models/blogPage.schema');

// Create a new Blog Page section
exports.createBlogPage = async (req, res) => {
  try {
    const { blogPage } = req.body;
    console.log( "blogPage", blogPage);
    if (!blogPage || !blogPage.bgImage || !blogPage.title || !blogPage.subTitle || !blogPage.button ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if a Blog Page section already exists
    const existingBlogPage = await BlogPage.findOne();

    if (existingBlogPage) {
      // Update existing Blog Page instead of creating new one
      const updatedBlogPage = await BlogPage.findByIdAndUpdate(
        existingBlogPage._id,
        { blogPage },
        { new: true }
      );
      return res.status(200).json(updatedBlogPage);
    }

    // If no existing Blog Page, create new one
    const blogPageData = new BlogPage({
      blogPage: blogPage,
    });

    const savedBlogPage = await blogPageData.save();
    res.status(201).json(savedBlogPage);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all Blog Page sections
exports.getBlogPages = async (req, res) => {
  try {
    const blogPages = await BlogPage.find();
    res.status(200).json(blogPages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Blog Page section by ID
exports.getBlogPageById = async (req, res) => {
  try {
    const blogPage = await BlogPage.findById(req.params.id);
    if (!blogPage) return res.status(404).json({ message: "Blog Page section not found" });
    res.status(200).json(blogPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Blog Page section
exports.updateBlogPage = async (req, res) => {
  try {
    const { blogPage } = req.body;
    const updatedBlogPage = await BlogPage.findByIdAndUpdate(
      req.params.id, 
      { blogPage }, 
      { new: true }
    );
    if (!updatedBlogPage) return res.status(404).json({ message: "Blog Page section not found" });
    res.status(200).json(updatedBlogPage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Blog Page section
exports.deleteBlogPage = async (req, res) => {
  try {
    const deletedBlogPage = await BlogPage.findByIdAndDelete(req.params.id);
    if (!deletedBlogPage) return res.status(404).json({ message: "Blog Page section not found" });
    res.status(200).json({ message: "Blog Page section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
