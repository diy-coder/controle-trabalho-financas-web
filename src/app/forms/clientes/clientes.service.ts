import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { ClienteModel } from 'src/app/models/clienteModel';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private dbPath = '/clientes';

  clientesRef!: AngularFirestoreCollection<ClienteModel>;

  constructor(private store: AngularFirestore) {
    this.clientesRef = store.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<ClienteModel> {
    return this.clientesRef;
  }

  save(clienteModel: ClienteModel): Promise<DocumentReference<ClienteModel>> {
    return this.clientesRef.add({ ...clienteModel });
  }

  update(id: string, clienteModel: ClienteModel): Promise<void> {
    return this.clientesRef.doc(id).update(clienteModel);
  }

  delete(id: string): Promise<void> {
    return this.clientesRef.doc(id).delete();
  }
}
