import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login {
  LoginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router   // ← Inyectamos el Router
  ) {
    this.LoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get c() {
    return this.LoginForm.controls;
  }

  submit() {
    if (this.LoginForm.invalid) return;

    this.loading = true;
    const data = this.LoginForm.value;

    this.auth.login(data).subscribe({
      next: (res) => {
        // Guardamos el token en localStorage
        localStorage.setItem('token', res.access_token);

        alert('Inicio de sesión exitoso ✅');

        // Redirigimos al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert('Credenciales incorrectas ❌');
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
