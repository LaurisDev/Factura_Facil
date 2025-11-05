import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.html',
  styleUrls: ['./documentos.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, NgFor]
})
export class Documentos {
  query: string = '';
  documentos: any[] = [];
  cargando = false;
  error: string | null = null;

  // Usar el proxy de Angular en desarrollo o la ruta relativa para producción
  // El proxy (`/api`) está configurado para redirigir a http://localhost:3000
  apiUrl = '/api/facturas';

  constructor(private http: HttpClient) {}

  buscarFacturas() {
    if (!this.query.trim()) {
      this.documentos = [];
      this.error = null;
      return;
    }

    this.cargando = true;
    this.error = null;

  // Busca facturas usando el proxy y codifica el término de búsqueda
  this.http.get<any[]>(`${this.apiUrl}/buscar?query=${encodeURIComponent(this.query.trim())}`).subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos desde el backend:', data);
        this.documentos = data;
        this.cargando = false;

        if (data.length === 0) {
          this.error = 'No se encontraron resultados.';
        }
      },
      error: (err) => {
        console.error('❌ Error al buscar facturas:', err);
        this.error = 'Error al buscar facturas.';
        this.cargando = false;
      },
    });
  }

  descargarPDF(id: string) {
    // 🔹 Endpoint de descarga de facturas
    this.http.get(`${this.apiUrl}/descargar/${id}`, { responseType: 'blob' }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `factura-${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('❌ Error al descargar PDF:', err);
        this.error = 'Error al descargar el PDF.';
      },
    });
  }
}
