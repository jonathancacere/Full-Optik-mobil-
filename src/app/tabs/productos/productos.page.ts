import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';  

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: false
  
})
export class ProductosPage implements OnInit {

    productos = [
    {
      nombre: 'Lentes baron',
      precio: 34.000,
      imagen: '/assets/img/productos/baron2.PNG'
    },
    {
      nombre: 'Lentes aviador',
      precio: 34.000,
      imagen: '/assets/img/productos/lentebaron3.jpg'
    },
    {
      nombre: 'Lentes infantil',
      precio: 30.000,
      imagen: '/assets/img/productos/infantil4.PNG'
    },
    {
      nombre: 'Lentes sol dama',
      precio: 15.000,
      imagen: '/assets/img/productos/sol2.PNG'
    },
    {
      nombre: 'Lentes infantil',
      precio: 32.000,
      imagen: '/assets/img/productos/infantil3.PNG'
    },
    {
      nombre: 'Sobre lentes',
      precio: 30.000,
      imagen: '/assets/img/productos/sobrelentes.PNG'
    },
    {
      nombre: 'Lentes dama',
      precio: 25.000,
      imagen: '/assets/img/productos/lentes1.jpg'
    }
    
  ];

  constructor(private menu: MenuController) { }


  ngOnInit() {
        this.menu.close('mainMenu');
  }

}
