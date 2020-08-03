import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';

export const setUser = createAction(
    '[Auth] Set user',
    props<{ user: Usuario }>()
);

export const unsetUser = createAction(
    '[Auth] Unset user'
);