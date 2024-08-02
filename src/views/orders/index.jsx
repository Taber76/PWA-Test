import { FaSearch, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { apiService } from '../../services/apiService';
import { helpers } from '../../services/helpers';
import { Filter, Modal, Table } from '../../components';

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [showFilters, setShowFilters] = useState(false)
  const [orderList, setOrderList] = useState([])
  const { user } = useSelector(state => state.user)

  // Filters
  const [client, setClient] = useState('')
  const [seler, setSeler] = useState({})
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const [invoice, setInvoice] = useState('')


  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    const getOrders = async () => {
      let res
      if (user.role === 'ADMIN') {
        res = await apiService.get('order/getall')
      } else {
        res = await apiService.get(`order/getbyfield/user_id/${user._id}`)
      }
      if (res.status === 202) {
        const data = await res.json()
        data.orders.forEach((order) => {
          order.created_at = helpers.formatDate(order.created_at)
          order.status = helpers.statusDictionary[order.status]
        })
        setOrderList(data.orders)
      } else {
        activeModal('No se han podido cargr las ordenes de compra.')
      }
    }
    getOrders()
  }, [])


  const handleSearch = async () => {
    try {
      let filter = {}
      if (client) filter.client_name = client
      if (seler) filter.user_id = seler._id
      if (status) filter.status = helpers.inverseStatusDictionary[status]
      if (date) filter.created_at = date
      if (invoice) filter.invoice_number = invoice
      let res
      if (Object.keys(filter).length === 0) {
        res = await apiService.get('order/getall')
      } else {
        res = await apiService.postPut('POST', 'order/getFiltered', filter)
      }
      if (res.status === 202) {
        const data = await res.json()
        data.orders.forEach((order) => {
          order.created_at = helpers.formatDate(order.created_at)
          order.status = helpers.statusDictionary[order.status]
        })
        setOrderList(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearFilters = () => {

  }

  return (
    <div className="py-4 md:py-6 bg-gray-100">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Ventas</h2>

        {/* Checkbox para mostrar/ocultar los filtros */}
        <div className="flex w-2/3 justify-end">
          <label className="text-sm font-bold text-gray-600">
            Mostrar Filtros
            <input
              type="checkbox"
              checked={showFilters}
              onChange={toggleFilters}
              className="ml-2"
            />
          </label>
        </div>

        {/* Filters */}
        {showFilters &&
          <div className="w-full flex flex-col sm:flex-row gap-4 justify-center items-center">

            <div className="flex items-center">
              <p className="font-semibold text-sm">
                Filtrar por:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">

              <Filter
                name="Clientes"
                getRoute="contact/getall"
                jsonData="contacts"
                searchField="name"
                liveFilter={true}
                setFilter={setClient}
                allInfo={false}
              />

              <Filter
                name="Vendedores"
                getRoute="user/getall"
                searchField="name"
                jsonData="users"
                liveFilter={true}
                setFilter={setSeler}
                allInfo={true}
              />

              <Filter
                name="Estado"
                getRoute=""
                searchField="status"
                liveFilter={true}
                preLoadedOptions={[
                  { status: 'Borrador' },
                  { status: 'Pendiente' },
                  { status: 'Procesado' },
                  { status: 'Finalizado' },
                  { status: 'Cancelado' },
                  { status: 'Facturado' },
                ]}
                setFilter={setStatus}
                allInfo={false}
              />

              <Filter
                name="Fecha"
                getRoute="order/getall"
                searchField="created_at"
                liveFilter={true}
                preLoadedOptions={[
                  { created_at: 'Semana' },
                  { created_at: 'Mes' },
                  { created_at: 'Trimestre' },
                  { created_at: 'Año' },
                  { created_at: 'Todos' },
                ]}
                setFilter={setDate}
                allInfo={false}
              />

              <Filter
                name="Factura"
                getRoute="order/getall"
                searchField="invoice_number"
                liveFilter={false}
                setFilter={setInvoice}
                allInfo={false}
              />

            </div>

            <div className={`flex items-center justify-end mb-2 sm:mb-0`} >
              <FaSearch
                className="text-green-500 mr-2 cursor-pointer"
                title="Buscar"
                onClick={handleSearch}
              />
              <FaTrash
                className="hidden text-red-500 cursor-pointer"
                title="Borrar filtros"
                onClick={handleClearFilters}
              />
            </div>

          </div>}

        {/* Orders list */}

        <div className="flex flex-col gap-4 mt-4 w-4/5">

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
              name: ['Cliente', 'Vendedor', 'Estado', 'Fecha', 'Factura'],
              keys: ['client_name', 'seler_name', 'status', 'created_at', 'invoice_number'],
              filter: ['text', '', 'text', '', 'text'],
            }}
            items={orderList}
            type="orders"
            addButton={true}
          />

        </div>
      </div>
    </div>
  )

}

export { Orders }