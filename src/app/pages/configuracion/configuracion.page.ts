import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfiguracionPage {

  constructor(public citasService: CitasService) { }

  // Cuando mueves el switch, se guarda el valor en el storage
  guardarCambio(evento: any) {
    const valor = evento.detail.checked;
    this.citasService.actualizarConfig(valor);
  }
}