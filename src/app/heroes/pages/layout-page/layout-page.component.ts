import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sideBarItems: any[] = [
    { label: 'Listado', icon: 'dashboard', path: './list' },
    { label: 'Añadir', icon: 'add', path: './add' },
    { label: 'Buscar', icon: 'search', path: './search' }
  ];


}
