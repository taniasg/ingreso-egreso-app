import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';
import { isLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoEgresoForm: FormGroup;
  tipo: string = 'ingreso';
  loading: boolean = false;

  loadingSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.loadingSub = this.store
      .select('ui')
      .subscribe(({ isLoading }) => {
        this.loading = isLoading
      })
  }

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

  guardar() {
    this.store.dispatch(ui.isLoading());
    setTimeout(() => {

    }, 2500);
    if (this.ingresoEgresoForm.invalid) return;

    const { descripcion, monto } = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo)
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(ui.stopLoading());
        this.ingresoEgresoForm.reset();
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch(error => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', error.message, 'error');
      });
  }

}
