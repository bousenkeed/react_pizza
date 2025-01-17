import CardSceleton from '../CardSceleton/CardSceleton';
import PizzaCard from '../PizzaCard/PizzaCard';

import styles from './PizzaList.module.scss';

function PizzaList({ items, status }) {
    return (
        <section className={styles.pizzaList}>
            <div className={styles.pizzaList__container}>
                {status === 'loading' &&
                    [...new Array(8)].map((_, index) => {
                        return <CardSceleton key={index} />;
                    })}
                {status === 'success' &&
                    items.map((pizza) => {
                        return <PizzaCard key={pizza.id} {...pizza} />;
                    })}
            </div>
        </section>
    );
}

export default PizzaList;
