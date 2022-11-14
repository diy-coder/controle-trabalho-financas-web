import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
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

  getAll(): AngularFirestoreCollection<ClienteModel> {
    return this.clientesRef;
  }

  getById(identifier: string): AngularFirestoreDocument<ClienteModel> {
    return this.clientesRef.doc(identifier);
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
