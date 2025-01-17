import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import usePageNavigation from '../../hooks/usePageNavigation';
import PizzaList from '../../components/PizzaList/PizzaList';
import Button from '../../components/UI/Button/Button';
import {
    fetchPizzas,
    selectSearch,
    setVisibleCount,
} from '../../redux/slices/searchSlice';

import styles from './Search.module.scss';

function Search() {
    const { items, visibleCount, status } = useSelector(selectSearch);
    const { title } = useParams();
    const { returnToPreviousPage } = usePageNavigation();
    const dispatch = useDispatch();

    const filteredItems = items.filter((item) =>
        item.title.toLowerCase().includes(title.toLowerCase())
    );

    useEffect(() => {
        dispatch(fetchPizzas());
    }, [dispatch]);

    const handleShowMore = () => {
        dispatch(setVisibleCount(visibleCount + 8));
    };

    const isShowMoreVisible = visibleCount < filteredItems.length;

    return (
        <section className={styles.search}>
            <div className={styles.search__top}>
                <div>
                    <h1>Результат поиска</h1>
                    <b>
                        Совпадений: <span>{filteredItems.length}</span>
                    </b>
                </div>
                <Button variant="return" onClick={returnToPreviousPage}>
                    Вернуться назад
                </Button>
            </div>

            {filteredItems.length > 0 && (
                <>
                    <PizzaList
                        items={filteredItems.slice(0, visibleCount)}
                        status={status}
                    />
                    {isShowMoreVisible && (
                        <div className={styles.search__showMore}>
                            <Button
                                variant="primary"
                                onClick={handleShowMore}
                                className={styles.moreButton}
                            >
                                Показать еще
                            </Button>
                        </div>
                    )}
                </>
            )}

            {filteredItems.length <= 0 && (
                <div className={styles.search__noMatches}>
                    <p>
                        К сожалению по запросу &nbsp;<span>"{title}"</span>&nbsp; ничего
                        не найдено... 😫
                    </p>
                </div>
            )}
        </section>
    );
}

export default Search;
