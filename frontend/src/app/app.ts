import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeLanding } from './components/home-landing/home-landing';

@Component({
  selector: 'app-root',
  imports: [HomeLanding],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
