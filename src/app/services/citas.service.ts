import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';
import { Preferences } from '@capacitor/preferences'; // Paso 1: Importar el plugin

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private listaCitas: Cita[] = [
    { frase: "El éxito es aprender a ir de fracaso en fracaso sin desesperarse", autor: "Winston Churchill" },
    { frase: "No hay camino para la paz, la paz es el camino", autor: "Mahatma Gandhi" },
    { frase: "Pienso, luego existo", autor: "René Descartes" }
  ];

  // Variable para la configuración del switch
  public borrarEnInicio: boolean = false;

  constructor() {
    // Paso 2: Cargar datos apenas se inicie la App
    this.cargarDatos();
  }

  // --- Lógica de Persistencia ---

  async guardarDatos() {
    // Guarda el arreglo de citas
    await Preferences.set({
      key: 'citas_guardadas',
      value: JSON.stringify(this.listaCitas)
    });
    // Guarda la configuración del switch
    await Preferences.set({
      key: 'config_borrar',
      value: JSON.stringify(this.borrarEnInicio)
    });
  }

  async cargarDatos() {
    // Carga las citas
    const resCitas = await Preferences.get({ key: 'citas_guardadas' });
    if (resCitas.value) {
      this.listaCitas = JSON.parse(resCitas.value);
    }
    // Carga el switch
    const resConfig = await Preferences.get({ key: 'config_borrar' });
    this.borrarEnInicio = resConfig.value ? JSON.parse(resConfig.value) : false;
  }

  // --- Tus Funciones Originales Actualizadas ---

  obtenerCitas(): Cita[] {
    return this.listaCitas;
  }

  obtenerCitaAleatoria(): Cita {
    const indice = Math.floor(Math.random() * this.listaCitas.length);
    return this.listaCitas[indice];
  }

  async agregarCita(nuevaCita: Cita) {
    this.listaCitas.push(nuevaCita);
    await this.guardarDatos(); // Guardamos después de agregar
  }

  async eliminarCita(cita: Cita) {
    this.listaCitas = this.listaCitas.filter(c => c !== cita);
    await this.guardarDatos(); // Guardamos después de eliminar
  }

  // Nueva función para el Toggle de configuración
  async actualizarConfiguracion(valor: boolean) {
    this.borrarEnInicio = valor;
    await this.guardarDatos();
  }
}