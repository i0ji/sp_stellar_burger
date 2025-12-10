import styles from 'pages/Pages.module.scss';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const navigate = useNavigate(),
    [count, setCount] = useState(10);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        navigate('/');
      }, 10000),
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [navigate]);

  return (
    <section className={styles.section}>
      <form>
        <h1 className="text text text_type_main-medium pb-6"> Пароль успешно изменён!</h1>

        <p className="pb-6">
          Автоматически вернёмся на главную через:
          <span style={{ color: '#b90101' }}>{count}</span> секунд...
        </p>

        <p>
          <Link to="/">&nbsp;На главную</Link>
        </p>
      </form>
    </section>
  );
}
