// Update form for users, contacts and items
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

import { apiService } from '../../services/apiService';
import { ModalInteractive } from '../modal-interactive';

const FormUpdate = ({ formDetails, handleChange, onSubmit, buttonText, type, item_id }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const navigate = useNavigate()

  const handleTrash = () => {
    setShowModal(true);
    setModalText('¿Seguro que quieres borrar este registro?');
  }

  const handleComfirmDelete = async () => {
    try {
      const res = await apiService.delete(`${type}/delete/${item_id}`);
      if (res.status === 202) {
        setShowModal(false);
        navigate(`/${type}s`)
      } else {
        setShowModal(false)
      }
    } catch (error) {
      setShowModal(false);
    }
  }



  return (
    <>
      <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-1 w-2/3">
        {formDetails.map((input) => (
          <div>
            <div className="text-sm text-gray-500 mt-2 text-left">
              {input.placeholder}
            </div>
            <div className="mb-2 block">
              <Label htmlFor={input.name} value={input.label} />
            </div>
            <TextInput
              id={input.name}
              type={input.type}
              placeholder={input.placeholder}
              required={input.required}
              name={input.name}
              value={input.value}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="flex justify-evenly mt-4">
          <Button type="submit" className="w-1/4">{buttonText}</Button>
          <Button onClick={() => navigate(-1)} className="w-1/4">Cancelar</Button>
          <Button color="failure" onClick={handleTrash} className="w-1/4">Borrar</Button>
        </div>
      </form>

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

    </>
  )
};

export { FormUpdate }