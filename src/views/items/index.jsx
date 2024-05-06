import { useState, useEffect } from 'react';

import { apiService } from '../../services/apiService';
import { Modal, Table } from '../../components';

const Items = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [itemList, setItemList] = useState([])

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  useEffect(() => {
    const getItems = async () => {
      const res = await apiService.get('item/getall')
      if (res.status === 202) {
        const data = await res.json()
        const items = data.items.map(({ profit_margin, supliers_id, created_at, updated_at, ...rest }) => rest)
        setItemList(items)
      } else {
        activeModal('No se han podido cargar los articulos.')
      }
    }

    getItems()
  }, [])

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
              keys: ['description', 'sale_price', 'purchase_price', 'stock']
            }}
            items={itemList}
            type="items"
            addButton={true}
          />

        </div>
      </div>

    </div>
  )

}

export { Items }