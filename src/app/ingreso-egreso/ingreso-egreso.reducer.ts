import { createReducer, on } from '@ngrx/store';
import * as ingresoEgreso from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
    ingresoEgreso: State 
}

export const initialState: State = {
    items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(ingresoEgreso.setItems, (state, { items }) => ({ ...state, items: [...items] })),
    on(ingresoEgreso.unsetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}