// Define todas las rutas (URLs) que la aplicación puede usar
// En Angular, las rutas determinan qué componente se muestra dependiendo de la dirección (path) que el usuario visite en el navegador.

import { Routes } from '@angular/router';
import { HomeLanding } from './pages/home-landing/home-landing'; // Página principal
import { AuthGuard } from './guards/auth-guard';


export const routes: Routes = [
  // Si no hay nada en la URL, muestra la página de inicio
  { path: "", component: HomeLanding },

  // Ruta para registro
  {
    path: "register",
    loadComponent: () =>
      import("./pages/register/register").then((m) => m.Register),
  },

  // Ruta para login
  {
    path: "login",
    loadComponent: () =>
      import("./pages/login/login").then((m) => m.Login),
  },

  // 🔒 Ruta protegida: solo accesible si el usuario ha iniciado sesión
  {
    path: "dashboard",
    canActivate: [AuthGuard], // protege esta ruta
    loadComponent: () =>
      import("./pages/dashboard/dashboard").then((m) => m.Dashboard),
  },

  // Si la ruta no existe, redirige al inicio
  { path: "**", redirectTo: "" },
];
