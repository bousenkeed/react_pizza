import styles from './Button.module.scss';

function Button({
    children,
    type = 'button',
    className,
    variant = 'primary', // 'primary', 'return'
    onClick,
}) {
    const buttonClass = `${styles.button} ${styles[variant]} ${className}`;

    return (
        <button className={buttonClass} onClick={onClick} type={type}>
            {variant === 'return' && (
                <svg
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7 13L1 6.93015L6.86175 1"
                        stroke="#D3D3D3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
            {children}
        </button>
    );
}

export default Button;
