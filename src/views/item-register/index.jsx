import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormRegister } from '../../components';


const ItemRegister = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const navigate = useNavigate()

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
		}, time)
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await apiService.postPut("POST", "item/register", formData);
			if (res.status === 201) {
				activeModal("Item registrado correctamente.", 1500)
				setTimeout(() => {
					navigate('/items')
				}, 1500)
			} else {
				activeModal("Error al registrar el item.", 2000)
			}
		} catch (error) {
			activeModal("Error al registrar el item.", 2000)
		}
	};

	const formDetail = [
		{ type: 'text', name: 'description', value: formData.description, onChange: handleChange, required: true, placeholder: 'Descripción del item (requerido)' },
		{ type: 'number', name: 'purchase_price', value: formData.purchase_price, onChange: handleChange, required: false, placeholder: 'Precio de compra.' },
		{ type: 'number', name: 'sale_price', value: formData.sale_price, onChange: handleChange, required: false, placeholder: 'Precio de venta.' },
		{ type: 'number', name: 'stock', value: formData.stock, onChange: handleChange, required: false, placeholder: 'stock.' },
	]

	return (
		<div className="py-4 md:py-6">
			<div className="flex flex-col text-center items-center">
				<h2 className="text-2xl font-bold text-gray-700">Registro de producto</h2>

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


export { ItemRegister };