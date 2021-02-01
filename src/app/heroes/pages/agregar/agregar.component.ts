import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
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

  constructor(private heroeService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router,
    private snackBar: MatSnackBar, public dialog: MatDialog) { }

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
          this.mostrarSnackbar('Héroe actualizado');
        });
    } else {
      // Crear
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe(response => {
          this.mostrarSnackbar('Héroe creado');
          this.router.navigate(['/heroes/editar', response.id]);
        });
    }
  }

  borrar(): void {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '350px',
      data: { ...this.heroe }
    });

    dialog.afterClosed().subscribe(
      result => {
        if (result) {
          this.heroeService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.mostrarSnackbar('Héroe borrado');
              this.router.navigate(['/heroes']);
            });
        }
      }
    );
  }

  mostrarSnackbar(mensaje: string): void {
    this.snackBar.open(mensaje, 'Aceptar', {
      duration: 2500
    });
  }



}
