const HeroChooseUs = require('../../models/heroChooseUs.schema');
const { uploadImage, checkImageType } = require('./img');

// Create a new Hero Choose Us section
exports.createHeroChooseUs = async (req, res) => {
  try {
    const { heroChooseUs } = req.body;
    
    if (!heroChooseUs) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if any document already exists
    const existingHeroChooseUs = await HeroChooseUs.findOne();

   const imageType1 = await checkImageType(heroChooseUs.mainImage);
   const imageType2 = await checkImageType(heroChooseUs.childImage);
   const imageType3 = await checkImageType(heroChooseUs.thirdImage);



   const imageTypes = await Promise.all(heroChooseUs.details.map(async (detail) => {
    const isValid = await checkImageType(detail.img);
    return { img: detail.img, isValid };
   }));

   if (imageTypes.some(type => type.isValid === false)) {
    return res.status(400).json({ message: "Invalid image type" });
   }

    if (imageType1 === false || imageType2 === false || imageType3 === false) {
      return res.status(400).json({ message: "Invalid image type" });
    }

    const nowdatawhiteurl = await Promise.all([
      heroChooseUs.mainImage.startsWith("data:image") ? await checkImageType(heroChooseUs.mainImage) ? await uploadImage(heroChooseUs.mainImage) : heroChooseUs.mainImage : heroChooseUs.mainImage,
      heroChooseUs.childImage.startsWith("data:image") ? await checkImageType(heroChooseUs.childImage) ? await uploadImage(heroChooseUs.childImage) : heroChooseUs.childImage : heroChooseUs.childImage,
      heroChooseUs.thirdImage.startsWith("data:image") ? await checkImageType(heroChooseUs.thirdImage) ? await uploadImage(heroChooseUs.thirdImage) : heroChooseUs.thirdImage : heroChooseUs.thirdImage
    ]);

    const nowdatawhiteurl2 = await Promise.all(heroChooseUs.details.map(async (detail) => {
      return { ...detail, img: detail.img.startsWith("data:image") ? await checkImageType(detail.img) ? await uploadImage(detail.img) : detail.img : detail.img };
    }));



    if (existingHeroChooseUs) {
      // If document exists, update it
      const updatedHeroChooseUs = await HeroChooseUs.findByIdAndUpdate(
        existingHeroChooseUs._id,
        { heroChooseUs: { ...heroChooseUs, mainImage: nowdatawhiteurl[0], childImage: nowdatawhiteurl[1], thirdImage: nowdatawhiteurl[2], details: nowdatawhiteurl2 } },
        { new: true }
      );
      return res.status(200).json(updatedHeroChooseUs);
    }

    // If no document exists, create new one
    const heroChooseUsSection = new HeroChooseUs({
      heroChooseUs  :{...heroChooseUs, mainImage: nowdatawhiteurl[0], childImage: nowdatawhiteurl[1], thirdImage: nowdatawhiteurl[2], details: nowdatawhiteurl2}
    });

    const savedHeroChooseUs = await heroChooseUsSection.save();
    res.status(201).json(savedHeroChooseUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Hero Choose Us sections
exports.getHeroChooseUs = async (req, res) => {
  try {
    const heroChooseUs = await HeroChooseUs.find();
    res.status(200).json(heroChooseUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a Hero Choose Us section by ID
exports.getHeroChooseUsById = async (req, res) => {
  try {
    const heroChooseUs = await HeroChooseUs.findById(req.params.id);
    if (!heroChooseUs) return res.status(404).json({ message: "Hero Choose Us section not found" });
    res.status(200).json(heroChooseUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Hero Choose Us section
exports.updateHeroChooseUs = async (req, res) => {
  try {
    const { heroChooseUs } = req.body;
    const updatedHeroChooseUs = await HeroChooseUs.findByIdAndUpdate(
      req.params.id,
      { heroChooseUs },
      { new: true }
    );
    if (!updatedHeroChooseUs) return res.status(404).json({ message: "Hero Choose Us section not found" });
    res.status(200).json(updatedHeroChooseUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Hero Choose Us section
exports.deleteHeroChooseUs = async (req, res) => {
  try {
    const deletedHeroChooseUs = await HeroChooseUs.findByIdAndDelete(req.params.id);
    if (!deletedHeroChooseUs) return res.status(404).json({ message: "Hero Choose Us section not found" });
    res.status(200).json({ message: "Hero Choose Us section deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
