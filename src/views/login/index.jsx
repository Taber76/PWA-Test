import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { setUser } from '../../store/userSlice';
import { Modal } from '../../components';

const Login = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({ username: 'Administrador', password: '12345678Aa' }); // for testing
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
		}, time)
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.postPut('POST', 'user/login', formData);
			if (res.status === 202 || res.status === 302) {
				const data = await res.json();
				localStorage.setItem('token', data.token);
				dispatch(setUser(data.user));
				if (res.status === 302) {

					navigate('/users/password-change', { state: { user_id: data.user._id } })
					return
				}
				navigate('/')
			} else if (res.status === 401 || res.status === 404) {
				activeModal("Usuario o contraseña incorrecta.", 3000)
			} else {
				activeModal("Error interno del servidor, pruebe más tarde.", 3000)
			}
		} catch (error) {
			activeModal("Error interno del servidor, pruebe más tarde.", 3000)
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2>Login</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-2/3">

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

					<input
						className="bg-blue-100 text-xs rounded p-2"
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						required
						placeholder="Nombre de usuario o email..."
					/>

					<input
						className="bg-blue-100 text-xs rounded p-2"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						required
						placeholder="Contraseña..."
					/>

					<input type="submit" value="Ingresar" className="btn btn-primary py-2 rounded bg-blue-500 text-white" />
				</form>
			</div>
		</div>
	);
};

export { Login };

