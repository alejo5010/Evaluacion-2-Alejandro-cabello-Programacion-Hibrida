import { Injectable } from '@angular/core';
import { cita } from '../models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  // Lista inicial de citas (Datos literales/hardcoded para la Actividad 1)
  private listaCitas: Cita[] = [
    { frase: "El éxito es aprender a ir de fracaso en fracaso sin desesperarse", autor: "Winston Churchill" },
    { frase: "No hay camino para la paz, la paz es el camino", autor: "Mahatma Gandhi" },
    { frase: "Pienso, luego existo", autor: "René Descartes" }
  ];

  constructor() { }

  // 1. Obtener todas las citas
  obtenerCitas(): Cita[] {
    return this.listaCitas;
  }

  // 2. Obtener una cita aleatoria (Para la página de inicio)
  obtenerCitaAleatoria(): Cita {
    const indice = Math.floor(Math.random() * this.listaCitas.length);
    return this.listaCitas[indice];
  }

  // 3. Agregar una nueva cita
  agregarCita(nuevaCita: Cita) {
    this.listaCitas.push(nuevaCita);
  }

  // 4. Eliminar una cita
  eliminarCita(cita: Cita) {
    this.listaCitas = this.listaCitas.filter(c => c !== cita);
  }
}