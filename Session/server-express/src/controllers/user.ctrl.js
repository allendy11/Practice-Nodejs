const session = require("express-session");

exports.login = async (req, res) => {
  console.log(req.body);
  // try {
  const { username, password } = req.body;

  if (username === "qwer" && password === "1231") {
    req.session.user = { username, password };
    req.session.authorized = true;
    // req.session.save(() => {
    //   req.session.user = {
    //     username: username,
    //     password: password,
    //   };
    //   console.log(req.session);
    // });
    // res.send({ message: "login" });
    console.log(req.session);
    res.status(200).send({ message: "login success" });
  } else {
    res.status(403).json({
      message: "Forbbiden",
    });
  }
};
exports.logout = async (req, res) => {
  console.log(req.session);
  if (req.session.authorized) {
    req.session.destroy(() => {
      res.status(200).json({ message: "logout success" });
    });
  } else {
    res.status(401).json({
      message: "unauthroized",
    });
  }
};
exports.validate = async (req, res) => {
  // console.log(req.session.views);
  // console.log(req.session.id);
  console.log(req.session);
  if (req.session.authorized) {
    res.status(200).json({ message: "validate" });
  } else {
    res.status(401).json({
      message: "unauthorized",
    });
  }
};
