const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Partner = require("../models/partner.model");

// ================= REGISTER =================
const userRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token)
    return res.status(201).json({
      message: "User registered successfully",
     
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  } 
};

// ================= LOGIN =================
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token)

    return res.status(200).json({
      message: "Login successful",
  
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

async  function userLogout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({ 
      message: "Server error",
    });
  }
}

async function partnerregister(req, res) {
  try{
  const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
      return res.status(409).json({
        message: "Partner already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const partner = await Partner.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: partner._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token)
    return res.status(201).json({
      message: "Partner registered successfully",
      partner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
      },
    });


  }
  catch (error) {
    console.error("Registration error:", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  }

  
}

async function partnerlogin(req, res) {
  try{
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const partner = await Partner.findOne({ email });
    if (!partner) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { id: partner._id },
      process.env.JWT_SECRET
    );
    res.cookie("token", token)
    return res.status(200).json({
      message: "Login successful",
      partner: {
        id: partner._id,
        name: partner.name,
        email: partner.email,
      },
    });
  }
  catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

function partnerlogout(req, res) {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error.message);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  partnerregister,
  partnerlogin,
  partnerlogout
};
