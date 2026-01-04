import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita.model';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioPage implements OnInit {

  citaAleatoria: Cita | null = null;
  cita: any; // Mantengo tu variable 'cita' por si la usas en el HTML

  // Cambio a 'public' para que el HTML pueda leer el switch borrarEnInicio
  constructor(public citasService: CitasService) { }

  ngOnInit() {
    this.siguiente(); // Usamos la función que ya existe para cargar la primera
  }

  // Esta función es la que llama tu botón de borrar
  borrarCitaActual() {
    if (this.citaAleatoria) {
      this.citasService.eliminarCita(this.citaAleatoria);
      this.siguiente(); // Después de borrar, saltamos a la siguiente
    }
  }

  // Implementamos siguiente para que cambie la frase
  siguiente() {
    this.citaAleatoria = this.citasService.obtenerCitaAleatoria();
    this.cita = this.citaAleatoria; // Mantenemos ambas sincronizadas
  }

  // Estas las dejo implementadas por si cambias el nombre en el HTML
  cambiarCita() {
    this.siguiente();
  }

  borrar() {
    this.borrarCitaActual();
  }
}