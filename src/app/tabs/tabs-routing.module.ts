import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
       {
          path: 'Lente Adulto',
          loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
        },
        {
          path: 'Lente infantil',
          loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
        },
        {
          path: 'Sobre Lentes',
          loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
        }, 
        {
          path: 'Lentes de sol',
          loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
        },
        {
          path: '',
          redirectTo: '/tabs/productos',
          pathMatch: 'full'
        }
 
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
