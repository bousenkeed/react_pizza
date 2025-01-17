import { useState, useRef } from 'react';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { CSSTransition } from 'react-transition-group';
import { memo } from 'react';

import { setSelectedSort, setCurrentPage } from '../../../redux/slices/filterSlice';
import { useDispatch } from 'react-redux';

import styles from './Sort.module.scss';

export const sortOptionsList = [
    { name: 'популярные 🏆', sort: 'rating', order: 'desc' },
    { name: 'дорогие', sort: 'prices', order: 'desc' },
    { name: 'не дорогие', sort: 'prices', order: 'asc' },
    { name: 'по алфавиту', sort: 'title', order: 'asc' },
];

function Sort({ selectedSort }) {
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const menuRef = useRef();
    const buttonRef = useRef();

    useClickOutside(() => {
        setIsOpen(false);
    }, [menuRef, buttonRef]);

    const selectSortOption = (sortOption) => {
        dispatch(setCurrentPage(1));
        dispatch(setSelectedSort(sortOption));
        setIsOpen(false);
    };

    return (
        <div className={styles.sort}>
            <button
                ref={buttonRef}
                className={styles.sort__label}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <img
                    className={isOpen ? styles.arrowActive : ''}
                    src="/images/filter-arrow.svg"
                    alt="arrow icon"
                />
                <b>Сортировка:</b>
                <span>{selectedSort.name}</span>
            </button>

            <CSSTransition
                in={isOpen}
                timeout={300}
                classNames={{
                    enter: styles.fadeEnter,
                    enterActive: styles.fadeEnterActive,
                    exit: styles.fadeExit,
                    exitActive: styles.fadeExitActive,
                }}
                unmountOnExit
                nodeRef={menuRef}
            >
                <ul ref={menuRef} className={styles.dropdownMenu}>
                    {sortOptionsList.map((option) => {
                        return (
                            <li key={option.name}>
                                <button
                                    className={`${styles.dropdownMenu__item} ${
                                        selectedSort.sort === option.sort &&
                                        selectedSort.order === option.order
                                            ? styles.selected
                                            : ''
                                    }`}
                                    onClick={() => selectSortOption(option)}
                                >
                                    {option.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </CSSTransition>
        </div>
    );
}

export default memo(Sort);
