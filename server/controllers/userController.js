const User = require("../models/User");
const generateSalt = require("../utils/generateSalt");
const createHash = require("../utils/createHash");

module.exports.create = (req, res) => {
  const { login, password, password2 } = req.body;

  let p = new Promise((resolve, reject) => {
    if (!login || !password || !password2)
      reject("Все поля должны быть заполнены!");
    if (password !== password2) reject("Пароли не совпадают!");
    if (!/^[а-яёa-z0-9]{3,20}$/i.test(req.body.login))
      reject(
        "Логин должен содержать только буквы и цифры. Колличество символов от 3 до 20!"
      );
    if (!/^[а-яёa-z0-9]{5,20}$/i.test(req.body.password))
      reject(
        "Пароль должен содержать только буквы и цифры. Колличество символов от 5 до 20!"
      );

    User.findOne({ login }, (err, user) => {
      if (err) return console.log(err);
      if (user) reject("Такой пользователь уже зарегистрирован!!");
      resolve(1);
    });
  });

  p.then(() => {
    const salt = generateSalt(20);
    const hash = createHash(password, salt);

    const newUser = new User({
      login,
      salt,
      hash
    });

    newUser
      .save()
      .then(user => {
        req.session._id = user._id; // записываем в сессию login
        res.send(user);
      })
      .catch(err => {
        console.log(err);
      });
  }).catch(error => {
    console.log(error);
    res.send({ error });
  });
};

module.exports.change = (req, res) => {
  const { id, avatar, oldpassword, newpassword, action } = req.body;

  if (action == "avatar") {
    if (!id || !avatar)
      return res.send({ Error: "Отсутствуют требуемые данные." });

    User.findByIdAndUpdate(
      id,
      { avatar },
      { returnOriginal: false },
      (err, user) => {
        if (err) {
          console.log(err);
          return res.send({ Error: "Ошибка Баз Данных." });
        }

        res.send(user);
      }
    );
  } else if (action == "password") {
  } else {
    res.send({ Error: "Не указано действие" });
  }
};
