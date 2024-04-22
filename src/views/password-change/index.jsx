import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal } from '../../components';

const PasswordChange = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navigate = useNavigate()

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
      navigate('/')
    }, time)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.password !== formData.repassword) {
        activeModal('Las contraseñas no coinciden.', 2000)
        return;
      }
      const res = await apiService.postPut('PUT', 'user/updatepassword', { user_id: location.state.user_id, password: formData.password })
      if (res.status == 202) {
        activeModal('Contraseña actualizada con éxito.', 1500)
      } else {
        activeModal('Ocurrió un error, intente más tarde.', 2500)
      }
    } catch (error) {
      activeModal('Ocurrió un error, intente más tarde.', 2500)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }


  return (
    <div className="py-4 md:py-6">
      <div className="flex flex-col text-center items-center">
        <h2>Cambio de contraseña</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-2/3">

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

          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Escriba su nueva contraseña."
          />

          <input
            className="bg-blue-100 text-xs rounded p-2"
            type="password"
            name="repassword"
            value={formData.repassword}
            onChange={handleChange}
            required
            placeholder="Repita su contraseña."
          />

          <input type="submit" value="Cambiar" className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
        </form>
      </div>
    </div>
  )


}

export { PasswordChange }