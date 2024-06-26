import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormRegister, FormUpdate } from '../../components';

const UserUpdate = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({});
  const [formDetail, setFormDetail] = useState([]);
  const location = useLocation();
  const navegate = useNavigate()

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  useEffect(() => {
    const getUser = async () => {
      const user_id = location.state.item_id
      const res = await apiService.get(`user/getbyid/${user_id}`)
      if (res.status === 202) {
        const data = await res.json();
        setFormData(data.user)
        const userData = [
          { type: 'text', name: 'username', value: data.user.username, onChange: handleChange, required: true, placeholder: 'Nombre de usuario (requerido)' },
          { type: 'text', name: 'name', value: data.user.name, onChange: handleChange, required: false, placeholder: 'Nombre completo' },
          { type: 'email', name: 'email', value: data.user.email, onChange: handleChange, required: false, placeholder: 'Correo electronico' },
          { type: 'text', name: 'phone', value: data.user.phone, onChange: handleChange, required: true, placeholder: 'Telefono (requerido)' },
          { type: 'text', name: 'address', value: data.user.address, onChange: handleChange, required: false, placeholder: 'Dirección' },
        ]
        if (location.state.role != 'SELER') {
          userData.push({ type: 'text', name: 'role', value: data.user.role, onChange: handleChange, required: true, placeholder: 'Rol (requerido)' })
        }
        setFormDetail(userData)
      } else {
        activeModal('Error al obtener los datos del usuario.', 2500)
      }
    }

    getUser()
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await apiService.postPut('PUT', 'user/update', formData)
      if (res.status === 202) {
        activeModal("Usuario actualizado correctamente.", 1500)
        setTimeout(() => {
          navegate('/users')
        }, 1500)
      } else {
        activeModal("Error al intentar actualizar al usuario.", 2500)
      }
    } catch (error) {
      activeModal("Error al intentar actualizar al usuario.", 2500)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }


  return (
    <div className="py-4 md:py-6">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-500">Actualiza los datos</h2>

        {showModal && (
          <Modal
            text={modalText}
            width="300px"
            height="150px"
            color="blue"
            textColor="white"
            margin="0"
          />
        )}

        <FormUpdate
          formDetails={formDetail}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          buttonText="Actualizar"
          type="user"
          item_id={formData._id}
        />

      </div>
    </div>
  )
}

export { UserUpdate }