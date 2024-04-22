import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { setUser } from '../../store/userSlice';
import { Modal, FormRegister } from '../../components';

const UserRegister = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
			navigate('/users')
		}, time)
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.postPut('POST', 'user/register', formData)
			if (res.status === 201) {
				activeModal("Usuario registrado correctamente.", 1500)
				const data = await res.json()
				if (!user.user) {
					localStorage.setItem('token', data.token);
					dispatch(setUser(data.user));
				}
			} else {
				activeModal("Error al intentar registrar al usuario.", 2500)
			}
		} catch (error) {
			activeModal("Error al intentar registrar al usuario.", 2500)
		}
	};

	const formDetail = [
		{ type: 'text', name: 'username', value: formData.username, onChange: handleChange, required: true, placeholder: 'Nombre de usuario (requerido)' },
		{ type: 'text', name: 'name', value: formData.name, onChange: handleChange, required: false, placeholder: 'Nombre completo' },
		{ type: 'email', name: 'email', value: formData.email, onChange: handleChange, required: false, placeholder: 'Correo electronico' },
		{ type: 'text', name: 'phone', value: formData.phone, onChange: handleChange, required: true, placeholder: 'Telefono (requerido)' },
		{ type: 'text', name: 'address', value: formData.address, onChange: handleChange, required: false, placeholder: 'Dirección' },
	]

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2 className="text-2xl font-bold text-gray-700">Registro de usuario</h2>

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
					buttonText="Registro"
				/>

			</div>
		</div>
	);
};


export { UserRegister };
