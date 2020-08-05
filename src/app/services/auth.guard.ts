import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap(estado => {
          !estado && this.router.navigate(['/login'])
        })
      );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap(estado => {
          !estado && this.router.navigate(['/login'])
        }),
        take(1)
      );
  }

}
