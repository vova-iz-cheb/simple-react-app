import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userInit } from '../actions/userActions';

export const ChangeAvatar = () => {
  const [error, setError] = useState('');

  const id = useSelector(store => store.user.id);
  const ava = useSelector(store => store.user.avatar);
  const [avatar, setAvatar] = useState(ava || 'man');

  const dispatch = useDispatch();

  const selectAvatar = e => {
    e.preventDefault();
    setAvatar(e.currentTarget.dataset.img);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const body = JSON.stringify({
      id,
      avatar,
      action: 'avatar',
    });

    fetch('/api/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body,
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        if (result.error) setError(result.error);
        else {
          dispatch(
            userInit({
              id: result._id,
              login: result.login,
              reg_date: result.reg_date,
              avatar: result.avatar,
            })
          );
        }
      })
      .catch(err => {
        alert('Сервер не допуспен!');
      });
  };

  return (
    <form>
      <h2>Изменить аватар:</h2>
      {error ? <div className="error">{error}</div> : null}
      <ul className="avatarList">
        <li>
          <a href="" onClick={selectAvatar} data-img="man">
            <img
              src={require('../img/man.jpg')}
              alt="man"
              className={avatar === 'man' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="bird">
            <img
              src={require('../img/bird.jpg')}
              alt="bird"
              className={avatar === 'bird' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="cat">
            <img
              src={require('../img/cat.jpg')}
              alt="cat"
              className={avatar === 'cat' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="dog">
            <img
              src={require('../img/dog.jpg')}
              alt="dog"
              className={avatar === 'dog' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="halflife">
            <img
              src={require('../img/halflife.jpg')}
              alt="halflife"
              className={avatar === 'halflife' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="man2">
            <img
              src={require('../img/man2.jpg')}
              alt="man2"
              className={avatar === 'man2' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="wolf">
            <img
              src={require('../img/wolf.jpg')}
              alt="wolf"
              className={avatar === 'wolf' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="woman">
            <img
              src={require('../img/woman.jpg')}
              alt="woman"
              className={avatar === 'woman' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="woman2">
            <img
              src={require('../img/woman2.jpg')}
              alt="woman2"
              className={avatar === 'woman2' ? 'active' : null}
            />
          </a>
        </li>
        <li>
          <a href="" onClick={selectAvatar} data-img="woman3">
            <img
              src={require('../img/woman3.jpg')}
              alt="woman3"
              className={avatar === 'woman3' ? 'active' : null}
            />
          </a>
        </li>
      </ul>
      <input type="submit" value="Изменить" onClick={handleSubmit} />
    </form>
  );
};
