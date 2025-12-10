import styles from './ModalStyles.module.scss';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { useSelector } from 'hooks/reduxHooks.ts';
import React, { useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({
  onClose,
  children,
}: {
  readonly onClose: () => void;
  readonly children: React.ReactNode;
}) {
  // --------------- ERROR CHECK ---------------

  const hasError = useSelector((state) => state.orderSlice.error);

  // --------------- CLOSING LOGIC ---------------

  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => {
      if (onClose) {
        e.key === 'Escape' ? onClose() : null;
      }
    };
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);

  // --------------- MARKUP ---------------

  return (
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 2.5 } }}
        initial={{ opacity: 0 }}
        key="modal"
      >
        <div
          className={`${styles.modal_overlay}  ${hasError && styles.modal_error}`}
          data-testid="modal_overlay"
          onClick={onClose}
        />

        <div className={`${styles.modal}`}>
          <div className={styles.modal_btn}>
            {!hasError && <CloseIcon onClick={onClose} type="primary" />}
          </div>

          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
