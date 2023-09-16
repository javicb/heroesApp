import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap, map } from 'rxjs';


const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthenticated()
    .pipe(
      tap(isAuthenticated => console.log('Authenticated', isAuthenticated)),
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          router.navigate(['./'])
        }
      }),
      map(isAuthenticated => !isAuthenticated)
    )
}

export const publicCanActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  return checkAuthStatus();
}


export const publicCanMatch: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  return checkAuthStatus();
}
