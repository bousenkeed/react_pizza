import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styles from './SearchInput.module.scss';
import { resetVisibleCount } from '../../../redux/slices/searchSlice';

function SearchInput() {
    const [inputeValue, setInputValue] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        if (inputeValue.length <= 0) {
            return;
        }
        dispatch(resetVisibleCount());
        navigate(`search/${inputeValue}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    useEffect(() => {
        setInputValue('');
    }, [location]);

    return (
        <div className={styles.search}>
            <input
                className={styles.search__input}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Найти пиццу..."
                value={inputeValue}
            />
            <button
                type="submit"
                className={styles.search__submit}
                onClick={handleSearch}
            >
                <svg
                    width="32px"
                    height="32px"
                    id="Glyph"
                    version="1.1"
                    viewBox="0 0 32 32"
                >
                    <path
                        d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
                        id="XMLID_223_"
                    />
                </svg>
            </button>
        </div>
    );
}

export default SearchInput;
