import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiService } from '../../services/apiService';
import { Modal, Table } from '../../components';
import { setItems, setItemsFilter } from '../../store/itemsSlice';

// Borrar
import { Navigate } from 'react-router-dom';

const Items = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const items = useSelector(state => state.items.items)
  const filteredItems = useSelector(state => state.items.filteredItems)
  const dispatch = useDispatch();

  // Borrar
  const user = useSelector(state => state.user.user)
  if (!user) {
    return <Navigate to="/login" />
  }

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  useEffect(() => {
    const maxAttempts = 3
    let attempts = 0

    const getItems = async () => {
      const res = await apiService.get('item/getall')
      if (res.status === 202) {
        const data = await res.json()
        const items = data.items.map(({ profit_margin, supliers_id, created_at, updated_at, ...rest }) => rest)
        dispatch(setItems(items))
      } else {
        activeModal('No se han podido cargar los articulos.')
      }
    }

    const attemptFetch = () => {
      if (items.length === 0 && attempts < maxAttempts) {
        attempts++
        getItems()
      }
      if (attempts >= maxAttempts) {
        clearInterval(interval)
      }
    }

    if (items.length === 0) {
      getItems()
      const interval = setInterval(attemptFetch, 10000)
      return () => clearInterval(interval)
    }

  }, [filteredItems, items])

  return (
    <div className="py-4 md:py-6 bg-gray-100">
      <div className="flex flex-col text-center items-center">

        <h2 className="text-2xl font-bold text-gray-700">Productos</h2>
        <div className="flex flex-col gap-4 mt-4 w-full px-4">

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

          <Table
            headers={{
              name: ['Descripción', 'P. de venta', 'P. de compra', 'Stock'],
              keys: ['description', 'sale_price', 'purchase_price', 'stock'],
              filter: ['text', 'number', 'number', 'number'],
            }}
            items={filteredItems}
            setItems={setItemsFilter}
            type="items"
            addButton={true}
            dropdownFilterOffset='-50px'
          />

        </div>
      </div>

    </div>
  )

}

export { Items }