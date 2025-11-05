import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CreateFacturaDto, FacturasService } from '../../services/facturas.service';

// Opciones visibles para select------------------------------------
const TIPO_FACTURA_OPTIONS = [
  { value: 'FV-1', label: 'FV-1 · Factura de venta No' },
  { value: 'FV-2', label: 'FV-2 · Factura electrónica' },
] as const;

const PRODUCT_OPTIONS = [
  { value: 'CAJA_BUEN_SABOR', label: 'Caja de panela Buen Sabor', unitPrice: 128 },
  { value: 'CAJA_BUEN_DECANA', label: 'Caja de panela Buen de Caña', unitPrice: 135 },
] as const;

const FORMA_PAGO_OPTIONS = [
  { value: 'EFECTIVO', label: 'Efectivo' },
  { value: 'TRANSFERENCIA', label: 'Transferencia' },
] as const;
//-------------------------------------------------------------------

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './facturas.html',
  styleUrl: './facturas.scss',
})
export class CrearFacturaComponent {
  loading = false;

  //Estas constantes se cargan inmediatamente
  readonly tipoOptions = TIPO_FACTURA_OPTIONS;
  readonly productoOptions = PRODUCT_OPTIONS;
  readonly formaPagoOptions = FORMA_PAGO_OPTIONS;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: FacturasService,
    private router: Router
  ) {

    this.form = this.fb.group({
      tipo: [null, [Validators.required]],
      numero: ['', [Validators.required, Validators.maxLength(50)]],
      cliente: ['', [Validators.required, Validators.maxLength(150)]],
      contacto: ['', [Validators.required, Validators.maxLength(50)]],
      fechaCreacion: ['', [Validators.required]],
      producto: [null, [Validators.required]],
      descripcion: [''],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      formaPago: [null, [Validators.required]],
    });
  }

  get c() {
    return this.form.controls as {
      tipo: FormControl<string | null>;
      numero: FormControl<string>;
      cliente: FormControl<string>;
      contacto: FormControl<string>;
      fechaCreacion: FormControl<string>;
      producto: FormControl<string | null>;
      descripcion: FormControl<string>;
      cantidad: FormControl<number>;
      formaPago: FormControl<string | null>;
    };
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload: CreateFacturaDto = {
      tipo: this.form.value.tipo as 'FV-1' | 'FV-2',
      numero: this.form.value.numero!,
      cliente: this.form.value.cliente!,
      contacto: this.form.value.contacto!,
      fechaCreacion: this.form.value.fechaCreacion!,
      producto: this.form.value.producto as 'CAJA_BUEN_SABOR' | 'CAJA_BUEN_DECANA',
      descripcion: this.form.value.descripcion || undefined,
      cantidad: this.form.value.cantidad!,
      formaPago: this.form.value.formaPago as 'EFECTIVO' | 'TRANSFERENCIA',
    };

    this.api.createFactura(payload).subscribe({
      next: (facturaCreada) => {
        this.loading = false;
        alert(`Factura creada ✅\nTotal: ${facturaCreada?.valorTotal ?? '(sin total)'}`);
        this.router.navigateByUrl('/facturas');
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || 'Error creando la factura';
        alert(msg);
      },
    });
  }
}