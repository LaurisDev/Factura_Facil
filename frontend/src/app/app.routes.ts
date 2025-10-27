//efine todas las rutas (URLs) que la aplicacion puede usar
//En Angular, las rutas determinan qué componente se muestra dependiendo de la dirección (path) que el usuario visite en el navegador.

import { Routes } from '@angular/router';
import { HomeLanding } from './pages/home-landing/home-landing';//pagina principal

export const routes: Routes = [
//si no hay nada en la URL muestra la pag de inicio
  { path: "", component: HomeLanding },     //cuando el usuario entra a la ruta carga el homelangind de primeras
  {
    path: "register",                      //cuando el usuario entra a esta ruta register ahi se carga, antes NO
    loadComponent: () =>
      import("./pages/register/register").then((m) => m.Register),
  },

  {
    path: "login",
    loadComponent: () =>
      import("./pages/login/login").then((m) => m.Login),
  },
  
  { path: "**", redirectTo: "" },
];