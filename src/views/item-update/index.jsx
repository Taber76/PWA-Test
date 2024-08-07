import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { apiService } from '../../services/apiService';
import { Modal, FormUpdate } from '../../components';
import { updateItem } from '../../store/itemsSlice';

const ItemUpdate = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [formData, setFormData] = useState({});
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch();


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
      const res = await apiService.postPut('PUT', `item/update/${formData._id}`, formData)
      if (res.status === 202) {
        activeModal("Producto actualizado correctamente.", 1500)
        dispatch(updateItem({ id: formData._id, updates: formData }))
        setTimeout(() => {
          navigate('/items')
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
    { type: 'text', name: 'sale_price', value: formData.sale_price, onChange: handleChange, required: false, placeholder: 'Precio de venta.' },
    { type: 'text', name: 'stock', value: formData.stock, onChange: handleChange, required: false, placeholder: 'Stock.' },
  ]


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
          type="item"
          item_id={formData._id}
        />

      </div>
    </div>
  )
}

export { ItemUpdate }