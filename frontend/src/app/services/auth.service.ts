//Centraliza llamadas HTTP (por ahora, register).
//Así el componente no habla “directo” con HttpClient, y tu app queda más ordenada.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//lo que espera el backend para el REGISTRO
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = "/api"; //  CON PROXY -> redirege a el backend  http://localhost:3000

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.base}/auth/register`, payload);
  }
}