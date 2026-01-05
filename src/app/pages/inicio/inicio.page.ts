import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioPage implements OnInit {

  citaAleatoria: Cita | null = null;

  constructor(public citasService: CitasService) { }

  async ngOnInit() {
    // Esperamos la carga de memoria
    await this.citasService.cargarTodo();
    this.siguiente();
  }

  siguiente() {
    this.citaAleatoria = this.citasService.obtenerCitaAleatoria();
  }

  borrarCitaActual() {
    if (this.citaAleatoria) {
      this.citasService.eliminarCita(this.citaAleatoria);
      this.siguiente();
    }
  }

  cambiarCita() {
    this.siguiente();
  }
}