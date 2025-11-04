//centralizar las llamadas al backend}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTO que el backend espera
export interface CreateFacturaDto {
  tipo: 'FV-1' | 'FV-2';
  numero: string;
  cliente: string;
  contacto: string;
  fechaCreacion: string; 
  producto: 'CAJA_BUEN_SABOR' | 'CAJA_BUEN_DECANA';
  descripcion?: string;
  cantidad: number;
  formaPago: 'EFECTIVO' | 'TRANSFERENCIA';
}

@Injectable({ providedIn: 'root' })
export class FacturasService {
  // usamos el proxy: '/api' redirige al backend http://localhost:3000
  private base = '/api/facturas';

  constructor(private http: HttpClient) {}

  createFactura(dto: CreateFacturaDto): Observable<any> {
    return this.http.post(this.base, dto);
  }

  listFacturas(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }
}
