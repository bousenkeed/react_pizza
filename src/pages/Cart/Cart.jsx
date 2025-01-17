import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import usePageNavigation from '../../hooks/usePageNavigation';
import CartList from '../../components/CartList/CartList';
import Button from '../../components/UI/Button/Button';
import {
    selectCartTotalPrice,
    removeItems,
    selectCartTotalItems,
} from '../../redux/slices/cartSlice';
import CartEmpty from '../CartEmpty/CartEmpty';

import styles from './Cart.module.scss';

function Cart() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const totalPrice = useSelector(selectCartTotalPrice);
    const totalItems = useSelector(selectCartTotalItems);

    const dispatch = useDispatch();

    const { returnToPreviousPage } = usePageNavigation();

    const handleRemoveCart = () => {
        dispatch(removeItems());
    };

    const handleOrderPizzas = () => {
        dispatch(removeItems());
        setIsModalOpen(true);
    };

    if (totalItems === 0) {
        return <CartEmpty isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />;
    }

    return (
        <div className={styles.wrapper}>
            <section className={styles.cart}>
                <div className={styles.cart__header}>
                    <div className={styles.cart__title}>
                        <img src="images/cart/cart.svg" alt="cart" />
                        <h1>Корзина</h1>
                    </div>
                    <button className={styles.cart__bucket} onClick={handleRemoveCart}>
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.5 5H4.16667H17.5"
                                stroke="#B6B6B6"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                                stroke="#B6B6B6"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.33337 9.16667V14.1667"
                                stroke="#B6B6B6"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M11.6666 9.16667V14.1667"
                                stroke="#B6B6B6"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>Очистить корзину</span>
                    </button>
                </div>
                <CartList />
                <div className={styles.cart__sum}>
                    <span>
                        Всего пицц: <b>{totalItems} шт.</b>
                    </span>
                    <span>
                        Сумма заказа: <b className={styles.aсcent}>{totalPrice} ₽</b>{' '}
                    </span>
                </div>
                <div className={styles.cart__actions}>
                    <Button
                        className={styles.button}
                        variant="return"
                        onClick={returnToPreviousPage}
                    >
                        Вернуться назад
                    </Button>
                    <Button
                        type="submit"
                        className={styles.button}
                        onClick={handleOrderPizzas}
                    >
                        Оплатить сейчас
                    </Button>
                </div>
            </section>
        </div>
    );
}

export default Cart;
