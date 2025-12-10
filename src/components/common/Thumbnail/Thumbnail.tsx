import styles from './ThumbnailStyles.module.scss';

export default function Thumbnail({
  image,
  count,
  isLast,
}: {
  readonly image: string | undefined;
  readonly count: number | null;
  readonly isLast: boolean;
}) {
  const brightness = isLast ? '50' : '100';

  return (
    <div className={styles.thumbnail_wrapper}>
      <div className={styles.thumbnail_wrapper_background} style={{ filter: brightness }}>
        {isLast ? (
          <span className={`text text_type_digits-default ${styles.thumbnail_count}`}>
            +{count}
          </span>
        ) : null}

        <img alt="Ингредиент!" className={isLast ? styles.img : ''} src={image} />
      </div>
    </div>
  );
}
