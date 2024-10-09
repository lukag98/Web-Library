const { connect } = require("../db/mongodb");

const getClients = async (req, res) => {
  try {
    const db = await connect();
    const clients = await db.collection("clients").find().toArray();
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const getClient = async (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  try {
    const db = await connect();
    const client = await db.collection("clients").findOne({ id: clientId });
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ message: "Klijent nije pronađen" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const postClient = async (req, res) => {
  const newClient = req.body;
  try {
    const db = await connect();
    const clients = await db.collection("clients").find().toArray();
    const newId = clients.length > 0 ? clients[clients.length - 1].id + 1 : 1;
    newClient.id = newId;
    await db.collection("clients").insertOne(newClient);
    res.status(201).json(newClient);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const deleteClient = async (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  try {
    const db = await connect();
    const result = await db.collection("clients").deleteOne({ id: clientId });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Klijent je obrisan" });
    } else {
      res.status(404).json({ message: "Klijent nije pronađen" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

const updateClient = async (req, res) => {
  const clientId = parseInt(req.params.id, 10);
  const updatedClient = req.body;

  try {
    const db = await connect();

    // Remove the _id field from the updatedClient if it exists
    delete updatedClient._id;

    const result = await db
      .collection("clients")
      .updateOne({ id: clientId }, { $set: updatedClient });

    if (result.matchedCount === 1) {
      const client = await db.collection("clients").findOne({ id: clientId });
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: "Klijent nije pronađen" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getClients,
  getClient,
  postClient,
  deleteClient,
  updateClient,
};
