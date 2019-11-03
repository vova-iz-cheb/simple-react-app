const User = require("../models/User");
const createHash = require("../utils/createHash");

module.exports.login = (req, res) => {
  const { login, password } = req.body;

  let p = new Promise((resolve, reject) => {
    if (!login || !password) reject("Все поля должны быть заполнены!");
    User.findOne({ login }, (err, user) => {
      if (err) return console.log(err);
      if (!user) reject("Нет такого пользователя!");
      resolve(user);
    });
  });

  p.then(user => {
    const hash = createHash(password, user.salt);
    if (hash === user.hash) {
      req.session._id = user._id; // записываем в сессию id юзера
      res.send(user);
    } else {
      return Promise.reject("Пароли не совпадают!");
    }
  }).catch(error => {
    res.send({ error });
  });
};

module.exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.send({ success: true });
  });
};

module.exports.userdata = (req, res) => {
  const { id } = req.body;

  if (id) {
    User.findById(id, (err, user) => {
      if (err) {
        console.log(err);
        res.send({ error: true });
        return;
      }
      if (!user) res.send({ error: true });
      else res.send(user);
    });
  } else {
    res.send({ error: true });
  }
};
