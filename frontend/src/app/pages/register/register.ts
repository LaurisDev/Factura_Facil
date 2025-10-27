import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./register.html",
  styleUrls: ["./register.scss"],
})
export class Register {
  loading = false;
  RegisterForm: FormGroup = new FormGroup({
  
    name: new FormControl<string>("", { validators: [Validators.required], nonNullable: true }),
    email: new FormControl<string>("", { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl<string>("", { validators: [Validators.required, Validators.minLength(6)], nonNullable: true }),
  });

  constructor(private auth: AuthService, private router: Router) {}

  //esto es para facilitarnos a la hora de usar c.name / c.email / c.password en el HTML
  get c() {
    return this.RegisterForm.controls as {
      name: FormControl<string>;
      email: FormControl<string>;
      password: FormControl<string>;
    };
  }

  submit() {
    if (this.RegisterForm.invalid) {
      this.RegisterForm.markAllAsTouched(); // fuerza mostrar errores
      return;
    }

    this.loading = true;

    const payload = {
      name: this.c.name.value,       
      email: this.c.email.value,
      password: this.c.password.value,
    };

    this.auth.register(payload).subscribe({
      next: () => {
        this.loading = false;
        alert("Cuenta creada ");
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || "Error registrando";
        alert(msg);
      },
    });
  }
}