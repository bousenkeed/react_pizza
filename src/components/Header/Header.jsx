import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchInput from '../UI/SearchInput/SearchInput';
import { selectCartTotalPrice, selectCartTotalItems } from '../../redux/slices/cartSlice';

import styles from './Header.module.scss';

function Header() {
    const totalPrice = useSelector(selectCartTotalPrice);
    const totalItems = useSelector(selectCartTotalItems);

    const navigate = useNavigate();

    const setCategories = () => {
        navigate('/?&page=1&sort=rating&order=desc');
    };
    return (
        <header className={styles.header}>
            <button className={styles.logo} onClick={setCategories}>
                <img src="/images/logo.png" alt="Logo" />
                <div className={styles.logo__text}>
                    <h2>REACT PIZZA</h2>
                    <p>самая вкусная пицца во вселенной</p>
                </div>
            </button>
            <SearchInput />
            <Link className={styles.cartButton} to="cart">
                <span className={styles.cartButton__left}>{totalPrice} ₽</span>
                <div className={styles.cartButton__rigth}>
                    <img src="/images/cart-icon.svg" alt="Cart icon" />
                    <span> {totalItems} </span>
                </div>
            </Link>
        </header>
    );
}

export default Header;
