const News = require("../models/News");
const User = require("../models/User");

module.exports.getAll = (req, res) => {
  News.find({}, null, { sort: { _id: -1 } }, (err, news) => {
    if (err) return console.log(err);
    res.send(news);
  });
};

module.exports.getById = (req, res) => {
  News.findOne({}, (err, news) => {
    if (err) return console.log(err);
    res.send(news);
  });
};

module.exports.create = (req, res) => {
  const { title, content, userId } = req.body;

  if (!title || !content)
    return res.send({ error: "Все поля должны быть заполнены" });
  if (!/^[a-zа-яё0-9!\.,\s:;'"\(\)\?\*-]{2,50}$/i.test(title))
    return res.send({
      error:
        "Заголовок должен состоять от 2 до 50 символов. Разрешены русские и латинские буквы, цифры и ! , . : - ; ' \" ( ) ? *"
    });
  if (!/^[a-zа-яё0-9!\.,\s:;'"\(\)\?\*-]{10,1500}$/i.test(content))
    return res.send({
      error:
        "Содержимое должено состоять от 10 до 1500 символов. Разрешены русские и латинские буквы, цифры и ! , . : - ; ' \" ( ) ? *"
    });
  if (!userId) return res.send({ error: "У вас нет прав на это действие" });

  User.findById(userId, (err, user) => {
    if (err) {
      console.log(err);
      res.send({ error: "У вас нет прав на это действие" });
      return;
    }

    const news = new News({
      title,
      content,
      author: user.login,
      author_id: user._id
    });

    news
      .save()
      .then(() => {
        res.send({ success: true });
      })
      .catch(error => {
        console.log(error);
        res.send({ error });
      });
  });
};

module.exports.delete = (req, res) => {
  const { id, userId } = req.body;

  if (!id || !userId)
    return res.send({ error: "У вас нет прав на это действие" });

  new Promise((resolve, reject) => {
    User.findById(userId, (err, user) => {
      if (err) {
        console.log(err);
        reject("У вас нет прав на это действие");
      }
      resolve(user);
    });
  })
    .then(user => {
      News.findById(id, (err, news) => {
        if (err) {
          console.log(err);
          res.send({ error: "Новость не найдена" });
          return;
        }

        if (!news) return res.send({ error: "Новость не найдена" });

        if (userId !== news.author_id)
          return res.send({ error: "У вас нет прав на это действие" });
        else {
          News.findByIdAndDelete(id, (err, news) => {
            if (err) {
              console.log(err);
            }
            res.send({ success: true });
          });
        }
      });
    })
    .catch(error => {
      console.log("err inner");
      res.send(error);
    });
};

module.exports.change = async (req, res) => {
  const { id, userId, title, content } = req.body;

  if (!id || !userId)
    return res.send({ error: "У вас нет прав на это действие" });

  if (!title || !content)
    return res.send({ error: "Все поля должны быть заполнены" });

  if (!/^[a-zа-яё0-9!\.,\s:;'"\(\)\?\*-]{2,50}$/i.test(title))
    return res.send({
      error:
        "Заголовок должен состоять от 2 до 50 символов. Разрешены русские и латинские буквы, цифры и ! , . : - ; ' \" ( ) ? *"
    });

  if (!/^[a-zа-яё0-9!\.,\s:;'"\(\)\?\*-]{10,1500}$/i.test(content))
    return res.send({
      error:
        "Содержимое должено состоять от 10 до 1500 символов. Разрешены русские и латинские буквы, цифры и ! , . : - ; ' \" ( ) ? *"
    });

  const user = await User.findById(userId).catch(err => console.log(err));

  if (!user) return res.send({ error: "У вас нет прав на это действие" });

  const news = await News.findById(id).catch(err => console.log(err));

  if (!news) return res.send({ error: "Новость не найдена!" });

  if (news.author_id !== userId)
    res.send({ error: "У вас нет прав на это действие" });

  News.findByIdAndUpdate(
    id,
    {
      title,
      content,
      changed_date: new Date()
    },
    (err, result) => {
      if (err) return console.log(err);
      res.send({ success: true });
    }
  );
};
