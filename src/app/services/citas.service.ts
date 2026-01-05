import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  // Actividad 1: Definimos el arreglo de citas y la variable de configuración
  // Usamos "any" para que sea más simple y no dependa de archivos externos
  public listaCitas: any[] = [];
  public borrarEnInicio: boolean = false;

  constructor() {
    this.cargarTodo();
  }

  // Actividad 3: Método para cargar datos desde el almacenamiento (Preferences)
  // Usamos async/await porque Preferences así lo requiere según el manual
  async cargarTodo() {
    // 1. Cargamos el switch de configuración
    const config = await Preferences.get({ key: 'config_borrar' });
    this.borrarEnInicio = config.value === 'true';

    // 2. Cargamos las citas guardadas
    const datos = await Preferences.get({ key: 'mis_citas' });
    
    if (datos.value) {
      // Si hay datos, los transformamos de texto a arreglo
      this.listaCitas = JSON.parse(datos.value);
    } else {
      // Actividad 1: Citas literales (hardcoded) para que la app no inicie vacía
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
      this.guardarEnMemoria();
    }
  }

  // Método simple para entregar las citas a la página de Gestión
  obtenerCitas() {
    return this.listaCitas;
  }

  // Actividad 1: Lógica para obtener una frase al azar
  obtenerCitaAleatoria() {
    const indice = Math.floor(Math.random() * this.listaCitas.length);
    return this.listaCitas[indice];
  }

  // Actividad 2: Método para añadir nuevas citas
  async agregarCita(nueva: any) {
    this.listaCitas.push(nueva);
    await this.guardarEnMemoria();
  }

  // Método para eliminar una cita específica
  async eliminarCita(cita: any) {
    // Filtramos el arreglo para quitar la cita seleccionada
    this.listaCitas = this.listaCitas.filter(c => c.frase !== cita.frase);
    await this.guardarEnMemoria();
  }

  // Actividad 3: Guarda el arreglo actual en la memoria 
  async guardarEnMemoria() { // Preferences requiere async/await el codigo lo exige de lo contrario el codigo da error
    await Preferences.set({
      key: 'mis_citas',
      value: JSON.stringify(this.listaCitas)
    });
  }

  // Guarda la preferencia del switch en Configuración
  async actualizarConfig(valor: boolean) {
    this.borrarEnInicio = valor;
    await Preferences.set({
      key: 'config_borrar',
      value: valor.toString()
    });
  }
}