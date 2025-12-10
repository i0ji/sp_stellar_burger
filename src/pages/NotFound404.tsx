import styles from './Pages.module.scss';
import astronaut from 'images/404/astronaut.png';
import loading from 'images/common/loading.svg';

import { Link } from 'react-router-dom';

export default function NotFound404() {
  return (
    <section className={styles.section}>
      <div className={styles.not_found}>
        <h1 className="text text_type_digits-large">404</h1>

        <p className="text text_type_main-large mb-15">Страница не найдена :(</p>

        <Link className={`text text_type_main-medium ${styles.link}`} to="/">
          На главную
        </Link>

        <img alt="" className={styles.astronaut} src={astronaut} />

        <img alt="" className={styles.astro_loading} id="astroloading" src={loading} />
      </div>
    </section>
  );
}
