import { useEffect } from 'react';

export function useClickOutside(callback, ...refs) {
    useEffect(() => {
        const allRefs = refs.flat();

        const handleClickOutside = (event) => {
            const isClickOutside = allRefs.every(
                (ref) => ref.current && !ref.current.contains(event.target)
            );

            if (isClickOutside) {
                callback(event);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback, refs]);
}


