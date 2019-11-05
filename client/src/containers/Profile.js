import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChangeAvatar } from './ChangeAvatar';
import { ChangePassword } from './ChangePassword';
import { DeleteAccount } from './DeleteAccount';
import { getStringFromDate } from '../utils/getStringFromDate';
import { useHistory } from 'react-router-dom';

export const Profile = () => {
  useEffect(() => {
    document.title = 'My Profile';
  }, []);

  let history = useHistory();

  const regDate = useSelector(store => store.user.reg_date);
  if (!regDate && !localStorage.getItem('userId')) history.replace('/');

  return (
    <div>
      <h1>My profile</h1>
      <p>Дата регистрации: {getStringFromDate(regDate)}</p>

      <ChangeAvatar />
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
};
