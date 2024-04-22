import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormRegister } from '../../components';

const ContactRegister = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const navigate = useNavigate()

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
			navigate('/contacts')
		}, time)
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.postPut('POST', 'contact/register', formData)
			if (res.status === 201) {
				activeModal("Contacto registrado correctamente.", 1500)
			} else {
				activeModal("Error al intentar registrar el contacto.", 2500)
			}
		} catch (error) {
			activeModal("Error al intentar registrar el contacto.", 2500)
		}
	};

	const formDetail = [
		{ type: 'text', name: 'name', value: formData.name, onChange: handleChange, required: true, placeholder: 'Nombre completo (requerido)' },
		{ type: 'text', name: 'rut', value: formData.rut, onChange: handleChange, required: false, placeholder: 'RUT' },
		{ type: 'email', name: 'email', value: formData.email, onChange: handleChange, required: false, placeholder: 'Correo electronico' },
		{ type: 'text', name: 'phone', value: formData.phone, onChange: handleChange, required: true, placeholder: 'Telefono (requerido)' },
		{ type: 'text', name: 'address', value: formData.address, onChange: handleChange, required: false, placeholder: 'Dirección' },
	]

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2 className="text-2xl font-bold text-gray-700">Registro de contacto</h2>

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


export { ContactRegister };
