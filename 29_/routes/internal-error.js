const express = require("express");

const internalErrorController = require("../controllers/internal-error-controller");

const router = express.Router();
const path = "/500";

router.get(path, internalErrorController.renderInternalErrorPage);

module.exports.router = router;
