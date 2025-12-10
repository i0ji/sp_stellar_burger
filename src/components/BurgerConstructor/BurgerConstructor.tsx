import styles from './BurgerConstructorStyles.module.scss';
import awaitSpinner from 'images/common/awaitSpinner.svg';

import { createOrder } from 'utils/api';

import { IIngredient } from 'declarations/interfaces';

import { addIngredient, reorderIngredients } from 'slices/constructorSlice.ts';
import { updateIds, updateOrderNumber } from 'slices/orderSlice.ts';

import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import CurrentIngredients from './CurrentIngredients/CurrentIngredients.tsx';
import { Loader, OrderAcceptance, WarningMessage } from 'components/index.ts';

import { useDispatch, useSelector } from 'hooks/reduxHooks.ts';
import useModal from 'hooks/useModal.ts';
import { useCallback, useEffect, useState, LegacyRef } from 'react';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';

export default function BurgerConstructor() {
  // --------------- VARS & STATES ---------------

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addedIngredients, bun } = useSelector((state) => state.constructorSlice);
  // --------------- HIGHLIGHT STATE
  const [bunAvail, setBunAvail] = useState(false);
  const [ingredientsAvail, setIngredientsAvail] = useState(false);
  // --------------- PRELOADER CONSTANTS
  const isLoaded = useSelector((state) => state.orderSlice.status);
  const hasError = useSelector((state) => state.orderSlice.error);
  // --------------- CURRENT IDS
  const ingredientIDs = addedIngredients.map((elem: IIngredient) => elem._id);
  // --------------- MODAL
  const { isVisible, openModal, closeModal } = useModal();
  // --------------- TOTAL AMOUNT
  const totalAmount = useSelector((state) => state.constructorSlice.totalPrice);
  // --------------- BUNS STATE
  const isBun: IIngredient | null = useSelector((state) => state.constructorSlice.bun);
  //--------------- AUTH STATE
  const isAuth = useSelector((state) => state.authSlice.isAuth);

  // --------------- CURRENT ID ---------------

  if (isBun) {
    ingredientIDs.push(isBun._id);
  }

  useEffect(() => {
    dispatch(updateIds(ingredientIDs));
  }, [dispatch, addedIngredients, ingredientIDs]);

  // --------------- DROP LOGIC ---------------

  const [, dropIngredients] = useDrop({
    accept: ['bun', 'ingredient'],
    drop: (item: IIngredient) => {
      dispatch(addIngredient(item));
    },
  });

  const moveIngredient = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      dispatch(reorderIngredients({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );

  const renderIngredients = (ingredient: IIngredient, uuid: number) => {
    return (
      <CurrentIngredients
        key={ingredient.id}
        ingredient={ingredient}
        index={uuid}
        moveIngredient={moveIngredient}
      />
    );
  };

  // --------------- PREVENT FROM ORDER ---------------

  const preventOrderState = Boolean(isBun) && Boolean(addedIngredients.length);

  // --------------- HIGHLIGHT CONDITION ---------------

  const isIngredientInOrder = Boolean(addedIngredients.length);
  const isBunInOrder = Boolean(isBun);

  const handleBunHighlight = () => {
    if (!isBunInOrder) {
      setBunAvail(true);
    }
  };

  const handleIngredientsHighlight = () => {
    if (!isIngredientInOrder) {
      setIngredientsAvail(true);
    }
  };

  const handleButtonMouseOut = () => {
    setBunAvail(false);
    setIngredientsAvail(false);
  };

  // --------------- INITIAL CONSTRUCTOR LIST ---------------

  const InitialBun = ({ pos }: { pos: 'top' | 'bottom' | undefined }) => {
    return (
      <ConstructorElement
        extraClass={`${styles.constructor_initial_bun} ${bunAvail ? styles.highlight_problem : ''}`}
        text={'Перетащите сюда булочку'}
        type={pos}
        isLocked={true}
        thumbnail={awaitSpinner}
        price={0}
      />
    );
  };

  const InitialIngredient = () => {
    return (
      <ConstructorElement
        extraClass={`${styles.constructor_initial_ingredient} ${
          ingredientsAvail ? styles.highlight_problem : ''
        }`}
        text={'Перетащите сюда ингредиенты'}
        isLocked={true}
        thumbnail={awaitSpinner}
        price={0}
      />
    );
  };

  // --------------- GET ORDER NUMBER LOGIC ---------------

  const handleOrder = async (): Promise<void> => {
    // 1. Если не авторизован - редирект и ВЫХОД из функции
    if (!isAuth) {
      navigate('/login');
      return; // Обязательно добавляем return!
    }

    await openModal();

    // 2. Добавляем await перед dispatch
    const action = await dispatch(createOrder(ingredientIDs));

    // 3. Проверяем, что экшен выполнился успешно (fulfilled)
    if (createOrder.fulfilled.match(action)) {
      // Теперь TS знает, что payload существует и это number
      dispatch(updateOrderNumber(action.payload));
    }
    // Опционально: обработка ошибки
    else if (createOrder.rejected.match(action)) {
      console.error('Ошибка создания заказа:', action.payload || action.error);
    }
  };

  // --------------- MARKUP  ---------------

  return (
    <section className={styles.constructor_block}>
      <div
        className={`${styles.constructor_list} mb-10`}
        //
        ref={dropIngredients as unknown as LegacyRef<HTMLDivElement>}
      >
        {/* --------------- TOP BUN --------------- */}

        {!isBun ? (
          <InitialBun pos={'top'} />
        ) : (
          <div className={styles.constructor_order_item}>
            {bun && (
              <ConstructorElement
                extraClass={styles.constructor_item_top}
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price ?? 0}
                thumbnail={bun.image || ''}
              />
            )}
          </div>
        )}

        {/* --------------- INNER INGREDIENTS + ORDER CONDITION --------------- */}

        {!isIngredientInOrder ? (
          <InitialIngredient />
        ) : (
          <div
            className={`${styles.constructor_order} ${
              ingredientsAvail ? styles.highlight_problem : ''
            }`}
            style={{
              scrollbarWidth: addedIngredients.length > 3 ? 'inherit' : 'none',
              width: addedIngredients.length > 3 ? '100%' : '97%',
            }}
          >
            {addedIngredients.map((ingredient: IIngredient, uuid: number) =>
              renderIngredients(ingredient, uuid)
            )}
          </div>
        )}

        {/* --------------- BOTTOM BUN --------------- */}

        {!isBun ? (
          <InitialBun pos={'bottom'} />
        ) : (
          <div className={styles.constructor_order_item}>
            {bun && (
              <ConstructorElement
                extraClass={styles.constructor_item_bottom}
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price ?? 0}
                thumbnail={bun.image || ''}
              />
            )}
          </div>
        )}

        {/* --------------- PRICE --------------- */}

        <div className={`mt-4 ${styles.price_info}`}>
          <h1 className="text text_type_digits-medium pr-3">{totalAmount}</h1>
          <CurrencyIcon type="primary" />

          <div
            onMouseOver={() => {
              handleBunHighlight();
              handleIngredientsHighlight();
            }}
            onMouseOut={handleButtonMouseOut}
          >
            <Button
              disabled={!preventOrderState}
              extraClass="ml-3"
              size="large"
              type="primary"
              htmlType="button"
              onClick={handleOrder}
            >
              {isAuth ? 'Оформить заказ' : 'Войти в Аккаунт'}
            </Button>
          </div>
        </div>

        {/* -------------- MODAL + PRELOADER --------------- */}

        {isLoaded === 'loading' && !hasError && <Loader description={'Готовим заказ...'} />}

        {isLoaded === 'failed' && <WarningMessage onClose={closeModal} />}

        {isLoaded === 'succeeded' && isVisible && <OrderAcceptance onClose={closeModal} />}
      </div>
    </section>
  );
}
