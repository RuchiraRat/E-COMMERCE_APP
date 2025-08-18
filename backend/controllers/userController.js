import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Helper: Create a signed JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ==================== USER LOGIN ====================
const loginUser = async (req, res) => {
  try {
    // Debug: see exactly what came in
    console.log("RAW BODY:", req.body);

    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;
    console.log("NORMALIZED EMAIL:", email);

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // Look for the user in DB
    const user = await userModel.findOne({ email });
    console.log("Found user?", !!user);

    if (!user) {
      // Show similar emails for debugging in dev
      if (process.env.NODE_ENV !== "production") {
        const sample = await userModel.find({}).limit(3).select("email");
        console.log("Sample existing emails:", sample.map(u => u.email));
      }
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    }

    // Compare password hash
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Successful login — issue token
    const token = createToken(user._id);
    return res.json({ success: true, token });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== USER REGISTER ====================
const registerUser = async (req, res) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase(); // ensure lowercase storage
    const { password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const user = await new userModel({
      name,
      email,
      password: hashedPassword
    }).save();

    // Return token
    const token = createToken(user._id);
    return res.json({ success: true, token });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== ADMIN LOGIN (Placeholder) ====================
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Issue a proper JWT with a payload and expiry (consistent with createToken)
      const token = jwt.sign(
        { role: "admin", email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return res.status(200).json({ success: true, token, message: "Admin login successful" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
