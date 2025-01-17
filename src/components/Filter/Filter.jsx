import { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectFilters } from '../../redux/slices/filterSlice';

import Categories from '../UI/Categories/Categories';
import Sort from '../UI/Sort/Sort';

import styles from './Filter.module.scss';

function Filter() {
    const { activeCategory, selectedSort } = useSelector(selectFilters);

    return (
        <section className={styles.filter}>
            <Categories activeCategory={activeCategory} />
            <div className={styles.sortContainer}>
                <Sort selectedSort={selectedSort} />
            </div>
        </section>
    );
}

export default memo(Filter);
