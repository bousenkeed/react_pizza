import { useDispatch } from 'react-redux';
import { memo } from 'react';

import { setCurrentPage } from '../../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

function Pagination({ totalItems, itemsPerPage, className, currentPage }) {
    const dispatch = useDispatch();

    const pagesCount = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber + 1));
        window.scroll(0, 0);
    };

    const onPrevPage = () => {
        dispatch(setCurrentPage(currentPage - 1));
        window.scroll(0, 0);
    };

    const onNextPage = () => {
        dispatch(setCurrentPage(currentPage + 1));
        window.scroll(0, 0);
    };

    if (pagesCount <= 1) {
        return null;
    }

    return (
        <div className={`${className} ${styles.pagination}`}>
            <div className={styles.pagination__buttons}>
                {currentPage - 1 > 0 && (
                    <button className={styles.previousButton} onClick={onPrevPage}>
                        ←
                    </button>
                )}
                {Array.from({ length: pagesCount }).map((_, index) => (
                    <button
                        className={currentPage - 1 === index ? styles.active : ''}
                        key={index}
                        onClick={() => handlePageChange(index)}
                    >
                        {index + 1}
                    </button>
                ))}
                {currentPage - 1 < pagesCount - 1 && (
                    <button className={styles.nextButton} onClick={onNextPage}>
                        →
                    </button>
                )}
            </div>
        </div>
    );
}

export default memo(Pagination);
