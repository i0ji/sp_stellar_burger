import styles from './Pages.module.scss';

import { registerUser } from 'utils/api';

import { IForm, IRegisterRequest } from 'declarations/interfaces';

import { Link, useNavigate } from 'react-router-dom';
import { Transitions } from 'components/index.ts';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import React, { useState } from 'react';
import { useDispatch } from 'hooks/reduxHooks.ts';
import { useForm } from 'hooks/useForm.ts';

export default function RegisterPage() {
  const dispatch = useDispatch(),
    { values, handleChange } = useForm<IForm>({}),
    [isPasswordShow, setIsPasswordShow] = useState(false),
    isFormEmpty = !values.email || !values.password || !values.name,
    navigate = useNavigate(),
    // --------------- PWD VISIBILITY
    togglePasswordVisibility = () => {
      setIsPasswordShow(!isPasswordShow);
    };
  // --------------- REGISTER
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Формируем объект запроса с четким типом
    const registerData: IRegisterRequest = {
      email: values.email || '',
      password: values.password || '',
      name: values.name || '',
    };

    // Диспатчим экшен и ждем результата
    const result = await dispatch(registerUser(registerData));

    // Если регистрация успешна - редирект на главную (или куда нужно)
    if (registerUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <Transitions>
      <section className={styles.section}>
        <form onSubmit={handleRegister}>
          <h1 className="text text text_type_main-medium pb-6">Регистрация</h1>

          {/* FEATURE */}
          <Input
            {...({
              error: false,
              errorText: 'Ошибка',
              extraClass: 'mb-6',
              icon: undefined,
              name: 'name',
              onChange: handleChange,
              placeholder: 'Имя',
              size: 'default',
              type: 'text',
              value: values.name ?? '',
            } as any)}
          />

          <Input
            {...({
              error: false,
              errorText: 'Ошибка',
              extraClass: 'mb-6',
              icon: undefined,
              name: 'email',
              onChange: handleChange,
              placeholder: 'E-mail',
              size: 'default',
              type: 'text',
              value: values.email ?? '',
            } as any)}
          />

          <Input
            {...({
              error: false,
              errorText: 'Ошибка',
              extraClass: 'mb-6',
              icon: 'ShowIcon',
              name: 'password',
              onChange: handleChange,
              onIconClick: togglePasswordVisibility,
              placeholder: 'Пароль',
              size: 'default',
              type: isPasswordShow ? 'text' : 'password',
              value: values.password ?? '',
            } as any)}
          />

          <Button disabled={isFormEmpty} extraClass="mb-20" htmlType="submit" type="primary">
            Зарегистрироваться
          </Button>

          <p>
            Уже зарегистрированы?
            <Link to="/login">&nbsp;Войти</Link>
          </p>
        </form>
      </section>
    </Transitions>
  );
}
