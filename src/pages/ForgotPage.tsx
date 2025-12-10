import styles from 'pages/Pages.module.scss';

import { forgotPassword } from 'utils/api';

import { IForm } from 'declarations/interfaces';

import { Transitions } from 'components/index.ts';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'hooks/useForm.ts';
import { useDispatch } from 'hooks/reduxHooks.ts';

export default function ForgotPage() {
  const { values, handleChange } = useForm<IForm>({}),
    dispatch = useDispatch(),
    navigate = useNavigate();

  const handleForgotPassword = async () => {
    // Вызов forgotPassword возвращает Promise, нужно дождаться результата dispatch
    // или, если это thunk, получить результат
    const resultAction = await dispatch(forgotPassword(values.email));

    // Проверяем успех (опционально, зависит от вашего API)
    if (forgotPassword.fulfilled.match(resultAction)) {
      navigate('/reset-password');
    }
  };

  return (
    <Transitions>
      <section className={styles.section}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void handleForgotPassword();
          }}
        >
          <h1 className="text text text_type_main-medium pb-6">Восстановить пароль</h1>

          {/* <Input
            error={false}
            errorText="Ошибка"
            extraClass="mb-6"
            icon={undefined}
            name="email"
            onChange={handleChange}
            placeholder="E-mail"
            size="default"
            type="text"
            value={values.email ?? ``}
          /> */}
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

          <Button extraClass="mb-20" htmlType="submit" type="primary">
            Восстановить
          </Button>

          <p>
            Вспомнили пароль?
            <Link to="/login">&nbsp;Войти</Link>
          </p>
        </form>
      </section>
    </Transitions>
  );
}
