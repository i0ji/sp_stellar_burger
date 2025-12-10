import styles from './Loader.module.scss';
import loading from 'images/common/loading.svg';

export default function Loader({ description }: { readonly description: string }) {
  return (
    <>
      <div className={styles.loader} />

      <div className={styles.loader_content}>
        <img alt="ЗАГРУЗКА..." src={loading} />

        <h1 className="text text_type_main-medium">{description}</h1>
      </div>
    </>
  );
}
