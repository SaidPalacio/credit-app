import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/register">Registrar</a> |
      <a routerLink="/credits">Ver Créditos</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}
