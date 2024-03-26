import { useState, useEffect, useRef } from 'react';


//Обрабодчик кликов

export const useOutsideClick = (callback) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);

    return ref;
};

//Фильтрация

export const useFilter = (options) => {
    const [filterText, setFilterText] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);

    useEffect(() => {
        setFilteredOptions(options.filter(option =>
            option.label.toLowerCase().includes(filterText.toLowerCase())
        ));
    }, [filterText, options]);

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    return { filterText, filteredOptions, handleFilterChange };
};
