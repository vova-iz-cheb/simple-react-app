import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const ChangePassword = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [oldpassword, setOldpassword] = useState('');
  const [newpassword, setNewpassword] = useState('');
  const [newpassword2, setNewpassword2] = useState('');

  const id = useSelector(store => store.user.id);

  const handleSubmit = e => {
    e.preventDefault();

    const body = JSON.stringify({
      id,
      oldpassword,
      newpassword,
      newpassword2,
      action: 'password',
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
        if (result.error) {
          setError(result.error);
          setTimeout(() => {
            setError('');
          }, 3000);
        }
        if (result.success) {
          setSuccess(result.success);
          setError('');
          setOldpassword('');
          setNewpassword('');
          setNewpassword2('');
          setTimeout(() => {
            setSuccess('');
          }, 5000);
        }
      })
      .catch(err => {
        setError('Сервер не доспупен, приносим свои извинения.');
        setTimeout(() => {
          setError('');
        }, 5000);
      });
  };

  return (
    <form>
      <h2>Изменить Пароль:</h2>
      {error ? <div className="error">{error}</div> : null}
      {success ? <div className="success">{success}</div> : null}

      <label htmlFor="oldpassword">Старый пароль</label>
      <br />
      <input
        type="password"
        id="oldpassword"
        value={oldpassword}
        onChange={e => setOldpassword(e.currentTarget.value)}
      />
      <br />

      <label htmlFor="newpassword">Новый пароль</label>
      <br />
      <input
        type="password"
        id="newpassword"
        value={newpassword}
        onChange={e => setNewpassword(e.currentTarget.value)}
      />
      <br />

      <label htmlFor="newpassword2">Еще раз новый пароль</label>
      <br />
      <input
        type="password"
        id="newpassword2"
        value={newpassword2}
        onChange={e => setNewpassword2(e.currentTarget.value)}
      />
      <br />

      <input type="submit" value="Изменить" onClick={handleSubmit} />
    </form>
  );
};
