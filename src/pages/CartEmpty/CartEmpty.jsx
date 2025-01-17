import { useEffect } from 'react';

import Button from '../../components/UI/Button/Button';
import usePageNavigation from '../../hooks/usePageNavigation';

import styles from './CartEmpty.module.scss';

function CartEmpty({ isModalOpen, setIsModalOpen }) {
    const { returnToPreviousPage, goToHomePage } = usePageNavigation();

    useEffect(() => {
        if (isModalOpen) {
            window.scroll(0, 0);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        goToHomePage()
    }

    return (
        <section className={styles.CartEmpty}>
            <h1>Корзина пуста</h1>
            <p>
                Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
                пиццу, перейди на главную страницу.
            </p>
            <img src="images/cart-empty.png" alt="empty cart" />
            <Button
                variant="return"
                onClick={returnToPreviousPage}
                className={styles.button}
            >
                Вернуться назад
            </Button>

            {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal__content}>
                        <p>Спасибо за покупку, ожидайте курьера! 😉</p>
                        <Button onClick={handleCloseModal}>
                            Вернуться на главную
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default CartEmpty;
