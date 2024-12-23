const Admin = require("../../models/admin.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate request body
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    await admin.save();

    // Respond with success
    res.status(201).json({
      status: "Success",
      message: "Admin Registered Successfully",
      admin,
    });
  } catch (error) {
    // Handle errors
    const statusCode = error.message === "All fields are required" ? 400 : 500;
    res.status(statusCode).json({
      status: "Failed",
      message: error.message,
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      throw new Error("Email and Password are required");
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Invalid email or password");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET // Ensure you have a secure secret key in your environment variables
      // { expiresIn: "1h" }
    );

    // Respond with success
    res.status(200).json({
      status: "Success",
      message: "Admin Logged In Successfully",
      token,
    });
  } catch (error) {
    // Handle errors
    const statusCode =
      error.message === "Email and Password are required" ||
      error.message === "Invalid email or password"
        ? 401
        : 500;
    res.status(statusCode).json({
      status: "Failed",
      message: error.message,
    });
  }
};
