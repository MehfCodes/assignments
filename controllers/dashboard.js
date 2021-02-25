function getDashboard(req, res) {
  //   if (req.session.user) {
  const { id, firstname, lastname, email } = req.session.user;
  //   }
  res.render("dashboard", { firstname, lastname, email });
}
module.exports = { getDashboard };
