import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, List } from '../../components';

const Contacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [contactList, setContactList] = useState([])
  const [deleteContact, setDeleteContact] = useState(false)
  const navigate = useNavigate()

  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  const columnWidths = {
    name: '32%',
    email: '38%',
    phone: '20%',
  }

  useEffect(() => {
    const getContacts = async () => {
      const res = await apiService.get('contact/getall')
      if (res.status === 202) {
        const data = await res.json()
        const contacts = data.contacts.map(({ rut, address, products, avatar, created_at, updated_at, active, ...rest }) => rest)
        setContactList(contacts)
      } else {
        activeModal('No se han podido cargar los contactos.', 2500)
      }
    }
    getContacts()
  }, [deleteContact])

  return (
    <div className="py-4 md:py-6 bg-gray-100">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-700">Contactos</h2>
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

          <div className="hidden sm:block  flex items-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row bg-blue-500 rounded-md shadow-md p-4 w-full">

              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.name}` }}>
                <h3 className="text-md text-white font-semibold">Nombre</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.email}` }}>
                <h3 className="text-md text-white font-semibold">Email</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.phone}` }}>
                <h3 className="text-md text-white font-semibold">Teléfono</h3>
              </div>
              <div className={`flex items-center justify-end mb-2 sm:mb-0`} style={{ minWidth: `10%` }}>
                <FaPlus
                  className="text-green-500 mr-2 cursor-pointer"
                  title="Nuevo"
                  onClick={() => navigate('/contacts/register')}
                />
              </div>

            </div>
          </div>

          {contactList && (
            <List
              items={contactList}
              columnWidths={columnWidths}
              handleDelete={() => setDeleteContact(prevDeleteContact => !prevDeleteContact)}
              type="contact"
            />)}

        </div>
      </div>
    </div>
  )

}

export { Contacts }