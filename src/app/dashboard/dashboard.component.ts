import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as ingresoEgreso from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;
  ingresoEgresoSubs: Subscription;

  items: IngresoEgreso[]

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('user')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(({ user }) => {
        this.ingresoEgresoSubs =  this.ingresoEgresoService.initIngresoEgresoListener(user.uid)
          .subscribe(ingresosEgresos => {
            this.store.dispatch(ingresoEgreso.setItems({ items: ingresosEgresos }))
          })
      })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.ingresoEgresoSubs.unsubscribe();
  }

}
