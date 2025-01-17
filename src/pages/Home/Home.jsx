import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';

import { sortOptionsList } from '../../components/UI/Sort/Sort';
import Filter from '../../components/Filter/Filter';
import PizzaList from '../../components/PizzaList/PizzaList';
import Pagination from '../../components/UI/Pagination/Pagination';
import { selectFilters, setFilters } from '../../redux/slices/filterSlice';
import { selectPizzas, fetchPizzas } from '../../redux/slices/pizzaSlice';

import styles from './Home.module.scss';

function Home() {
    const { items, totalItems, status: pizzasStatus } = useSelector(selectPizzas);
    const { activeCategory, selectedSort, currentPage } = useSelector(selectFilters);
    
    const pageLimit = useRef(8);
    const isFirstRender = useRef(false);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const fetchItems = () => {
        const params = {
            _page: currentPage,
            _limit: pageLimit.current,
            _sort: selectedSort.sort,
            _order: selectedSort.order,
        };
        if (activeCategory !== 'все') {
            params.category = activeCategory;
        }
        dispatch(fetchPizzas(params));
    };

    useEffect(() => {
        if (isFirstRender.current) {
            fetchItems();
        }
    }, [activeCategory, selectedSort, currentPage]);

    useEffect(() => {
        if (isFirstRender.current) {
            const params = {
                _page: currentPage,
                _limit: pageLimit.current,
                _sort: selectedSort.sort,
                _order: selectedSort.order,
            };
            if (activeCategory !== 'все') {
                params.category = activeCategory;
            }
            const queryString = qs.stringify(params);
            navigate(`?${queryString}`);
        }
    }, [activeCategory, selectedSort, currentPage]);

    useEffect(() => {
        if (location.search) {
            const params = qs.parse(location.search.replaceAll('_', '').substring(1));
            const selectedSort = sortOptionsList.find(
                (sortOption) =>
                    sortOption.order === params.order && sortOption.sort === params.sort
            );

            dispatch(
                setFilters({
                    ...params,
                    selectedSort,
                    category: params.category || 'все',
                })
            );
        } else {
            fetchItems();
        }

        if (isFirstRender.current === false) {
            isFirstRender.current = true;
        }
    }, [location.search]);

    return (
        <>
            <Filter />
            <h1>Все пиццы</h1>
            {pizzasStatus === 'error' ? (
                <div className={styles.error}>
                    <h2>Произошла ошибка</h2>
                    <p>К сожалению, не удалось запросить пиццы 🥲, попробуйте позже...</p>
                </div>
            ) : (
                <PizzaList items={items} status={pizzasStatus} />
            )}
            {totalItems > 0 && (
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={pageLimit.current}
                    currentPage={currentPage}
                    className={styles.pagination}
                />
            )}
        </>
    );
}

export default Home;
