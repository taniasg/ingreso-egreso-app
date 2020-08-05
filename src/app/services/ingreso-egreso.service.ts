import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const { uid } = this.authService.user;

    delete ingresoEgreso.uid;

    return this.firestore.doc(`${uid}/ingreso-egreso`)
      .collection('items')
      .add({ ...ingresoEgreso })
      .then(ref => console.log('Done', ref))
      .catch(error => console.error(error))
  }

  initIngresoEgresoListener(uid: string) {
    return this.firestore.collection(`${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => 
          snapshot.map(doc => (
            {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data() as any
            }
          ))
        )
      );
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this.authService.user.uid;
    return this.firestore.doc(`${uid}/ingreso-egreso/items/${uidItem}`).delete();
  }
}
