import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CitasService } from '../../services/citas.service';
import { Cita } from '../../models/cita.model';
import { CitaFormComponent } from '../../components/cita-form/cita-form.component';
import { CitaListComponent } from '../../components/cita-list/cita-list.component';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  standalone: true,
  imports: [IonicModule, CommonModule, CitaFormComponent, CitaListComponent]
})
export class GestionPage implements OnInit {
  listaCitas: Cita[] = [];

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.listaCitas = this.citasService.obtenerCitas();
  }

  agregarNuevaCita(cita: Cita) {
    this.citasService.agregarCita(cita);
    this.listaCitas = this.citasService.obtenerCitas(); // Actualizamos la lista
  }

  borrarCita(cita: Cita) {
    this.citasService.eliminarCita(cita);
    this.listaCitas = this.citasService.obtenerCitas(); // Actualizamos la lista
  }
}