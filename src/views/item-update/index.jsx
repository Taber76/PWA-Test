import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormRegister } from '../../components';

const ItemUpdate = () => {
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
    const getData = async () => {
      const res = await apiService.get(`item/getbyid/${location.state.item_id}`)
      if (res.status === 202) {
        const data = await res.json();
        setFormData(data.item)
      } else {
        activeModal('Error al obtener los datos del producto.', 2500)
      }
    }
    getData()
  }, [])


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await apiService.postPut('PUT', 'item/update', formData)
      if (res.status === 202) {
        activeModal("Productoactualizado correctamente.", 1500)
        setTimeout(() => {
          navegate('/contacts')
        }, 1500)
      } else {
        activeModal("Error al intentar actualizar el producto.", 2500)
      }
    } catch (error) {
      activeModal("Error al intentar actualizar el producto.", 2500)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const formDetail = [
    { type: 'text', name: 'description', value: formData.description, onChange: handleChange, required: true, placeholder: 'Descripcion del item (requerido).' },
    { type: 'text', name: 'purchase_price', value: formData.purchase_price, onChange: handleChange, required: false, placeholder: 'Precio de compra.' },
    { type: 'email', name: 'sale_price', value: formData.sale_price, onChange: handleChange, required: false, placeholder: 'Precio de venta.' },
    { type: 'text', name: 'stock', value: formData.stock, onChange: handleChange, required: false, placeholder: 'Stock.' },
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

export { ItemUpdate }