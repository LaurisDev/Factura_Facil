import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeLanding } from './pages/home-landing/home-landing';

@Component({
  selector: 'app-root',
  // 👇 IMPORTANTE: importar RouterOutlet
  imports: [RouterOutlet, HomeLanding],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true, // si tu app raíz es standalone
})
export class App {
  protected readonly title = signal('frontend');
}
