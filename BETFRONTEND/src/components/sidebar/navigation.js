import { FaHome, FaUserInjured, FaCog } from "react-icons/fa";


export const privateRoutes = [
  {
    name: "Inicio",
    path: "/home",
    icon: FaHome,
  },
  {
    name: "Pacientes",
    path: "/veterinario/patients",
    icon: FaUserInjured,
  },
  {
    name: "Administración",
    path: "/administration",
    icon: FaCog,
  },
];