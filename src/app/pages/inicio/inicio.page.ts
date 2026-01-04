import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class InicioPage implements OnInit {
  citaAleatoria: Cita | null = null;

  constructor(public citasService: CitasService) { }

  async ngOnInit() {
    // Esperamos a que el servicio cargue los datos de la memoria
    await this.citasService.cargarTodo();
    // Una vez cargados, pedimos la primera cita
    this.cambiarCita();
  }

  cambiarCita() {
    this.citaAleatoria = this.citasService.obtenerCitaAleatoria();
  }

  borrarCitaActual() {
    if (this.citaAleatoria) {
      this.citasService.eliminarCita(this.citaAleatoria);
      this.cambiarCita(); // Mostramos otra después de borrar
    }
  }
}