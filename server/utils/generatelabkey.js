const crypto = require("crypto");
const randomBytes = crypto.randomBytes(16);
const keyHex = randomBytes.toString("hex");

