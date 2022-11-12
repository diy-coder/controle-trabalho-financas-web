import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { FluxoDeCaixaModel } from 'src/app/models/fluxoDeCaixaModel';

@Injectable({ providedIn: 'root' })
export class FluxoDeCaixaService {
  private dbPath = '/fluxo_de_caixa';

  projetosRef!: AngularFirestoreCollection<FluxoDeCaixaModel>;

  constructor(private store: AngularFirestore) {
    this.projetosRef = store.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<FluxoDeCaixaModel> {
    return this.projetosRef;
  }

  getById(identifier: string): AngularFirestoreDocument<FluxoDeCaixaModel> {
    return this.projetosRef.doc(identifier);
  }

  save(fluxoDeCaixaModel: FluxoDeCaixaModel): Promise<DocumentReference<FluxoDeCaixaModel>> {
    return this.projetosRef.add({ ...fluxoDeCaixaModel });
  }

  update(id: string, fluxoDeCaixaModel: FluxoDeCaixaModel): Promise<void> {
    return this.projetosRef.doc(id).update(fluxoDeCaixaModel);
  }

  delete(id: string): Promise<void> {
    return this.projetosRef.doc(id).delete();
  }
}
