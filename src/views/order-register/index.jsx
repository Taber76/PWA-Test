import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormOrder } from '../../components';

const OrderRegister = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const navigate = useNavigate()

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
			navigate('/orders')
		}, time)
	}

	// For children update order
	const handleFillForm = (newForm) => {
		setFormData(newForm);
	};

	// Submit when formData is updated and not empty
	useEffect(() => {
		if (Object.keys(formData).length > 0) {
			handleSubmit();
		}
	}, [formData]);


	const handleSubmit = async () => {
		try {
			const res = await apiService.postPut('POST', 'order/register', formData)
			if (res.status === 201) {
				activeModal("Orden registrada correctamente.", 1500)
			} else {
				activeModal("Error al intentar registrar la orden.", 2500)
			}
		} catch (error) {
			activeModal("Error al intentar registrar la orden.", 2500)
		}
	};


	return (
		<div className="py-4 md:py-6 bg-gray-100">
			<div className="flex flex-col text-center items-center">
				<h2 className="text-2xl font-bold text-gray-700 mb-4">Registro de orden de compra</h2>

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

				<FormOrder
					handleFillForm={handleFillForm}
				/>

			</div>
		</div>
	);
};


export { OrderRegister };
