import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  // reactive form
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>('')
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(private heroService: HeroesService, private activateRoute: ActivatedRoute, private router: Router) { }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.heroService.getHeroById(id))
      ).subscribe(hero => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }
        else {
          return this.heroForm.reset(hero);
        }
      });
  }

  onSubmit() {
    if (this.heroForm.invalid) {
      return;
    }

    if (this.currentHero.id) {
      this.updateHero();
    }
    else {
      this.createHero();
    }
  }

  // update hero
  private updateHero() {
    this.heroService.updateHero(this.currentHero)
      .subscribe(hero => {
        // TODO: show message
        console.log('updated', hero);
      });
  }

  // create hero
  private createHero() {
    this.heroService.createHero(this.currentHero)
      .subscribe(hero => {
        // TODO: show message and redirect to /heroes/edit/:id
        console.log('created', hero)
      });
  }


}
