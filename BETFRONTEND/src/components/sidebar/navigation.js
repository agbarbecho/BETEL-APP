import { FaHome, FaUserInjured, FaCog, FaFileMedical } from "react-icons/fa";


export const privateRoutes = [
  {
    name: "Inicio",
    path: "/home",
    icon: FaHome,
  },
  {
    name: "Clientes",
    path: "/veterinario/patients",
    icon: FaFileMedical,
  },
  {
    name: "Administración",
    path: "/administration",
    icon: FaCog,
  },
];