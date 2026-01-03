import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CitaListComponent {
  @Input() citas: Cita[] = [];
  @Output() onEliminarCita = new EventEmitter<Cita>();

  eliminar(cita: Cita) {
    this.onEliminarCita.emit(cita);
  }
}