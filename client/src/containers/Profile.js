import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ChangeAvatar } from './ChangeAvatar';
import { ChangePassword } from './ChangePassword';
import { DeleteAccount } from './DeleteAccount';
import { getStringFromDate } from '../utils/getStringFromDate';

export const Profile = () => {
  useEffect(() => {
    document.title = 'My Profile';
  });

  const regDate = useSelector(store => store.user.reg_date);

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
