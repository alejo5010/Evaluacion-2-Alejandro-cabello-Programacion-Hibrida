import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  standalone: true, 
  imports: [IonicModule, CommonModule]
})
export class CitaListComponent {
  @Input() lista: any[] = []; 
  @Output() onBorrar = new EventEmitter<any>();

  borrar(cita: any) {
    this.onBorrar.emit(cita);
  }
}