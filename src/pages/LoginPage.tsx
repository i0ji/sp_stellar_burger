import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Loader, Transitions } from 'components/index.ts';
import { Link } from 'react-router-dom';

import { IForm, ILoginRequest } from 'declarations/interfaces';

import styles from 'pages/Pages.module.scss';

import { loginUser } from 'utils/api';
import checkEmail from 'utils/checkEmail.ts';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'hooks/reduxHooks.ts';
import { useForm } from 'hooks/useForm.ts';

export default function LoginPage() {
  const { values, handleChange } = useForm<IForm>({}),
    [emailError, setEmailError] = useState<boolean>(false),
    [loginError, setLoginError] = useState<boolean>(false),
    stateLoginError = useSelector((state) => state.authSlice.loginError),
    dispatch = useDispatch(),
    userAuth = useSelector((state) => state.authSlice.isAuth),
    //  --------------- RERENDER CHECK ---------------

    /*
     * Const renderCount = useRef(0);
     * useEffect(() => {
     *     renderCount.current += 1;
     * });
     * console.log(`Rerender counter: ${renderCount.current}`)
     */

    // --------------- PWD VISIBILITY  ---------------

    [isPasswordShow, setIsPasswordShow] = useState(false),
    togglePasswordVisibility = () => {
      setIsPasswordShow(!isPasswordShow);
    },
    // --------------- ERROR MESSAGE ---------------

    handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      checkEmail(values.email) ? setEmailError(true) : setEmailError(false);

      stateLoginError && setLoginError(true);

      const credentials: ILoginRequest = {
        email: values.email,
        password: values.password,
      };

      dispatch(loginUser(credentials));
    };

  // --------------- CONDITION ---------------

  if (userAuth) {
    return <Loader description="Проходим фейсконтроль..." />;
  }

  // --------------- MARKUP ---------------

  return (
    <section className={styles.section}>
      <Transitions>
        <form onSubmit={handleLogin}>
          <h1 className="text text text_type_main-medium pb-6">Вход</h1>

          {/* FEATURE */}
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
          {/* FEATURE */}
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

          {!emailError && loginError ? (
            <p className="pb-6" style={{ color: '#b90101' }}>
              Неверный пароль или Email. Попробуйте ещё раз.
            </p>
          ) : null}

          {emailError ? (
            <p className="pb-6" style={{ color: '#b90101' }}>
              Некорректный Email.
            </p>
          ) : null}

          <Button extraClass="mb-20" htmlType="submit" type="primary">
            Войти
          </Button>

          <p>
            Вы — новый пользователь?
            <Link to="/register">&nbsp;Зарегистрироваться</Link>
          </p>

          <p>
            Забыли пароль?
            <Link to="/forgot-password"> Восстановить пароль</Link>
          </p>
        </form>
      </Transitions>
    </section>
  );
}
