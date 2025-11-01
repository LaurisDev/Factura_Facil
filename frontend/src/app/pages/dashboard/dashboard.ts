import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  cards = [
    {
      title: 'Registrar facturas',
      desc: 'Guarda tus facturas de forma segura y ordenada.',
      icon: '🧾',
      link: '/facturas',
    },
    {
      title: 'Organizar producción',
      desc: 'Sigue tu producción panelera día a día.',
      icon: '📋',
      link: '/produccion',
    },
    {
      title: 'Buscar y descargar',
      desc: 'Accede rápidamente a los documentos que necesitas.',
      icon: '🔍',
      link: '/documentos',
    },
  ];

  logout() {
  localStorage.clear();
}

}
