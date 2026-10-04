import { Component, signal } from '@angular/core';
import { Footer } from './footer/footer';
import { Home } from './home/home';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Footer, Home, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('projectName');
}
