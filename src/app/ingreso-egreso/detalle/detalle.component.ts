import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  ingresoSubs: Subscription;

  constructor(
    private store: Store<AppStateWithIngreso>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.ingresoSubs = this.store
      .select('ingresoEgreso')
      .subscribe(({ items }) => {
        this.items = items;
      })
  }

  ngOnDestroy(): void {
    this.ingresoSubs?.unsubscribe()
  }

  eliminar(uid: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire('Borrado', 'Elemento borrado', 'success');
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      })
  }

}
