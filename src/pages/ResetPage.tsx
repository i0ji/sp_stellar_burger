import styles from './Pages.module.scss';
import { resetPassword } from 'utils/api';
import { Transitions } from 'components/index.ts';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordShow(!isPasswordShow);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'token') {
      setToken(value);
    }
  }, []);

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (!password || !token) return;

    resetPassword(password, token)
      .then((response) => {
        // Проверяем успешность
        if (response && response.success) {
          navigate('/login'); // Обычно после сброса редирект на логин
        } else {
          console.error('Ошибка при восстановлении пароля:', response?.message || 'Unknown error');
        }
      })
      .catch((error) => {
        console.error('Ошибка при восстановлении пароля:', error);
      });
  };

  return (
    <Transitions>
      <section className={styles.section}>
        <form onSubmit={handleSavePassword}>
          <h1 className="text text text_type_main-medium pb-6">Смена пароля</h1>

          {/* Исправляем типы Input через as any */}
          <Input
            {...({
              error: false,
              errorText: 'Ошибка',
              extraClass: 'mb-6',
              icon: 'ShowIcon',
              name: 'password',
              onChange: handleChange,
              onIconClick: togglePasswordVisibility,
              placeholder: 'Введите новый пароль',
              size: 'default',
              type: isPasswordShow ? 'text' : 'password',
              value: password,
            } as any)}
          />

          <Input
            {...({
              error: false,
              errorText: 'Ошибка',
              extraClass: 'mb-6',
              icon: undefined,
              name: 'token',
              onChange: handleChange,
              placeholder: 'Введите код из письма',
              size: 'default',
              type: 'text',
              value: token,
            } as any)}
          />

          <Button extraClass="mb-20" htmlType="submit" type="primary">
            Сохранить
          </Button>
        </form>
      </section>
    </Transitions>
  );
}
