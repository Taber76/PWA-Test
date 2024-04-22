import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, List } from '../../components';

const Items = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [itemList, setItemList] = useState([])
  const [deleteItem, setDeleteItem] = useState(false)
  const navigate = useNavigate()

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  const columnWidths = {
    description: '60%',
    purchase_price: '10%',
    sale_price: '10%',
    stock: '10%',
  }

  useEffect(() => {
    const getItems = async () => {
      const res = await apiService.get('item/getall')
      if (res.status === 202) {
        const data = await res.json()
        const items = data.items.map(({ profit_margin, supliers_id, created_at, updated_at, ...rest }) => rest)
        if (window.innerWidth < 640) {
          items.forEach((item) => {
            item.purchase_price = `Precio de compra: $${item.purchase_price}`
            item.sale_price = `Precio de venta: $${item.sale_price}`
            item.stock = `Stock: ${item.stock} unidades`
          })
        }
        setItemList(items)
      } else {
        activeModal('No se han podido cargar los articulos.')
      }
    }

    getItems()
  }, [deleteItem])

  return (
    <div className="py-4 md:py-6 bg-gray-100">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-700">Productos</h2>
        <div className="flex flex-col gap-4 mt-4 w-2/3">

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

          <div className="hidden sm:block flex items-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row bg-blue-500 rounded-md shadow-md p-4 w-full">

              <div className={`mb-2 sm:mb-0 items-center justify-center flex`} style={{ minWidth: `${columnWidths.description}` }}>
                <h3 className="text-md text-white font-semibold">Descripción</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.purchase_price}` }}>
                <h3 className="text-sm text-white font-semibold">Precio de compra</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.sale_price}` }}>
                <h3 className="text-sm text-white font-semibold">Precio de venta</h3>
              </div>
              <div className={`mb-2 sm:mb-0 items-center justify-center flex`} style={{ minWidth: `${columnWidths.stock}` }}>
                <h3 className="text-md text-white font-semibold">Stock</h3>
              </div>
              <div className={`flex items-center justify-end mb-2 sm:mb-0`} style={{ minWidth: `10%` }}>
                <FaPlus
                  className="text-green-500 mr-2 cursor-pointer"
                  title="Nuevo"
                  onClick={() => navigate('/items/register')}
                />
              </div>

            </div>
          </div>

          {itemList && (
            <List
              items={itemList}
              columnWidths={columnWidths}
              handleDelete={() => setDeleteItem(prevDeleteItem => !prevDeleteItem)}
              type="item"
            />)}

        </div>
      </div>
    </div>
  )

}

export { Items }