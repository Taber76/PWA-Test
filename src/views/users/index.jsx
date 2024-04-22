import { FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { apiService } from '../../services/apiService';
import { Modal, List } from '../../components';

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [userList, setUserList] = useState([])
  const [deleteUser, setDeleteUser] = useState(false)
  const navigate = useNavigate()
  const { user } = useSelector(state => state.user)


  const activeModal = (text, time) => {
    setShowModal(true);
    setModalText(text);
    setTimeout(() => {
      setShowModal(false);
    }, time)
  }

  const columnWidths = {
    name: '20%',
    username: '15%',
    email: '30%',
    phone: '15%',
    role: '10%',
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
  }, [deleteUser])

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

          <div className="hidden sm:block flex items-center gap-4 w-full">
            <div className="flex flex-col sm:flex-row bg-blue-500 rounded-md shadow-md p-4 w-full">

              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.name}` }}>
                <h3 className="text-md text-white font-semibold">Nombre</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.username}` }}>
                <h3 className="text-md text-white font-semibold">Usuario</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.email}` }}>
                <h3 className="text-md text-white font-semibold">Email</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.phone}` }}>
                <h3 className="text-md text-white font-semibold">Teléfono</h3>
              </div>
              <div className={`mb-2 sm:mb-0`} style={{ minWidth: `${columnWidths.role}` }}>
                <h3 className="text-md text-white font-semibold">Rol</h3>
              </div>
              <div className={`flex items-center justify-end mb-2 sm:mb-0`} style={{ minWidth: `10%` }}>
                <FaPlus
                  className="text-green-500 mr-2 cursor-pointer"
                  title="Nuevo"
                  onClick={() => navigate('/users/register')}
                />
              </div>

            </div>
          </div>

          {userList && (
            <List
              items={userList}
              columnWidths={columnWidths}
              handleDelete={() => setDeleteUser(prevDeleteUser => !prevDeleteUser)}
              type="user"
            />)}

        </div>
      </div>
    </div>
  )

}

export { Users }