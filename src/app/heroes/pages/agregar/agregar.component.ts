import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  imt {
    width: 100%;
    border-radius: 5px;
  }`
  ]
})
export class AgregarComponent implements OnInit {

  published = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };

  constructor(private heroeService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroeService.getHeroeById(id))
      )
      .subscribe(response => this.heroe = response);
  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      // Actualizar
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(response => {
          console.log('Héroe actualizado: ', response);
        });
    } else {
      // Crear
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(response => {
          this.router.navigate(['/heroes/editar', response.id]);
        });
    }
  }

}
