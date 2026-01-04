import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para usar ngModel

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], // Solo FormsModule
  templateUrl: './cita-form.component.html',
})
export class CitaFormComponent {
  @Output() onAgregar = new EventEmitter<{frase: string, autor: string}>();

  // Objeto simple para guardar lo que se escribe
  nuevaCita = {
    frase: '',
    autor: ''
  };

  agregarCita() {
    // emitir la copia del objeto
    this.onAgregar.emit({ ...this.nuevaCita });
    
    // limpiar los campos después de guardar
    this.nuevaCita.frase = '';
    this.nuevaCita.autor = '';
  }
}