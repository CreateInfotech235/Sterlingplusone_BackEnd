const Allblog = require('../../models/Allblog.schema');

// Create a new All Blog section
exports.createAllBlog = async (req, res) => {
    try {
        const { Allblog: allBlogData } = req.body;

        if (!allBlogData || !allBlogData.image || !allBlogData.title || !allBlogData.subTitle ||
            !allBlogData.description || !allBlogData.thought || !allBlogData.subImage ||
            !allBlogData.subDescription || !allBlogData.button || !allBlogData.button.length) {
            return res.status(400).json({ message: "Missing required fields" });
        }



        // If no existing All Blog, create new one
        const allBlog = new Allblog({
            Allblog: allBlogData,
        });

        const savedAllBlog = await allBlog.save();
        res.status(201).json(savedAllBlog);
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ message: error.message });
    }
};

// Get all All Blog sections
exports.getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await Allblog.find();
        res.status(200).json(allBlogs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Get an All Blog section by ID
exports.getBlogByTitle = async (req, res) => {
    try {
        const { id, title } = req.query;

        let allBlog;
        if (id) {
            allBlog = await Allblog.findById(id);
        } else if (title) {
            // First try exact match with word boundaries
            allBlog = await Allblog.findOne({
                'Allblog.title': new RegExp(`\\b${title}\\b`, 'i')
            });

            // Only if exact match not found, try contains match
            if (!allBlog) {
                // Escape special regex characters in title
                const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                
                allBlog = await Allblog.findOne({
                    'Allblog.title': new RegExp(`\\b${escapedTitle}\\b`, 'i')
                }).sort({ _id: -1 }).limit(1);
            }
        } else {
            return res.status(400).json({ message: "Either id or title is required" });
        }

        if (!allBlog) return res.status(404).json({ message: "All Blog section not found" });
        res.status(200).json(allBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Get default blog
exports.getDefaultBlog = async (req, res) => {
    try {
        const defaultBlog = await Allblog.findOne({ 'Allblog.isShow': true });
        res.status(200).json(defaultBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Update All Blog section
exports.updateAllBlog = async (req, res) => {
    try {
        const { Allblog: allBlogData } = req.body;

        // If isShow is true, set all other blogs' isShow to false
        if (allBlogData.isShow) {
            await Allblog.updateMany(
                { _id: { $ne: req.params.id } },
                { 'Allblog.isShow': false }
            );
        }

        const updatedAllBlog = await Allblog.findByIdAndUpdate(
            req.params.id,
            { Allblog: allBlogData },
            { new: true }
        );
        if (!updatedAllBlog) return res.status(404).json({ message: "All Blog section not found" });
        res.status(200).json(updatedAllBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete All Blog section
exports.deleteAllBlog = async (req, res) => {
    try {
        const deletedAllBlog = await Allblog.findByIdAndDelete(req.params.id);
        if (!deletedAllBlog) return res.status(404).json({ message: "All Blog section not found" });
        res.status(200).json({ message: "All Blog section deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
