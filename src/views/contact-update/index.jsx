import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormRegister } from '../../components';

const ContactUpdate = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({});
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
      const res = await apiService.get(`contact/getbyid/${location.state.item_id}`)
      if (res.status === 202) {
        const data = await res.json();
        setFormData(data.contact)
      } else {
        activeModal('Error al obtener los datos del contacto.', 2500)
      }
    }
    getUser()
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await apiService.postPut('PUT', 'contact/update', formData)
      if (res.status === 202) {
        activeModal("Contacto actualizado correctamente.", 1500)
        setTimeout(() => {
          navegate('/contacts')
        }, 1500)
      } else {
        activeModal("Error al intentar actualizar el contacto.", 2500)
      }
    } catch (error) {
      activeModal("Error al intentar actualizar el contacto.", 2500)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const formDetail = [
    { type: 'text', name: 'name', value: formData.name, onChange: handleChange, required: true, placeholder: 'Nombre completo (requerido)' },
    { type: 'text', name: 'rut', value: formData.rut, onChange: handleChange, required: false, placeholder: 'RUT' },
    { type: 'email', name: 'email', value: formData.email, onChange: handleChange, required: false, placeholder: 'Correo electronico' },
    { type: 'text', name: 'phone', value: formData.phone, onChange: handleChange, required: true, placeholder: 'Telefono (requerido)' },
    { type: 'text', name: 'address', value: formData.address, onChange: handleChange, required: false, placeholder: 'Dirección' },
  ]


  return (
    <div className="py-4 md:py-6">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-700">Actualiza los datos</h2>

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

        <FormRegister
          formDetails={formDetail}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          buttonText="Actualizar"
        />

      </div>
    </div>
  )
}

export { ContactUpdate }