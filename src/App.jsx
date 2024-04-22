import { Home, Contacts, ContactRegister, ContactUpdate, Login, Orders, OrderRegister, OrderUpdate, Users, UserRegister, UserUpdate, PasswordChange, ItemRegister, ItemUpdate, Items, Instructions } from './views';
import { NavBar, Footer } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App bg-gray-900">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/contacts" element={<Contacts />} />
					<Route path="/contacts/register" element={<ContactRegister />} />
					<Route path="/contacts/update" element={<ContactUpdate />} />
					<Route path="/instructions" element={<Instructions />} />
					<Route path="/items" element={<Items />} />
					<Route path="/items/register" element={<ItemRegister />} />
					<Route path="/items/update" element={<ItemUpdate />} />
					<Route path="/login" element={<Login />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/orders/register" element={<OrderRegister />} />
					<Route path="/orders/update" element={<OrderUpdate />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/register" element={<UserRegister />} />
					<Route path="/users/update" element={<UserUpdate />} />
					<Route path="/users/password-change" element={<PasswordChange />} />
				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
