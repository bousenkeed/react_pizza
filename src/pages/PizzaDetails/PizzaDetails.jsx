import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import usePageNavigation from '../../hooks/usePageNavigation';
import Button from '../../components/UI/Button/Button';
import RadioGroup from '../../components/UI/RadioGroup/RadioGroup';

import styles from './PizzaDetails.module.scss';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';

const PizzaDetails = () => {
    const id = Number(useParams().id);

    const dispatch = useDispatch();

    const { returnToPreviousPage } = usePageNavigation();

    const [pizza, setPizza] = useState(null);
    const [activeType, setActiveType] = useState(null);
    const [activeSize, setActiveSize] = useState(null);
    const [activePrice, setActivePrice] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data: pizza } = await axios.get(
                    `http://localhost:3004/items/${id}`
                );
                setPizza(pizza);
                setActiveType(pizza.types[0]);
                setActiveSize(pizza.sizes[0]);
                setActivePrice(pizza.prices[0]);

            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchItems();
    }, [id]);

    if (!pizza) {
        return <p>Пицца не найдена!</p>;
    }

    const {
        imageUrl,
        title,
        description,
        ingredients,
        types,
        sizes,
        prices,
        category,
        rating,
    } = pizza;

    const handleAddToCart = () => {
        const item = {
            id,
            imageUrl,
            title,
            type: activeType,
            size: activeSize,
            price: activePrice,
        };
        dispatch(addItem(item));
    };

    return (
        <section className={styles.pizzaDetails}>
            <div className={styles.pizzaDetails__image}>
                <img src={imageUrl} alt={title} />
            </div>
            <div className={styles.pizzaDetails__body}>
                <h1>{title}</h1>
                <p className={styles.pizzaDetails__description}>{description}</p>
                <div className={styles.pizzaDetails__info}>
                    <p>
                        <strong>Категория:</strong> {category}
                    </p>
                    <p>
                        <strong>Состав:</strong> {ingredients.join(', ')}
                    </p>
                    <p>
                        <strong>Рейтинг:</strong>
                        <span className={styles.pizzaDetails__rating}>
                            {rating} / 10
                            <span className={styles.pizzaDetails__stars}>
                                {'★'.repeat(Math.round(rating))}
                                {'☆'.repeat(Math.round(10 - rating))}
                            </span>
                        </span>
                    </p>
                </div>
                <RadioGroup
                    activeType={activeType}
                    setActiveType={setActiveType}
                    activeSize={activeSize}
                    setActiveSize={setActiveSize}
                    activePrice={activePrice}
                    setActivePrice={setActivePrice}
                    sizes={sizes}
                    types={types}
                    prices={prices}
                />
                <div className={styles.pizzaDetails__price}>
                    <span>
                        Цена: <b>{activePrice} ₽</b>
                    </span>
                </div>
                <div className={styles.pizzaDetails__actions}>
                    <Button
                        variant="return"
                        className={styles.button}
                        onClick={returnToPreviousPage}
                    >
                        Вернуться назад
                    </Button>
                    <Button className={styles.button} onClick={handleAddToCart}>
                        Добавить в корзину
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default PizzaDetails;
