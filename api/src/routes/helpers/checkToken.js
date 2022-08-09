const { Admin } = require("../../db");

let checkAuth = {};

checkAuth.isAuth = async (req, res, next) => {
  const { token } = req.query;
  if (!token) return res.status(400).send("Not Token");
  try {
    const user = await Admin.findOne({ where: { accessToken: token } });
    if (user) {
      return next();
    }
    // res.redirect("/admin/login");
    res.send("Unauthorized Token");
  } catch (e) {
    console.log("entro en error");
    res.status(400).send(e);
  }
};

module.exports = checkAuth;
