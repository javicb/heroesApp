import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  busqueda = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(): void {
    this.heroesService.getSugerencias(this.busqueda.trim())
      .subscribe(response => this.heroes = response);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.busqueda = heroe.superhero;

    this.heroesService.getHeroeById(heroe.id!)
      .subscribe(response => this.heroeSeleccionado = response);
  }

}
