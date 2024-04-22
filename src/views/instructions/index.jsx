const Instructions = () => {


	return (
		<div className="container mx-auto p-4 bg-white m-4 rounded">
			<h1 className="text-3xl font-bold mb-4">Manual de Usuario</h1>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Introducción</h2>
				<p>La aplicación de gestión de órdenes de compra para una distribuidora permite a los usuarios crear, editar y gestionar órdenes de compra de clientes. Hay dos tipos de usuarios en el sistema: vendedores y administradores. Los vendedores pueden crear y editar órdenes de compra, mientras que solo los administradores pueden generar facturas.</p>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Registro de Usuarios</h2>
				<ul className="list-disc pl-4">
					<li>Se puede registrar un nuevo usuario ingresando sus datos.</li>
					<li>Por defecto, el usuario registrado será un vendedor.</li>
					<li>Solo un administrador puede cambiar el rol de un usuario.</li>
				</ul>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Autenticación</h2>
				<ul className="list-disc pl-4">
					<li>Los usuarios se autenticarán con su nombre de usuario y la contraseña predeterminada "Aa12345678".</li>
					<li>Después de iniciar sesión, se solicitará al usuario que actualice su contraseña.</li>
					<li>La nueva contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula y un número.</li>
				</ul>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Gestión de Productos y Contactos</h2>
				<ul className="list-disc pl-4">
					<li>Tanto vendedores como administradores pueden agregar y editar productos y contactos.</li>
					<li>Solo los administradores pueden borrar usuarios, contactos, productos u órdenes de compra.</li>
				</ul>
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-bold mb-2">Órdenes de Compra</h2>
				<ul className="list-disc pl-4">
					<li>Los vendedores solo pueden ver y editar las órdenes de compra creadas por ellos mismos.</li>
					<li>Los administradores pueden ver todas las órdenes de compra.</li>
					<li>Después de completar los datos necesarios en la orden de compra, se habilitarán los botones para guardar como borrador, generar orden y facturar.</li>
					<li>Solo los administradores pueden generar facturas.</li>
				</ul>
			</div>


			<p className="mt-8">¡Gracias por utilizar nuestra aplicación de gestión de órdenes de compra!</p>
		</div>

	);
};

export { Instructions };
