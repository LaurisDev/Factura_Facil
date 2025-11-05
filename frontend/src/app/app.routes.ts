// Define todas las rutas (URLs) que la aplicación puede usar
// En Angular, las rutas determinan qué componente se muestra dependiendo de la dirección (path) que el usuario visite en el navegador.

import { Routes } from '@angular/router';
import { HomeLanding } from './pages/home-landing/home-landing'; // página principal


export const routes: Routes = [
  // Si no hay nada en la URL, muestra la página de inicio
  { path: "", component: HomeLanding },

  {
    path: "register",
    loadComponent: () =>
      import("./pages/register/register").then((m) => m.Register),
  },

  {
    path: "login",
    loadComponent: () =>
      import("./pages/login/login").then((m) => m.Login),
  },

  // Dashboard principal
  {
    path: "dashboard",
    loadComponent: () =>
      import("./pages/dashboard/dashboard").then((m) => m.Dashboard),
  },

  // Secciones del dashboard
  {
    path: "facturas",
    loadComponent: () =>
      import("./pages/facturas/facturas").then((m) => m.CrearFacturaComponent),
  },

  {
    path: "produccion",
    loadComponent: () =>
      import("./pages/produccion/produccion").then((m) => m.ProduccionComponent),
  },

  {
    path: "documentos",
    loadComponent: () =>
      import("./pages/documentos/documentos").then((m) => m.Documentos),
  },

  // Si la ruta no existe, redirige a inicio
  { path: "**", redirectTo: "" },
];
