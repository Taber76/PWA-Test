import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
//import { setItemsFilter } from '../../store/itemsSlice';
import { FaSearch, FaTimes } from 'react-icons/fa';

const FilterText = ({ filterName, items, setItems, dropdownOffset }) => {
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const initialOptions = items.map(item => item[filterName]);
    setFilterOptions([...new Set(initialOptions)]);
  }, [items, filterName]);

  useEffect(() => {
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
      dispatch(setItems({ type: filterName, value: '' }));
      setSearchTerm('');
    } else {
      dispatch(setItems({ type: filterName, value }));
      setSearchTerm(value);
    }
    setDropdownVisible(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setDropdownVisible(true);
    if (e.target.value === '') {
      dispatch(setItems({ type: filterName, value: '' }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      dispatch(setItems({ type: filterName, value: searchTerm }));
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
          <div className="flex items-center justify-between">
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Buscar..."
              className="font-bold text-gray-700 bg-blue-100 border border-gray-300 rounded-lg text-sm px-4 py-2.5 text-center w-full"
            />
            <FaTimes
              className="text-gray-700 cursor-pointer rounded-full ml-2"
              onClick={() => handleSelect('all')}
            />
          </div>

          <ul className="space-y-2 text-sm mt-2" aria-labelledby="dropdownDefault">
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
