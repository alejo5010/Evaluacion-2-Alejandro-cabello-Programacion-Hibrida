import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.scss'], // Asegúrate que esta línea exista o bórrala si no tienes el archivo .scss
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CitaListComponent {
  @Input() citas: Cita[] = []; // El error [citas] muere aquí
  @Output() onEliminarCita = new EventEmitter<Cita>();

  eliminar(cita: Cita) {
    this.onEliminarCita.emit(cita);
  }
}