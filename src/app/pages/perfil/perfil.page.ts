import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  usuario = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    fechaRegistro: ''
  };

  constructor(
    private menu: MenuController,
    private router: Router,
    private alertController: AlertController
  ) {
    // Simulando datos del usuario (en una aplicación real estos vendrían del servicio de autenticación)
    this.usuario = {
      nombre: 'Pepe', // Nombre del usuario
      apellido: 'perez', // Apellido del usuario
      fechaNacimiento: '1990-01-01', // Fecha de nacimiento
      correo: 'pepe@email.com', // Correo electrónico
      telefono: '+56 9 1111 1111', // Teléfono
      direccion: 'Calle 123 # 45-67', // Dirección
      ciudad: 'Chile, Santiago', // Ciudad
      fechaRegistro: '2025-06-08' // Fecha de registro
    };
  }

  ngOnInit() {}

  cerrarSesion() {
    this.menu.close('mainMenu');
    this.router.navigate(['/login']);
  }
}
