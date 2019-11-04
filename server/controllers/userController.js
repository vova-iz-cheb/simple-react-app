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
  const {
    id,
    avatar,
    oldpassword,
    newpassword,
    newpassword2,
    action
  } = req.body;

  if (action == "avatar") {
    if (!id || !avatar)
      return res.send({ error: "Отсутствуют требуемые данные." });

    User.findByIdAndUpdate(
      id,
      { avatar },
      { returnOriginal: false },
      (err, user) => {
        if (err) {
          console.log(err);
          return res.send({ error: "Ошибка Баз Данных." });
        }

        res.send(user);
      }
    );
  } else if (action == "password") {
    if (!id || !oldpassword || !newpassword || !newpassword2)
      return res.send({ error: "Все поля должны быть заполнены." });
    if (newpassword !== newpassword2)
      return res.send({ error: "Новый не совпадает с подтвержденным" });
    if (!/^[а-яёa-z0-9]{5,20}$/i.test(newpassword))
      return res.send({
        error:
          "Пароль должен содержать только буквы и цифры. Колличество символов от 5 до 20!"
      });

    const p = new Promise((resolve, reject) => {
      User.findById(id, (err, user) => {
        if (err) return console.log(err);
        resolve(user);
      });
    });

    p.then(user => {
      const hash = createHash(oldpassword, user.salt);
      if (hash === user.hash) {
        return user;
      } else {
        return Promise.reject("Старый пароль не верен!");
      }
    })
      .then(user => {
        const newSalt = generateSalt(20);
        const newHash = createHash(newpassword, newSalt);

        User.findByIdAndUpdate(
          id,
          { salt: newSalt, hash: newHash },
          (err, result) => {
            if (err) return console.log(err);
            res.send({ success: "Пароль успешно изменен" });
          }
        );
      })
      .catch(error => res.send({ error }));
  } else {
    res.send({ error: "Не указано действие" });
  }
};

module.exports.delete = (req, res) => {
  const { id, password } = req.body;

  const p = new Promise((resolve, reject) => {
    if (!id) reject("Отказано!");
    if (!password) reject("Не указан пароль!");
    User.findById(id, (err, user) => {
      if (err) return console.log(err);
      resolve(user);
    });
  });

  p.then(user => {
    const hash = createHash(password, user.salt);
    if (hash === user.hash) {
      return user.id;
    } else {
      return Promise.reject("Пароль не верен!");
    }
  })
    .then(id => {
      User.findByIdAndDelete(id, (err, user) => {
        if (err) return console.log(err);
        req.session.destroy(() => {
          res.send({ success: true });
        });
      });
    })
    .catch(error => res.send({ error }));
};
