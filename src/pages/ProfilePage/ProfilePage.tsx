import styles from './ProfilePage.module.scss';
import { updateUserData } from 'utils/api.ts'; // Убрали getUserData
import { IForm, IUpdateUserRequest } from 'declarations/interfaces'; // Убрали TInputElementType
import { useForm } from 'hooks/useForm.ts';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'hooks/reduxHooks.ts';
import ProfileOrders from './ProfileOrders.tsx';
import ProfileMenu from './ProfileMenu.tsx';
import { Loader, Transitions } from 'components/index.ts';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';

export default function ProfilePage() {
  const location = useLocation();
  // Убрали authStatus, так как мы проверяем только наличие userData
  const userData = useSelector((state) => state.authSlice.user);
  const dispatch = useDispatch();

  const { values, handleChange, setValues } = useForm<IForm>({});
  
  const [showUpdateButtons, setShowUpdateButtons] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // Убрали editedValues и setEditedValues - они не нужны, так как данные берутся из userData напрямую

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Убрали isOrdersLoading - он не использовался

  // --------------- EDIT LOGIC ---------------

  const handleEditIconClick = (fieldName: string) => {
    if (!isEditing) {
      setEditingField(fieldName);
      setIsEditing(true);
      // При начале редактирования инициализируем значение из инпута
      setValues({ ...values, [fieldName]: userData?.[fieldName as keyof typeof userData] || '' });
    }
    setShowUpdateButtons(true);
  };

  const handleSave = async () => {
    if (editingField && values[editingField]) {
      const updatePayload: IUpdateUserRequest = {
          [editingField]: values[editingField]
      };
      
      await dispatch(updateUserData(updatePayload));
      
      setEditingField(null);
      setIsEditing(false);
      setShowUpdateButtons(false);
    }
  };

  const handleCancel = () => {
    setShowUpdateButtons(false);
    setTimeout(() => {
      setEditingField(null);
      setIsEditing(false);
      // Сбрасываем значения формы (опционально)
      if (userData) {
          setValues({
              name: userData.name,
              email: userData.email,
              password: ''
          });
      }
    }, 250);
  };

  // Фокус на инпуты
  useEffect(() => {
    if (isEditing && editingField !== null) {
      switch (editingField) {
        case 'name': nameInputRef.current?.focus(); break;
        case 'email': emailInputRef.current?.focus(); break;
        case 'password': passwordInputRef.current?.focus(); break;
      }
    }
  }, [isEditing, editingField]);

  // --------------- LOADER ---------------

  if (!userData) {
    return <Loader description="Загрузка профиля..." />;
  }

  return (
    <Transitions>
      <section className={styles.profile_section} data-testid="profile_section">
        <ProfileMenu />

        <div className={styles.profile_content}>
          {location.pathname === '/profile/orders' ? (
            <ProfileOrders />
          ) : (
            <Transitions>
              <form className={styles.profile_form}>
                <div>
                  <Input
                    {...({
                        error: false,
                        errorText: "Ошибка",
                        extraClass: "mb-6",
                        icon: editingField === 'name' ? undefined : 'EditIcon',
                        name: "name",
                        onChange: handleChange,
                        onIconClick: () => handleEditIconClick('name'),
                        placeholder: "Имя",
                        ref: nameInputRef,
                        size: "default",
                        type: "text",
                        value: (editingField === 'name' ? values.name : userData.name) || '',
                        disabled: editingField !== 'name'
                    } as any)}
                  />

                  <Input
                    {...({
                        error: false,
                        errorText: "Ошибка",
                        extraClass: "mb-6",
                        icon: editingField === 'email' ? undefined : 'EditIcon',
                        name: "email",
                        onChange: handleChange,
                        onIconClick: () => handleEditIconClick('email'),
                        placeholder: "Почта",
                        ref: emailInputRef,
                        size: "default",
                        type: "text",
                        value: (editingField === 'email' ? values.email : userData.email) || '',
                        disabled: editingField !== 'email'
                    } as any)}
                  />

                  <Input
                    {...({
                        error: false,
                        errorText: "Ошибка",
                        extraClass: "mb-6",
                        icon: editingField === 'password' ? undefined : 'EditIcon',
                        name: "password",
                        onChange: handleChange,
                        onIconClick: () => handleEditIconClick('password'),
                        placeholder: "Пароль",
                        ref: passwordInputRef,
                        size: "default",
                        type: "password",
                        value: values.password || '',
                        disabled: editingField !== 'password'
                    } as any)}
                  />

                  {isEditing && (
                    <div className={`${styles.profile_update_button} ${showUpdateButtons ? styles.fadeIn : styles.fadeOut}`}>
                      <Button htmlType="button" onClick={handleSave} size="medium" type="primary">
                        Сохранить
                      </Button>
                      <Button htmlType="button" onClick={handleCancel} size="medium" type="secondary">
                        Отмена
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </Transitions>
          )}
        </div>
      </section>
    </Transitions>
  );
}
