import { Component } from '@angular/core';
import { NgFor, DatePipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor]
})
export class Facturas {
  facturas: any[] = [];
  factura = {
    numero: '',
    cliente: '',
    monto: 0,
    descripcion: '',
    fechaCreacion: '' // tipo texto
  };

  constructor(private http: HttpClient) {}

  registrarFactura() {
    if (!this.factura.numero || !this.factura.cliente || !this.factura.monto) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    // Si la fecha está vacía, la dejamos como texto del día actual
    if (!this.factura.fechaCreacion) {
      const fecha = new Date();
      this.factura.fechaCreacion = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
    }

    // Agregar al arreglo (o podrías hacer un POST al backend)
    this.facturas.push({ ...this.factura });

    // Limpiar formulario
    this.factura = {
      numero: '',
      cliente: '',
      monto: 0,
      descripcion: '',
      fechaCreacion: ''
    };
  }
}
