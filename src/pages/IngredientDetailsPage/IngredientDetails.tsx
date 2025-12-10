import styles from './IngredientDetailsStyles.module.scss';

import { IIngredient } from 'declarations/interfaces';
import { IBurgerState } from 'declarations/interfaces';

import { Loader } from 'components/index.ts';

import { useSelector } from 'hooks/reduxHooks.ts';
import { useLocation, useParams } from 'react-router-dom';

export default function IngredientDetails() {
  // --------------- NAVIGATION & BACKGROUND---------------

  const { id } = useParams<{ id?: string }>(),
    location = useLocation(),
    modalBackground = location.key === 'default' ? `` : styles.modal_background,
    // --------------- INGREDIENT DATA ---------------

    {
      ingredients: ingredientsData,
      status,
      error,
    }: IBurgerState = useSelector((state: { ingredients: IBurgerState }) => state.ingredients),
    [ingredient] = ingredientsData.filter((ingredient: IIngredient) => ingredient._id === id);

  // --------------- STATUSES ---------------

  if (status === 'loading') {
    return <Loader description="Проверяем ингредиенты..." />;
  }

  if (status === 'failed') {
    return (
      <p className={styles.status}>
        Ошибка:
        {error}
      </p>
    );
  }

  // --------------- MARKUP ---------------

  return (
    <div className={`${styles.ingredients_details} ${modalBackground}`}>
      {error ? (
        <p>
          Произошла ошибка:
          {error}
        </p>
      ) : (
        ingredientsData.length > 0 && (
          <>
            <h3 className="text text_type_main-large">Детали ингредиента</h3>

            <img alt={ingredient.name} className="mb-4" src={ingredient.image} />

            <h4 className="text text_type_main-medium mb-8">{ingredient.name}</h4>

            <div className={styles.ingredients_details_features}>
              <div className={styles.feature}>
                <p className="text text_type_main-default">Калории, калл</p>

                <p className="text text_type_digits-default">{ingredient.calories}</p>
              </div>

              <div className={`${styles.feature} pl-5`}>
                <p className="text text_type_main-default">Белки, г</p>

                <p className="text text_type_digits-default">{ingredient.proteins}</p>
              </div>

              <div className={`${styles.feature} pl-5`}>
                <p className="text text_type_main-default">Жиры, г</p>

                <p className="text text_type_digits-default">{ingredient.fat}</p>
              </div>

              <div className={`${styles.feature} pl-5`}>
                <p className="text text_type_main-default">Углеводы, г</p>

                <p className="text text_type_digits-default">{ingredient.carbohydrates}</p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
