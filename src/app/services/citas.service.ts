import { Injectable } from '@angular/core';
import { Cita } from '../models/cita.model';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  agregarCita(evento: any) {
    throw new Error('Method not implemented.');
  }
  public listaCitas: Cita[] = [];
  public borrarEnInicio: boolean = false;

  constructor() {
    this.cargarTodo();
  }

  async cargarTodo() {
    const config = await Preferences.get({ key: 'config_borrar' });
    this.borrarEnInicio = config.value ? JSON.parse(config.value) : false;

    const datos = await Preferences.get({ key: 'mis_citas' });
    if (datos.value) {
      this.listaCitas = JSON.parse(datos.value);
    } else {
      // 10 Citas al azar para cumplir con lo pedido
      this.listaCitas = [
        { frase: "Pienso, luego existo", autor: "René Descartes" },
        { frase: "La paz es el camino", autor: "Mahatma Gandhi" },
        { frase: "El éxito es ir de fracaso en fracaso sin desesperarse", autor: "Winston Churchill" },
        { frase: "Solo sé que nada sé", autor: "Sócrates" },
        { frase: "La imaginación es más importante que el conocimiento", autor: "Albert Einstein" },
        { frase: "No cuentes los días, haz que los días cuenten", autor: "Muhammad Ali" },
        { frase: "La vida es lo que pasa mientras haces otros planes", autor: "John Lennon" },
        { frase: "Haz de cada día tu obra maestra", autor: "John Wooden" },
        { frase: "La mejor forma de predecir el futuro es creándolo", autor: "Peter Drucker" },
        { frase: "Sé el cambio que quieres ver en el mundo", autor: "Mahatma Gandhi" }
      ];
      await this.guardarCitas();
    }
  }

  obtenerCitas(): Cita[] {
    return this.listaCitas;
  }

  obtenerCitaAleatoria(): Cita {
    const indice = Math.floor(Math.random() * this.listaCitas.length);
    return this.listaCitas[indice];
  }

  async eliminarCita(cita: Cita) {
    this.listaCitas = this.listaCitas.filter(c => c.frase !== cita.frase);
    await this.guardarCitas();
  }

  async guardarCitas() {
    await Preferences.set({ key: 'mis_citas', value: JSON.stringify(this.listaCitas) });
  }

  // Esta función la usará el Switch de Configuración
  async actualizarConfig(valor: boolean) {
    this.borrarEnInicio = valor;
    await Preferences.set({ key: 'config_borrar', value: JSON.stringify(valor) });
  }
}