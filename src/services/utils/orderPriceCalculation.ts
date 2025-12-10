import { IIngredient, IIngredientsWithQuantity } from 'declarations/interfaces';

export const orderPriceCalculation = (ingredientsWithQuantity: Array<IIngredientsWithQuantity>) => {
  let totalOrderPrice = 0;

  ingredientsWithQuantity.forEach((item) => {
    const itemPrice = item.ingredient.price;
    totalOrderPrice += itemPrice * item.qty;
  });

  return totalOrderPrice;
};

export const getIngredientsWithQuantity = (
  orderIngredientIDs: Array<string>,
  ingredientsData: Array<IIngredient>
): Array<IIngredientsWithQuantity> => {
  const ingredientCounts: { [key: string]: number } = {},
    ingredientsWithQuantity: Array<IIngredientsWithQuantity> = [];

  orderIngredientIDs.forEach((order) => {
    ingredientCounts[order] = (ingredientCounts[order] || 0) + 1;
  });

  ingredientsData.forEach((ingredient) => {
    if (orderIngredientIDs.includes(ingredient._id as string)) {
      let qty = ingredientCounts[ingredient._id as string];

      if (ingredient.type === 'bun') {
        qty = 2;
      }

      ingredientsWithQuantity.push({ ingredient, qty });
    }
  });

  return ingredientsWithQuantity;
};
