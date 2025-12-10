import 'styles/_scrollbar.scss';

import { Route, Routes, useNavigate } from 'react-router-dom';
import { checkUserAuth, getIngredients, getUserData } from 'utils/api.ts';

import { AppHeader, Loader, Modal } from 'components/index.ts';

import {
  FeedPage,
  ForgotPage,
  HomePage,
  IngredientDetails,
  LoginPage,
  NotFound404,
  OrderDetails,
  ProfileOrders,
  ProfilePage,
  RegisterPage,
  ResetPage,
  SuccessPage,
} from './pages';

import { useDispatch, useSelector } from 'hooks/reduxHooks.ts';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';

import { ProtectedRoute } from 'common/ProtectedRoute/ProtectedRoute.tsx';

export default function App() {
  //CONSOLE
  console.log('2.0.0');

  // --------------- VARS & STATES ---------------

  const dispatch = useDispatch(),
    location = useLocation(),
    background: string = location.state && location.state.background,
    navigate = useNavigate(),
    ingredientsStatus = useSelector((state) => state.ingredients.status),
    accessToken = localStorage.getItem('accessToken'),
    // --------------- HANDLE CLOSE MODAL
    handleCloseModal = useCallback(() => {
      navigate(-1);
    }, [navigate]);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
    dispatch(getUserData());
  }, [dispatch, accessToken]);

  // --------------- LOADER ---------------

  if (ingredientsStatus == 'loading') {
    return <Loader description="Загрузка..." />;
  }

  // --------------- MARKUP ---------------

  return (
    <>
      <AppHeader />

      <Routes location={background || location}>
        <Route element={<HomePage />} path="/" />

        <Route element={<ResetPage />} path="reset-password" />

        <Route element={<SuccessPage />} path="reset-success" />

        <Route element={<IngredientDetails />} path="ingredient/:id" />

        <Route element={<FeedPage />} path="feed" />

        <Route element={<OrderDetails />} path="feed/:number" />

        <Route
          element={<ProtectedRoute component={<ProfilePage />} unAuth={false} />}
          path="profile"
        />

        <Route
          element={<ProtectedRoute component={<ProfileOrders />} unAuth={false} />}
          path="profile/orders"
        />

        <Route
          element={<ProtectedRoute component={<OrderDetails />} unAuth={false} />}
          path="profile/orders/:number"
        />

        <Route element={<ProtectedRoute component={<LoginPage />} unAuth />} path="login" />

        <Route
          element={<ProtectedRoute component={<ProfilePage />} unAuth={false} />}
          path="login"
        />

        <Route element={<ProtectedRoute component={<RegisterPage />} unAuth />} path="register" />

        <Route
          element={<ProtectedRoute component={<ForgotPage />} unAuth />}
          path="forgot-password"
        />

        <Route element={<NotFound404 />} path="*" />
      </Routes>

      {background ? (
        <Routes>
          <Route
            element={
              <Modal onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
            path="ingredient/:id"
          />
        </Routes>
      ) : null}

      {background ? (
        <Routes>
          <Route
            element={
              <Modal onClose={handleCloseModal}>
                <OrderDetails />
              </Modal>
            }
            path="feed/:number"
          />
        </Routes>
      ) : null}

      {background ? (
        <Routes>
          <Route
            element={
              <Modal onClose={handleCloseModal}>
                <OrderDetails />
              </Modal>
            }
            path="profile/orders/:number"
          />
        </Routes>
      ) : null}
    </>
  );
}
