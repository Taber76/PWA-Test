import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from 'flowbite-react';

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
				<h2 className="text-2xl font-bold text-gray-700">Login</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-1/3">

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

					<TextInput
						type="text"
						placeholder="Nombre de usuario o email..."
						required
						name="username"
						value={formData.username}
						onChange={handleChange}
						className='mb-2'
					/>

					<TextInput
						type="password"
						placeholder="Contraseña..."
						required
						name="password"
						value={formData.password}
						onChange={handleChange}
						className='mb-2'
					/>

					<div className="flex justify-evenly">
						<Button
							type="submit"
							gradientDuoTone="tealToLime"
							className="w-1/3"
						>
							INGRESAR
						</Button>
					</div>

				</form>
			</div>
		</div>
	);
};

export { Login };

