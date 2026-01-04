import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Cita } from '../models/cita.model';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CitaFormComponent {
  frase: string = '';
  autor: string = '';

  @Output() onAgregar = new EventEmitter<Cita>();

  ejecutarAgregar() {
    if (this.frase && this.autor) {
      this.onAgregar.emit({ frase: this.frase, autor: this.autor });
      this.frase = '';
      this.autor = '';
    }
  }
}