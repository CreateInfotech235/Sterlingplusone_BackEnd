const Contact = require("../../models/contect.schems");
const { uploadImage, checkImageType } = require('./img');
// Create contact page section
exports.createContactPage = async (req, res) => {
  try {
    const { contactPage } = req.body;
    
    if (!contactPage) {
      return res.status(400).json({ message: "Contact page data is required" });
    }

    // Check if contact page already exists
    const existingContact = await Contact.findOne();

    // Validate bgImage and icon
    const imageTypes = await Promise.all([contactPage.bgImage, contactPage.image].map(async (bgImage) => {
      const isValid = await checkImageType(bgImage);
      return { bgImage, isValid };
    }));

    const iconTypes = await Promise.all(contactPage.box.map(async (boxItem) => {
      const isValid = await checkImageType(boxItem.icon);
      return { icon: boxItem.icon, isValid };
    }));

    // Check if any bgImage or icon is invalid
    const invalidImages = imageTypes.filter(image => !image.isValid);
    const invalidIcons = iconTypes.filter(icon => !icon.isValid);

    if (invalidImages.length > 0 || invalidIcons.length > 0) {
      return res.status(400).json({
        message: "Invalid image types",
        invalidImages,
        invalidIcons
      });
    }



    const nowdatawhiteurl = await Promise.all([contactPage.bgImage, contactPage.image].map(async (bgImage) => {
      return bgImage.startsWith("data:image") ? await uploadImage(bgImage) : bgImage;
    }));

    const nowdatawhiteurlicon = await Promise.all(contactPage.box.map(async (boxItem) => {
      return{ ...boxItem, icon: boxItem.icon.startsWith("data:image") ? await uploadImage(boxItem.icon) : boxItem.icon};
    }));

    if (existingContact) {
      // Update existing contact page
      const updatedContact = await Contact.findByIdAndUpdate(
        existingContact._id,
        { contactPage: { ...contactPage, bgImage: nowdatawhiteurl[0], image: nowdatawhiteurl[1], box: nowdatawhiteurlicon } },
        { new: true }
      );
      return res.status(200).json(updatedContact);
    }

    // Create new contact page
    const contact = new Contact({
      contactPage: { ...contactPage, bgImage: nowdatawhiteurl[0], image: nowdatawhiteurl[1], box: nowdatawhiteurlicon }
    });

    const savedContact = await contact.save();
    res.status(201).json(savedContact);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get contact page
exports.getContactPage = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update contact page
exports.updateContactPage = async (req, res) => {
  try {
    const { contactPage } = req.body;
    
    if (!contactPage) {
      return res.status(400).json({ message: "Contact page data is required" });
    }

    const contact = await Contact.findOne();
    
    if (!contact) {
      return res.status(404).json({ message: "Contact page not found" });
    }

    contact.contactPage = contactPage;
    await contact.save();

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete contact page
exports.deleteContactPage = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    
    if (!contact) {
      return res.status(404).json({ message: "Contact page not found" });
    }

    await Contact.deleteOne({ _id: contact._id });
    res.status(200).json({ message: "Contact page deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
