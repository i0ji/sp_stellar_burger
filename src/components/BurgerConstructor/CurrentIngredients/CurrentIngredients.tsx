import CurrentIngredientsStyles from './CurrentIngredientsStyles.module.scss';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IDragItem, IIngredient } from 'declarations/interfaces';
import { useDispatch } from 'hooks/reduxHooks.ts';
import { removeIngredient } from 'slices/constructorSlice.ts';
import { useRef } from 'react';
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

export default function CurrentIngredients({
  ingredient,
  index,
  moveIngredient,
}: {
  readonly ingredient: IIngredient;
  readonly index: number;
  readonly moveIngredient: (dragIndex: number, hoverIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null),
    dispatch = useDispatch(),
    handleRemoveIngredient = (id: string) => {
      dispatch(removeIngredient(id));
    },
    [{ handlerId }, drop] = useDrop({
      accept: 'ingredients',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        };
      },
      hover(item: IDragItem) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index,
          hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        item.index = hoverIndex;

        moveIngredient(dragIndex, hoverIndex);
      },
    } as {
      accept: string;
      collect: (monitor: DropTargetMonitor) => { handlerId: string };
      hover: (item: IDragItem, monitor: DropTargetMonitor) => void;
    }),
    [{ isDragging }, drag] = useDrag({
      type: 'ingredients',
      item: () => ({
        id: ingredient._id,
        index,
      }),
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  // --------------- MARKUP  ---------------

  return (
    <div
      className={CurrentIngredientsStyles.constructor_order_item}
      data-handler-id={handlerId}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type="primary" />

      <ConstructorElement
        handleClose={
          ingredient._id !== undefined ? () => handleRemoveIngredient(ingredient._id!) : undefined
        }
        price={ingredient.price || 0}
        text={ingredient.name}
        thumbnail={ingredient.image || ''}
      />
    </div>
  );
}
