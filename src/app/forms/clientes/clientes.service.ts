import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentReference
} from '@angular/fire/compat/firestore';
import { map, Observable, tap } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import { ClienteModel } from 'src/app/models/clienteModel';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private dbPath = '/clientes';
  private userCreation;

  clientesRef!: AngularFirestoreCollection<ClienteModel>;

  constructor(store: AngularFirestore, tokenService: TokenService) {
    this.userCreation = tokenService.getDecodedToken().user_id;
    this.clientesRef = store.collection(this.dbPath, (ref) =>
      ref.where('user_creation', '==', this.userCreation)
    );
  }

  getAll(): Observable<any> {
    return this.clientesRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<ClienteModel>[]) =>
        changes.map((c: DocumentChangeAction<ClienteModel>) => ({
          ...c.payload.doc.data(),
          id: c.payload.doc.id,
        }))
      )
    );
  }

  getById(identifier: string): Observable<any> {
    return this.clientesRef.doc(identifier)
    .snapshotChanges().pipe(
      map((c)=> ({
        ...c.payload.data(),
        id: c.payload.id,
      }))
    );
  }

  save(clienteModel: ClienteModel): Promise<DocumentReference<ClienteModel>> {
    if (!clienteModel.user_creation || clienteModel.user_creation == '') {
      clienteModel.user_creation = this.userCreation;
    }

    return this.clientesRef.add({ ...clienteModel });
  }

  update(id: string, clienteModel: ClienteModel): Promise<void> {
    return this.clientesRef.doc(id).update(clienteModel);
  }

  delete(id: string): Promise<void> {
    return this.clientesRef.doc(id).delete();
  }
}
