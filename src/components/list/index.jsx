import { useState } from 'react';
import { ListItem } from "../list-item";

const List = ({ items, columnWidths, handleDelete, type }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalPages = Math.ceil(items.length / itemsPerPage);

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
    <div className="flex flex-col gap-4">
      {currentItems.map((item) => (
        <ListItem
          key={item._id}
          item={item}
          columnWidths={columnWidths}
          handleDelete={handleDelete}
          type={type}
        />
      ))}

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="p-2 bg-gray-300 rounded"
        >
          Anterior
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-300 rounded"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export { List };
