import { useState, useEffect } from 'react';

import { apiService } from '../../services/apiService';
import { Modal, Table } from '../../components';

const Contacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [contactList, setContactList] = useState([])


  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
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
  }, [])

  return (
    <div className="py-4 md:py-6 bg-gray-100">
      <div className="flex flex-col text-center items-center">

        <h2 className="text-2xl font-bold text-gray-700">Contactos</h2>
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
              name: ['Nombre', 'Email', 'Teléfono'],
              keys: ['name', 'email', 'phone']
            }}
            items={contactList}
            type="contacts"
            addButton={true}
          />

        </div>
      </div>
    </div>
  )

}

export { Contacts }