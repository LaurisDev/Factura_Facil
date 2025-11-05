import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Producto, PRODUCT_LABEL } from '../../constants';


@Component({
  selector: 'app-produccion',
  standalone: true,
  templateUrl: './produccion.html',
  styleUrls: ['./produccion.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})

export class ProduccionComponent implements OnInit {
  form!: FormGroup;
  list: any[] = [];
  editing = false;
  selectedId: string | null = null;
  search = '';

  // 👇 Enum de productos importado para usar en el <select>
  productos = Object.values(Producto);

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      producto: ['', Validators.required],
      cantidadProduccion: [0, [Validators.required, Validators.min(1)]],
      unidad: ['', Validators.required],
      observaciones: [''], // 👈 string en vez de array
    });

    this.loadData();
  }

  // 🔹 Cargar lista de producciones desde el backend
  loadData() {
    this.http
      .get<any[]>(`http://localhost:3000/produccion`)
      .subscribe((res) => (this.list = res));
  }

  // 🔹 Guardar o actualizar registro
  onSubmit() {
    const data = this.form.value;

    if (this.editing && this.selectedId) {
      this.http.put(`http://localhost:3000/produccion/${this.selectedId}`, data).subscribe(() => {
        this.loadData();
        this.cancelEdit();
      });
    } else {
      this.http.post('http://localhost:3000/produccion', data).subscribe(() => {
        this.loadData();
        this.form.reset();
      });
    }
  }


  // 🔹 Editar un registro existente
  edit(item: any) {
    this.form.patchValue(item);
    this.selectedId = item.id;
    this.editing = true;
  }

  // 🔹 Cancelar edición
  cancelEdit() {
    this.editing = false;
    this.selectedId = null;
    this.form.reset();
  }

  // 🔹 Eliminar registro
  delete(id: string) {
    if (confirm('¿Seguro que deseas eliminar este registro?')) {
      this.http.delete(`http://localhost:3000/produccion/${id}`).subscribe(() => {
        this.loadData();
      });
    }
  }

  // 🔹 Exportar CSV (opcional)
  exportCSV() {
    const header = ['Producto', 'Cantidad', 'Unidad', 'Fecha', 'Observaciones'];
    const rows = this.list.map(p => [
      p.producto,
      p.cantidadProduccion,
      p.unidad,
      p.fecha,
      p.observaciones || ''
    ]);
    const csvContent = [header, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'produccion.csv';
    link.click();
  }
}
