import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { apiService } from '../../services/apiService';
import { Modal, Table } from '../../components';

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [userList, setUserList] = useState([])
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)


  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }


  useEffect(() => {
    const getUsers = async () => {
      const res = await apiService.get('user/getall')
      if (res.status === 202) {
        const data = await res.json()
        const users = data.users.map(({ clients, avatar, secure_password, created_at, updated_at, active, ...rest }) => rest)
        setUserList(users)
      } else {
        activeModal('No se han podido cargar los usuarios.')
      }
    }
    if (user?.role === 'SELER') {
      navigate('/users/update', { state: { item_id: user._id, role: user.role } })
    } else if (user?.role === 'ADMIN') {
      getUsers()
    }
  }, [])

  return (
    <div className="py-4 md:py-6 bg-gray-100">
      <div className="flex flex-col text-center items-center">
        <h2 className="text-2xl font-bold text-gray-700">Usuarios</h2>
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

          <Table
            headers={{
              name: ['Nombre', 'Usuario', 'Email', 'Teléfono', 'Rol'],
              keys: ['name', 'username', 'email', 'phone', 'role']
            }}
            items={userList}
            type="users"
            addButton={true}
          />

        </div>
      </div>
    </div>
  )

}

export { Users }