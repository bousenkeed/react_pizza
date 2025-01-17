import { useDispatch } from 'react-redux';
import { memo } from 'react';

import {
    setActiveCategory,
    setCurrentPage,
} from '../../../redux/slices/filterSlice';

import styles from './Categories.module.scss';

function Categories({ activeCategory }) {
    const dispatch = useDispatch();

    const categories = ['Все', 'Мясные', 'Сырные', 'Острые', 'Морепродукты'];

    const selectCategory = (category) => {
        dispatch(setActiveCategory(category));
        dispatch(setCurrentPage(1));
    };

    return (
        <ul className={styles.filters}>
            {categories.map((categoryName, index) => {
                return (
                    <li key={index}>
                        <button
                            className={
                                activeCategory.toLowerCase() ===
                                categoryName.toLowerCase()
                                    ? styles.active
                                    : ''
                            }
                            onClick={() => selectCategory(categoryName.toLowerCase())}
                        >
                            {categoryName}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}

export default memo(Categories);
