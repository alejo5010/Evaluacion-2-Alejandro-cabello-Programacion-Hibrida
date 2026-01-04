import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // 1. Importar esto
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,], // 2. Agregarlo aquí
})
export class AppComponent {
  constructor() {}
}