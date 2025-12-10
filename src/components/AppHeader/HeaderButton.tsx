import {
  BurgerIcon,
  Button,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './AppHeaderStyles.module.scss';

export default function HeaderButton({ typeFor }: { readonly typeFor: string }) {
  // --------------- VARS & STATES  ---------------

  const location = useLocation().pathname,
    activeStyle = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : 'not_active');

  // --------------- COMPONENT  ---------------

  switch (typeFor) {
    case 'builder':
      return (
        <NavLink to="/">
          <Button
            extraClass={`p-1 text text_type_main-default ${activeStyle} ${styles.header_button}`}
            htmlType="button"
            size="medium"
            type="secondary"
          >
            <BurgerIcon type="primary" />
            Конструктор
          </Button>
        </NavLink>
      );
    case 'feed':
      return (
        <NavLink to="/feed">
          <Button
            extraClass={`p-1 text text_type_main-default ${activeStyle} ${styles.header_button}`}
            htmlType="button"
            size="medium"
            type="secondary"
          >
            <ListIcon type="secondary" />
            Лента заказов
          </Button>
        </NavLink>
      );
    case 'profile':
      return (
        <NavLink to="/profile">
          <Button
            extraClass={`p-1 text text_type_main-default ${
              location === '/login' && styles.active
            } ${styles.header_button}`}
            htmlType="button"
            size="medium"
            type="secondary"
          >
            <ProfileIcon type="primary" />
            Личный кабинет
          </Button>
        </NavLink>
      );
  }
}
