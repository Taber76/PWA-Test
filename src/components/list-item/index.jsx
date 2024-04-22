import { FaEdit, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { ModalInteractive } from '../modal-interactive';

const ListItem = ({ item, columnWidths, handleDelete,
  type // for delete with apiService and navigate to update (user, contact, ex.)
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const keys = Object.keys(columnWidths);
  const navigate = useNavigate();

  const handleTrash = () => {
    setShowModal(true);
    setModalText('¿Seguro que quieres borrar este registro?');
  }

  const handleComfirmDelete = async () => {
    try {
      const res = await apiService.delete(`${type}/delete/${item._id}`);
      if (res.status === 202) {
        setShowModal(false);
        handleDelete();
      } else {
        setShowModal(false)
      }
    } catch (error) {
      setShowModal(false);
    }
  }

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex flex-col sm:flex-row bg-white rounded-md shadow-md p-4 w-full">

        {keys.map((key) => (
          <div key={key} className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths[key]}` }}>
            <p className="text-gray-600 text-xs">{item[key]}</p>
          </div>
        ))}

        <div className={`flex items-center justify-end mb-2 sm:mb-0`} style={{ minWidth: `10%` }}>
          <FaEdit
            className="text-green-500 mr-2 cursor-pointer"
            title="Editar"
            onClick={() => navigate(`/${type}s/update`, { state: { item_id: item._id } })}
          />
          <FaTrash
            className="text-red-500 cursor-pointer"
            title="Borrar"
            onClick={handleTrash}
          />
        </div>

        {showModal && (
          <ModalInteractive
            text={modalText}
            width="350px"
            height="150px"
            color="rgba(0, 0, 255, 0.8)"
            textColor="white"
            margin="0"
            handleNo={() => setShowModal(false)}
            handleSi={handleComfirmDelete}
          />
        )}

      </div>
    </div>
  );
};

export { ListItem };


