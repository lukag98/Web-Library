const { connect } = require("../db/mongodb");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// Ovu tajnu bi trebalo čuvati na sigurnom mestu, kao što je environment variable
const JWT_SECRET = "your_jwt_secret";

const loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = await connect();
    const client = await db.collection("clients").findOne({ email });

    if (!client) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const isMatch = await bcrypt.compare(password, client.password);

    const isMatch = password === client.password;

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generisanje JWT tokena
    // const token = jwt.sign({ id: client._id, role: client.role }, JWT_SECRET, {
    //   expiresIn: "1h", // Token važi jedan sat
    // });

    // res.json({ token });
    res.json({ loggedIn: true, loggedUser: client });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { loginClient };
