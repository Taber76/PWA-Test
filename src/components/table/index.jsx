import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';

const Table = ({ headers, items, type, addButton }) => {
  const navigate = useNavigate()

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-blue-500 dark:bg-gray-700 dark:text-gray-400">
          <tr className=''>
            {headers.name.map((header, index) => (
              <th key={index} scope="col" className={`px-3 py-2 ${index === 0 ? '' : 'text-center'}`}>
                {header}
              </th>
            ))}
            {!addButton ? (
              <th scope="col" class="px-3 py-2">
                <span class="sr-only">Edit</span>
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
          {items.map((item, index) => (
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
    </div>
  );
}


export { Table };
