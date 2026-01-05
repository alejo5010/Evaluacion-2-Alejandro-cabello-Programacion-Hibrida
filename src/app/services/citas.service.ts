import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private listaCitas: Cita[] = [];
  public borrarEnInicio: boolean = false;

  constructor() {
    this.cargarTodo();
  }

  async cargarTodo() {
    // 1. Cargar Configuración del Switch
    const config = await Preferences.get({ key: 'config_borrar' });
    this.borrarEnInicio = config.value ? JSON.parse(config.value) : false;

    // 2. Cargar Citas
    const datos = await Preferences.get({ key: 'mis_citas' });
    if (datos.value) {
      this.listaCitas = JSON.parse(datos.value);
    } else {
      // 10 Citas iniciales para que la app no parta vacía
      this.listaCitas = [
        { frase: "El éxito consiste en ir de fracaso en fracaso", autor: "Churchill" },
        { frase: "Pienso, luego existo", autor: "Descartes" },
        { frase: "La paz comienza con una sonrisa", autor: "Teresa de Calcuta" },
        { frase: "Solo sé que nada sé", autor: "Sócrates" },
        { frase: "La imaginación lo es todo", autor: "Einstein" },
        { frase: "Hazlo o no lo hagas, pero no lo intentes", autor: "Yoda" },
        { frase: "El conocimiento es poder", autor: "Francis Bacon" },
        { frase: "Veni, vidi, vici", autor: "Julio César" },
        { frase: "La libertad es el derecho a decir lo que otros no quieren oír", autor: "Orwell" },
        { frase: "Un viaje de mil millas comienza con un paso", autor: "Lao Tsé" }
      ];
      await this.guardarEnMemoria();
    }
  }

  obtenerCitas() {
    return [...this.listaCitas]; // Devolvemos una copia para evitar errores de referencia
  }

  obtenerCitaAleatoria(): Cita {
    const indice = Math.floor(Math.random() * this.listaCitas.length);
    return this.listaCitas[indice];
  }

  async agregarCita(nueva: Cita) {
    this.listaCitas.push(nueva);
    await this.guardarEnMemoria();
  }

  async eliminarCita(cita: Cita) {
    this.listaCitas = this.listaCitas.filter(c => c.frase !== cita.frase);
    await this.guardarEnMemoria();
  }

  private async guardarEnMemoria() {
    await Preferences.set({ key: 'mis_citas', value: JSON.stringify(this.listaCitas) });
  }

  async actualizarConfig(valor: boolean) {
    this.borrarEnInicio = valor;
    await Preferences.set({ key: 'config_borrar', value: JSON.stringify(valor) });
  }
}