const { HmacSHA256 } = require("crypto-js");

exports.securehash = async (req, res, next) => {
  try {
    const { hash, ...body } = req.body;
    const jsonString = JSON.stringify(body);
    const afterHash = HmacSHA256(jsonString, process.env.LABKEY).toString();
    console.log(hash);
    console.log(afterHash);
    if (!body || !hash) {
      return res.status(200).json({
        status: "failed",
        message: "You Can't Send Empty Data.",
      });
    } else if (afterHash !== hash) {
      return res.status(200).json({
        status: "failed",
        message: "Some one Trying To Interapt With Your Data.",
      });
    } else {
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Error Occoured On server" });
  }
};
