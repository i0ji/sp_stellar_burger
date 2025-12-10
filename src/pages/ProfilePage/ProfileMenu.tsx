import styles from 'profile/ProfilePage.module.scss';

import { logoutUser } from 'utils/api';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'hooks/reduxHooks.ts';

export default function ProfileMenu() {
  // --------------- NAVIGATION & BACKGROUND---------------

  const navigate = useNavigate(),
    location = useLocation(),
    // --------------- VARS & STATES ---------------

    dispatch = useDispatch(),
    isActive = location.pathname === '/profile',
    //FEATURE
    // refreshToken = localStorage.getItem('refreshToken'),
    //  --------------- LOGOUT
    handleLogout = () => {
      dispatch(logoutUser());
      navigate('/login');
    };

  return (
    <div>
      <div className={styles.profile_buttons}>
        <Link className={`mb-10 `} to="/profile">
          <Button
            extraClass={`text text_type_main-medium ${isActive ? styles.isActive : ''}`}
            htmlType="button"
            size="medium"
            type="secondary"
          >
            Профиль
          </Button>
        </Link>

        <Link className={`mb-10 `} to="/profile/orders">
          <Button
            extraClass={`text text_type_main-medium ${!isActive ? styles.isActive : ''}`}
            htmlType="button"
            size="medium"
            type="secondary"
          >
            История заказов
          </Button>
        </Link>

        <Link className="mb-10" to="/">
          <Button
            data-testid="profile_quit_button"
            extraClass="text text_type_main-medium"
            htmlType="button"
            onClick={handleLogout}
            size="medium"
            type="secondary"
          >
            Выход
          </Button>
        </Link>

        <p>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
    </div>
  );
}
