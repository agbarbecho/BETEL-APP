
//Rutas PARA LOGUEARSE
export const publicRoutes = [
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Register",
    path: "/register",
  },
]

// RUTAS PARA CUANDO YA SE HAYA LOGUEADO EL USUARIO
export const privateRoutes = [
  {
    name: "Patients",
    path: "/veterinario/patients",
  },
  {
    name: "New Patient",
    path: "/patients/new",
  },
  {
    name: "Profile",
    path: "/profile",
  },
  {
    name: "Users",
    path: "/users",
  },
  {
    name: "Clients",
    path: "/clients",
  },
  {
    name: "New Client",
    path: "/clients/new",
  },
];
