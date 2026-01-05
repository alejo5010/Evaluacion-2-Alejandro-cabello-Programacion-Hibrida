import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CitaFormComponent } from '../../cita-form/cita-form.component';
import { CitaListComponent } from '../../cita-list/cita-list.component';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    CitaFormComponent, 
    CitaListComponent // 
  ]
})
export class GestionPage implements OnInit {
  citasLocales: any[] = [];
  constructor(private servicio: CitasService) {}
  ngOnInit() { this.actualizar(); }
  alAgregar(evento: any) { this.servicio.agregarCita(evento); this.actualizar(); }
  alBorrar(evento: any) { this.servicio.eliminarCita(evento); this.actualizar(); }
  actualizar() { this.citasLocales = [...this.servicio.obtenerCitas()]; }
}