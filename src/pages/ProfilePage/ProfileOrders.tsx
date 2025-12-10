import styles from './ProfilePage.module.scss';

import { WS_URL } from 'declarations/routs.ts';
import { updateCurrentOrder } from 'slices/orderSlice.ts';
import { wsClose, wsConnect } from 'services/orderFeed/actions.ts';

import { TOrder } from 'declarations/types';

import { FeedItem, Loader, Transitions } from 'components/index.ts';
import ProfileMenu from './ProfileMenu.tsx';

import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'hooks/reduxHooks.ts';
import { useEffect } from 'react';

export default function ProfileOrders() {
  // --------------- VARS & STATES ---------------

  const dispatch = useDispatch(),
    accessToken = localStorage.getItem('accessToken'),
    formattedAccessToken = accessToken ? accessToken.replace('Bearer ', '') : '',
    WS_URL_WITH_TOKEN = `${WS_URL}?token=${formattedAccessToken}`,
    // --------------- NAVIGATION ---------------

    location = useLocation(),
    modalBackground = location.key === 'default' ? styles.background : styles.dark;

  // --------------- WS & ORDERS ---------------

  useEffect(() => {
    dispatch(wsConnect(WS_URL_WITH_TOKEN));
    return () => {
      dispatch(wsClose());
    };
  }, [WS_URL_WITH_TOKEN, dispatch]);

  const ordersList = useSelector((state) => state.orderFeed.orders),
    // --------------- STATUS
    status = useSelector((state) => state.orderFeed.status),
    // --------------- DATA
    ordersData = ordersList.orders;
  // --------------- CONDITION
  if (!ordersData) {
    return <Loader description="Летим за едой..." />;
  }

  const reversedOrdersData: Array<TOrder> = [...ordersData].reverse();

  const onUpgradeCurrentOrder = (order: TOrder) => {
    dispatch(updateCurrentOrder(order));
  };

  // --------------- MARKUP ---------------

  return (
    <section className={styles.profile_section}>
      <ProfileMenu />

      <div className={`${styles.profile_orders} ${modalBackground}`}>
        {status !== 'ONLINE' ? (
          <Loader description="" />
        ) : ordersList ? (
          reversedOrdersData.map((currentOrder: TOrder, i: number) => (
            <Link
              key={i}
              onClick={() => onUpgradeCurrentOrder(currentOrder)}
              state={{ background: location }}
              to={`/profile/orders/${currentOrder.number}`}
            >
              <Transitions>
                <FeedItem currentOrder={currentOrder} />
              </Transitions>
            </Link>
          ))
        ) : null}
      </div>
    </section>
  );
}
