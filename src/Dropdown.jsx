import { useState, useRef } from 'react';
import './Dropdown.css';
import { useOutsideClick, useFilter } from './useDropdownHooks';

function Dropdown() {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const inputRef = useRef(null); 
    const wrapperRef = useOutsideClick(() => {
        setShowOptions(false);
    });

    const plates = [
        { label: "Шашлык из свинины", value: "non-halal" },
        { label: "Шашлык из курицы", value: "chiken" },
        { label: "Шашлык из баранины", value: "halal" },
        { label: "Шашлык из телятины", value: "veal" }
    ];

    const { filterText, filteredOptions, handleFilterChange } = useFilter(plates);

    const handleChange = (value, label) => {
        if (!selectedValues.find((item) => item.value === value)) {
            setSelectedValues([...selectedValues, { value, label }]);
        }
        setShowOptions(false);
    };

    const handleRemoveItem = (value) => {
        setSelectedValues(selectedValues.filter(item => item.value !== value));
    };

    const handleClearSelection = () => {
        setSelectedValues([]);
    };

    return (
        <div ref={wrapperRef} className="dropdown-wrapper">
            <input
                ref={inputRef} 
                type="text"
                placeholder="Начните вводить блюдо"
                value={filterText}
                onChange={handleFilterChange}
                onFocus={() => setShowOptions(true)}
                className="dropdown-input"
            />
            {showOptions && filteredOptions.length > 0 && (
                <ul className="dropdown-list">
                    {filteredOptions.map((plates) => (
                        <li key={plates.value} onClick={() => handleChange(plates.value, plates.label)} className="dropdown-item">
                            {plates.label}
                        </li>
                    ))}
                </ul>
            )}
            <div className='selected-items'>
                {selectedValues.map((item, index) => (
                    <div key={index} className="selected-item">
                        {item.label}
                        <button onClick={() => handleRemoveItem(item.value)} className="remove-item">X</button>
                    </div>
                ))}
                {selectedValues.length > 0 && <button onClick={handleClearSelection} className="clear-selection">Очистить всё</button>}
            </div>
        </div>
    );
}

export default Dropdown;
