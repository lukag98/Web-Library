const router = require("express").Router();
const {
  getClients,
  postClient,
  getClient,
  deleteClient,
  updateClient,
} = require("../controllers/clientsController");

router.get("/clients", getClients);
router.post("/clients", postClient);
router.get("/clients/:id", getClient);
router.delete("/clients/:id", deleteClient);
router.put("/clients/:id", updateClient);

module.exports = router;
