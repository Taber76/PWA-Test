import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setItemsFilter } from '../../store/itemsSlice';
import { FaSearch } from 'react-icons/fa';

const FilterText = ({ filterName, items, dropdownOffset }) => {
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Set initial filter options
    const initialOptions = items.map(item => item[filterName]);
    setFilterOptions([...new Set(initialOptions)]);
  }, [items, filterName]);

  useEffect(() => {
    // Filter options based on search term
    const filteredOptions = items
      .map(item => item[filterName])
      .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((value, index, self) => self.indexOf(value) === index);
    setFilterOptions(filteredOptions);
  }, [searchTerm, items, filterName]);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelect = (value) => {
    if (value === 'all') {
      dispatch(setItemsFilter({ type: filterName, value: '' }));
    } else {
      dispatch(setItemsFilter({ type: filterName, value }));
    }
    setSearchTerm('');
    setDropdownVisible(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setDropdownVisible(true);
    if (e.target.value === '') {
      dispatch(setItemsFilter({ type: filterName, value: '' }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(setItemsFilter({ type: filterName, value: searchTerm }));
      setSearchTerm(e.target.value);
      setDropdownVisible(false);
    }
  };

  return (
    <div className="relative bg-blue-500 flex items-center justify-center p-4">
      <FaSearch
        className="text-gray-700 cursor-pointer rounded-full"
        onClick={toggleDropdown}
      />

      {isDropdownVisible && (
        <div
          id="dropdown"
          className="absolute top-full z-10 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 mt-2"
          style={{
            maxHeight: '400px',
            overflowY: 'auto',
            left: dropdownOffset
          }}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="font-bold text-gray-700 bg-blue-100 border border-gray-300 rounded-lg text-sm px-4 py-2.5 text-center w-full"
          />

          <ul className="space-y-2 text-sm mt-2" aria-labelledby="dropdownDefault">
            <li className="cursor-pointer" onClick={() => handleSelect('all')}>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                Limpiar filtro
              </span>
            </li>
            {filterOptions.map((option, index) => (
              <li key={index} className="cursor-pointer text-left" onClick={() => handleSelect(option)}>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {option}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { FilterText };
