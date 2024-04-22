import { useEffect, useState } from 'react';
import { apiService } from '../../services/apiService';

const InputDropdown = ({
  className, type, placeholder, required, inputValue,
  initValue,        // Preloaded value 
  setValue,         // The function to set the selected filter value
  apiUrl,           // The api url to get the data
  jsonResponse,     // The json data field from the response
  fieldName,        // The field to search into response.jsonResponse
  index,            // The index of the inputDropdown
  listName          // The name of the dropdown list
}) => {

  const [list, setList] = useState([]);
  const [inputValueChild, setInputValueChild] = useState(inputValue);

  // if initValue is recived, set it in the input
  useEffect(() => {
    setInputValueChild(initValue)
  }, [])

  // Set value to show in the input
  /*useEffect(() => {
    if (!initValue) {
      setInputValueChild(inputValue)
    }
  }, [inputValue])
*/

  // When input value is more than 2 characters and list is empty, get data to the list
  const handleChange = async (event) => {
    const { value } = event.target;
    setInputValueChild(value);
    setValue({ selectedElementOfList: { description: value }, index });
    if (value.length > 2 && list.length === 0) {
      const res = await apiService.get(apiUrl + value);
      if (res.status === 202) {
        const data = await res.json();
        setList(data[jsonResponse]);
      }
    } else if (value.length < 3) {
      setList([]);
    }
  }

  // When an item is selected, send it to father and clear list
  const handleSelect = (event) => {
    const selected = event.target.value;
    const selectedElementOfList = list.find(ele => ele[fieldName] === selected);
    if (selectedElementOfList) {
      setValue({ selectedElementOfList, index });
    }
    setList([]);
  }

  return (
    <div className="flex w-full">
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={inputValueChild}
        required={required}
        onChange={handleChange}
        onSelect={handleSelect}
        list={listName}
      />
      <datalist id={listName}>
        {list.map((ele) => (
          <option key={ele[fieldName]} value={ele[fieldName]} />
        ))}
      </datalist>
    </div>
  );
}

export { InputDropdown };
