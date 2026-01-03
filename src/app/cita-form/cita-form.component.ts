import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Cita } from '../../models/cita.model'; 

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CitaFormComponent {
  nuevaFrase: string = '';
  nuevoAutor: string = '';

  @Output() onAgregarCita = new EventEmitter<Cita>();

  agregar() {
    if (this.nuevaFrase.trim() && this.nuevoAutor.trim()) {
      const nueva: Cita = { frase: this.nuevaFrase, autor: this.nuevoAutor };
      this.onAgregarCita.emit(nueva);
      this.nuevaFrase = '';
      this.nuevoAutor = '';
    }
  }
}