import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import RadioGroup from '../UI/RadioGroup/RadioGroup';
import { addItem } from '../../redux/slices/cartSlice';

import styles from './PizzaCard.module.scss';

function PizzaCard({ imageUrl, prices, sizes, title, types, id, rating }) {
    const [activeType, setActiveType] = useState(types[0]);
    const [activeSize, setActiveSize] = useState(sizes[0]);
    const [activePrice, setActivePrice] = useState(prices[0]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePizzaClick = (id) => {
        navigate(`/pizza/${id}`);
    };

    const handleAddToCart = () => {
        const item = {
            id,
            imageUrl,
            title,
            type: activeType,
            size: activeSize,
            price: activePrice,
        };
        dispatch(addItem(item))
    };

    return (
        <div className={styles.PizzaCard}>
            <img src={imageUrl} alt={title} onClick={() => handlePizzaClick(id)} />
            <h3 onClick={() => handlePizzaClick(id)}>{title}</h3>
            <form className={styles.form}>
                <RadioGroup
                    activeType={activeType}
                    setActiveType={setActiveType}
                    activeSize={activeSize}
                    setActiveSize={setActiveSize}
                    sizes={sizes}
                    types={types}
                    prices={prices}
                    setActivePrice={setActivePrice}
                />
                <div className={styles.form__price}>
                    <span>{activePrice} ₽</span>
                    <button
                        type="button"
                        onClick={handleAddToCart}
                    >
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" />
                        </svg>
                        Добавить
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PizzaCard;
