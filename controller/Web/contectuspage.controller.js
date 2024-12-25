const Contact = require("../../models/contect.schems");

// Create contact page section
exports.createContactPage = async (req, res) => {
  try {
    const { contactPage } = req.body;
    
    if (!contactPage) {
      return res.status(400).json({ message: "Contact page data is required" });
    }

    // Check if contact page already exists
    const existingContact = await Contact.findOne();

    if (existingContact) {
      // Update existing contact page
      const updatedContact = await Contact.findByIdAndUpdate(
        existingContact._id,
        { contactPage },
        { new: true }
      );
      return res.status(200).json(updatedContact);
    }

    // Create new contact page
    const contact = new Contact({
      contactPage
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
