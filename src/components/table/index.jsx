import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { FilterText } from '../filter-text';

const Table = ({ headers, items, setItems, type, addButton, dropdownFilterOffset = '0' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const navigate = useNavigate();

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">

        <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.name.map((header, index) => (
              <th key={index} scope="col" className={`px-3 py-2 ${index === 0 ? '' : 'text-center'}`}>
                <div className="flex items-center">
                  {header}
                  {headers.filter[index] === 'text' && (
                    <FilterText
                      filterName={headers.keys[index]}
                      items={items}
                      setItems={setItems}
                      dropdownOffset={dropdownFilterOffset}
                    />
                  )}
                </div>
              </th>
            ))}
            {!addButton ? (
              <th scope="col" className="px-3 py-2">
                <span className="sr-only">Edit</span>
              </th>
            ) : (
              <th scope="col" className="px-3 py-2 flex justify-center items-center mt-2 mb-2">
                <Button
                  gradientDuoTone="greenToBlue"
                  onClick={() => navigate(`/${type}/register`)}
                  pill
                  size="sm"
                >
                  <span className="text-gray-100">NUEVO</span>
                </Button>
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {headers.keys.map((key, index) => (
                <td key={index} className={`px-6 py-4 ${index === 0 ? 'font-medium text-gray-900 whitespace-nowrap dark:text-white' : 'text-center'}`}>
                  {item[key]}
                </td>
              ))}
              <td className="px-6 py-4 text-center">
                <a href="#" onClick={() => navigate(`/${type}/update`, { state: { item_id: item._id } })} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination buttons */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex justify-between m-2">

            <Button
              gradientDuoTone="greenToBlue"
              onClick={handlePrevPage}
              pill
              size="sm"
            >
              <span className="text-gray-100">Anterior</span>
            </Button>

            <span className="p-2 flex items-center text-gray-600 font-bold">{currentPage} de {totalPages}</span>

            <Button
              gradientDuoTone="greenToBlue"
              onClick={handleNextPage}
              pill
              size="sm"
            >
              <span className="text-gray-100">Siguiente</span>
            </Button>

          </div>
        </div>
      )}

    </div>
  );
};

export { Table };

