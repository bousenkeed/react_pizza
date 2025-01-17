import styles from './RadioGroup.module.scss';

function RadioGroup({
    activeType,
    setActiveType,
    activeSize,
    setActiveSize,
    sizes,
    types,
    className,
    prices,
    setActivePrice,
}) {
    const handleButtonClick = (size, index) => {
        setActiveSize(size)
        setActivePrice(prices[index]);
    };
    const typeOptions = ['тонкое', 'традиционное'];
    const sizeOptions = [26, 30, 40];
    return (
        <div className={`${styles.radioGroup} ${className}`}>
            <div>
                {typeOptions.map((type) => {
                    const isAbailableType = types.includes(type);

                    return (
                        <button
                            key={type}
                            className={activeType === type ? styles.active : ''}
                            onClick={() => setActiveType(type)}
                            type="button"
                            disabled={!isAbailableType}
                        >
                            {type}
                        </button>
                    );
                })}
            </div>

            <div>
                {sizeOptions.map((size, index) => {
                    const isAvailableSize = sizes.includes(size);
                    return (
                        <button
                            key={size}
                            className={activeSize === size ? styles.active : ''}
                            onClick={() => handleButtonClick(size, index)}
                            type="button"
                            disabled={!isAvailableSize}
                        >
                            {size} см.
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default RadioGroup;
