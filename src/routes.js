
import { BiHomeAlt2 } from "react-icons/bi";
import { FaTruck, FaWineBottle, FaUsers } from "react-icons/fa";
import { MdOutlineStorage, MdContactPhone } from "react-icons/md";

export const routes = [
  {
    title: "Inicio",
    path: "/",
    Icon: BiHomeAlt2,
  },
  {
    title: "Ventas",
    path: "/orders",
    Icon: FaTruck,
  },

  {
    title: "Productos",
    path: "/items",
    Icon: FaWineBottle,
  },
  {
    title: "Contactos",
    path: "/contacts",
    Icon: MdContactPhone,
  },
  {
    title: "Usuarios",
    path: "/users",
    Icon: FaUsers,
  },
  {
    title: "Instrucciones",
    path: "/instructions",
    Icon: MdOutlineStorage,
  }

];