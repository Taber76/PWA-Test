import { useState, useEffect } from 'react';
import { Modal } from '../modal';
import { apiService } from '../../services/apiService';

const Filter = ({
  name,             // The name on placeholder
  getRoute,         // The route to get the data
  jsonData,         // The json data field from the response
  searchField,      // The field to search into jsonData
  liveFilter,       // If the filter is the active one
  preLoadedOptions, // The preloaded options without api
  setFilter,        // The function to set the selected filter value
  allInfo           // Return all info from the document
}) => {
  const [modal, setModal] = useState({ show: false, text: '' });
  const [optionsList, setOptionsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeModal = (text, time) => {
    setModal({ show: true, text });
    setTimeout(() => {
      setModal({ show: false, text: '' });
    }, time)
  }

  useEffect(() => {
    if (preLoadedOptions) {
      setOptionsList(preLoadedOptions);
      setSearchTerm(name);
    }
  }, [])

  const loadOptions = async () => {
    try {
      if (!preLoadedOptions && optionsList.length === 0) {
        const res = await apiService.get(getRoute);
        if (res.status === 202) {
          const data = await res.json();
          setOptionsList(data[jsonData]);
        } else {
          activeModal(`Error al cargar la lista de ${name}.`, 2500);
        }
      }
    } catch (error) {
      activeModal(`Error al cargar la lista de ${name}.`, 2500);
    }
  };

  const handleOptionFocus = () => {
    if (liveFilter) {
      loadOptions();
    }
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      if (allInfo) {
        setFilter({});
      } else {
        setFilter('');
      }
    }
  };

  const handleOptionSelect = option => {
    setSearchTerm(option);
    setIsDropdownOpen(false);
    if (allInfo) {
      const optionInfo = optionsList.filter(item => item[searchField] === option);
      setFilter(optionInfo[0]);
    } else {
      setFilter(option);
    }
  };

  return (
    <div>
      {modal.show && (
        <Modal
          text={modal.text}
          width="300px"
          height="150px"
          color="blue"
          textColor="white"
          margin="0"
        />
      )}

      <input
        type="text"
        placeholder={name}
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => {
          handleOptionFocus();
          setIsDropdownOpen(true);
        }}
        className="block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 font-semibold"
      />
      {isDropdownOpen && searchTerm && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1">
          {optionsList.filter(option =>
            preLoadedOptions ? true : option[searchField].toLowerCase().includes(searchTerm.toLowerCase())
          ).map(option => (
            <li
              key={option._id}
              className="px-2 py-1 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionSelect(option[searchField])}
            >
              {option[searchField]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Filter };
