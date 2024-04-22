import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { apiService } from '../../services/apiService';
import { Modal, FormOrder } from '../../components';

const OrderUpdate = () => {
	const [showModal, setShowModal] = useState(false);
	const [modalText, setModalText] = useState('');
	const [formData, setFormData] = useState({});
	const [updateData, setUpdateData] = useState(false);
	const navigate = useNavigate()
	const location = useLocation();

	const activeModal = (text, time) => {
		setShowModal(true);
		setModalText(text);
		setTimeout(() => {
			setShowModal(false);
			navigate('/orders')
		}, time)
	}

	// Get order data
	useEffect(() => {
		const getData = async () => {
			const res = await apiService.get(`order/getbyfield/_id/${location.state.item_id}`)
			if (res.status === 202) {
				const data = await res.json();
				setFormData(data.orders[0])
			} else {
				activeModal('Error al obtener los datos de la orden.', 2500)
			}
		}
		getData()
	}, [])

	// Save form data to api
	useEffect(() => {
		if (updateData) {
			handleSubmit()
		}
	}, [formData])

	// For children update order
	const handleFillForm = (newForm) => {
		setFormData(newForm);
		setUpdateData(true);
	};

	// To render children with updated data
	useEffect(() => {
		if (Object.keys(formData).length > 0) {
			//	console.log(formData, 'formData updated')
		}
	}, [formData]);


	// Submit when formData is updated
	const handleSubmit = async () => {
		try {
			const res = await apiService.postPut('PUT', `order/update/${location.state.item_id}`, formData)
			if (res.status === 202) {
				activeModal("Orden actualizada correctamente.", 1500)
			} else {
				activeModal("Error al intentar actualizar la orden.", 2500)
			}
		} catch (error) {
			activeModal("Error al intentar actualizar la orden.", 2500)
		}
	};


	return (
		<div className="py-4 md:py-6 bg-gray-100">
			<div className="flex flex-col text-center items-center">
				<h2 className="text-2xl font-bold text-gray-700 mb-3">Orden de compra</h2>

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

				{formData?.items &&
					<FormOrder
						handleFillForm={handleFillForm}
						formData={formData}//{{ client_name: 'Eleonora Escoceria', items: [], discount: 0 }}
						updateType={true}
					/>
				}

			</div>
		</div>
	);
};


export { OrderUpdate };
