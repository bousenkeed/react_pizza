import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createRef } from 'react';
import { useEffect } from 'react';

import ActionButton from '../UI/ActionButton/ActionButton';
import {
    fetchCart,
    selectCart,
    addItem,
    removeItem,
    removeIdenticalItems,
} from '../../redux/slices/cartSlice';

import styles from './CartList.module.scss';


function CartList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);

    const goToPizzaDetails = (id) => {
        navigate(`/pizza/${id}`);
    };

    const handleAddPizza = (item) => {
        dispatch(addItem({ ...item }));
    };

    const handleRemovePizza = (item) => {
        dispatch(removeItem(item));
    };

    const handleRemoveIdenticalItems = (item) => {
        dispatch(removeIdenticalItems(item));
    };

    return (
        <div className={styles.cartList}>
            <TransitionGroup>
                {cart.map((item) => {
                    const itemRef = createRef();
                    return (
                        <CSSTransition
                            key={item.id}
                            nodeRef={itemRef}
                            timeout={400}
                            classNames={{
                                exit: styles.fadeExit,
                                exitActive: styles.fadeExitActive,
                            }}
                        >
                            <div className={styles.cartList__item} ref={itemRef}>
                                <div className={styles.cartList__container}>
                                    <div
                                        className={styles.cartList__img}
                                        onClick={() => goToPizzaDetails(item.pizzaId)}
                                    >
                                        <img src={item.imageUrl} alt={item.title} />
                                    </div>
                                    <div className={styles.cartList__info}>
                                        <b onClick={() => goToPizzaDetails(item.pizzaId)}>
                                            {item.title}
                                        </b>
                                        <span>
                                            {item.type}, {item.size} см.
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.cartList__container}>
                                    <div className={styles.cartList__actionButtons}>
                                        <ActionButton
                                            variant="plus"
                                            onClick={() => handleAddPizza(item)}
                                        />
                                        <span>{item.count}</span>
                                        <ActionButton
                                            variant="minus"
                                            onClick={() => handleRemovePizza(item)}
                                        />
                                    </div>
                                    <span className={styles.cartList__price}>
                                        {item.price * item.count} ₽
                                    </span>
                                    <ActionButton
                                        variant="remove"
                                        onClick={() =>
                                            handleRemoveIdenticalItems(item)
                                        }
                                    />
                                </div>
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
}

export default CartList;