import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI Componente] Loading');
export const stopLoading = createAction('[UI Componente] Stop loading');