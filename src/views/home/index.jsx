import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiService } from '../../services/apiService';
import { setUser } from '../../store/userSlice';

const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		const fetchData = async () => {
			if (localStorage.getItem('token') && !user.user) {
				const res = await apiService.get('user/getbytoken');
				if (res.status != 401) {
					const data = await res.json();
					dispatch(setUser(data.user));
				}
			}
		};
		fetchData();
	}, []);

	return (
		<div className="flex flex-col min-h-[80vh] justify-center items-center overflow-hidden">
			<img src="/warehouse.jpg" alt="warehouse" style={{ minHeight: "80vh", width: "auto", objectFit: "cover" }} />
		</div>

	);
};

export { Home };
