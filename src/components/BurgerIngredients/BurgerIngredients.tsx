import styles from './BurgerIngredientsStyles.module.scss';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientGroup from './IngredientGroup/IngredientGroup.tsx';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'hooks/reduxHooks.ts';

enum TabValues {
  Bun = 'bun',
  Sauce = 'sauce',
  Main = 'main',
}

export default function BurgerIngredients() {
  // --------------- VARS & STATES ---------------

  const { ingredients: ingredientsData } = useSelector((state) => state.ingredients),
    filteredIngredients = useMemo(
      () => ({
        bun: Array.isArray(ingredientsData)
          ? ingredientsData.filter((item) => item.type === 'bun')
          : [],
        sauce: Array.isArray(ingredientsData)
          ? ingredientsData.filter((item) => item.type === 'sauce')
          : [],
        main: Array.isArray(ingredientsData)
          ? ingredientsData.filter((item) => item.type === 'main')
          : [],
      }),
      [ingredientsData]
    ),
    // --------------- SCROLL LOGIC  ---------------

    [current, setCurrent] = useState(TabValues.Bun),
    bunRef = useRef<HTMLDivElement>(null),
    sauceRef = useRef<HTMLDivElement>(null),
    mainRef = useRef<HTMLDivElement>(null),
    observerArea = document.getElementById('burgerIngredientGroups');

  useEffect(() => {
    const options = {
        root: observerArea,
        rootMargin: '-50px 0px -450px 0px',
        threshold: 0,
      },
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            switch (entry.target.id) {
              case 'bunSection':
                setCurrent(TabValues.Bun);
                break;
              case 'sauceSection':
                setCurrent(TabValues.Sauce);
                break;
              case 'mainSection':
                setCurrent(TabValues.Main);
                break;
              default:
                break;
            }
          }
        });
      }, options);

    if (bunRef.current) {
      observer.observe(bunRef.current);
    }
    if (sauceRef.current) {
      observer.observe(sauceRef.current);
    }
    if (mainRef.current) {
      observer.observe(mainRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [bunRef, sauceRef, mainRef, observerArea]);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  // --------------- MARKUP  ---------------

  return (
    <section className={styles.ingredients_block} id="burgerIngredientsContainer">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>

      <div className={styles.ingredients_menu}>
        <Tab
          active={current === TabValues.Bun}
          onClick={() => scrollToRef(bunRef)}
          value={TabValues.Bun}
        >
          Булки
        </Tab>

        <Tab
          active={current === TabValues.Sauce}
          onClick={() => scrollToRef(sauceRef)}
          value={TabValues.Sauce}
        >
          Соусы
        </Tab>

        <Tab
          active={current === TabValues.Main}
          onClick={() => scrollToRef(mainRef)}
          value={TabValues.Main}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredients_list} id="burgerIngredientGroups">
        <div id="bunSection" ref={bunRef}>
          <IngredientGroup ingredients={filteredIngredients.bun} type="Булки" />
        </div>

        <div id="sauceSection" ref={sauceRef}>
          <IngredientGroup ingredients={filteredIngredients.sauce} type="Соусы" />
        </div>

        <div id="mainSection" ref={mainRef}>
          <IngredientGroup ingredients={filteredIngredients.main} type="Начинки" />
        </div>
      </div>
    </section>
  );
}
