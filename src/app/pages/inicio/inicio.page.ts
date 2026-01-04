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

  constructor(private citasService: CitasService) { }

  ngOnInit() {
    this.citaAleatoria = this.citasService.obtenerCitaAleatoria();
  }
}