const crypto = require("crypto");

exports.decrypt = async (req, res, next) => {
  try {
    // console.log("body",req.files.image[0]);

    // const iv = crypto.randomBytes(16);
    // const decipher = crypto.createDecipheriv(
    //   "aes-256-cbc",
    //   process.env.LABKEY,
    //   iv
    // );
    // let decryptedData = decipher.update(req.body, "hex", "utf8");
    // decryptedData += decipher.final("utf8");
    // req.body = JSON.parse(decryptedData);
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error Occoured On server" });
  }
};
