import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { ProjetoModel } from 'src/app/models/projetoModel';

@Injectable({ providedIn: 'root' })
export class ProjetoService {
  private dbPath = '/projetos';

  projetosRef!: AngularFirestoreCollection<ProjetoModel>;

  constructor(private store: AngularFirestore) {
    this.projetosRef = store.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<ProjetoModel> {
    return this.projetosRef;
  }

  getById(identifier: string): AngularFirestoreDocument<ProjetoModel> {
    return this.projetosRef.doc(identifier);
  }

  save(projetoModel: ProjetoModel): Promise<DocumentReference<ProjetoModel>> {
    return this.projetosRef.add({ ...projetoModel });
  }

  update(id: string, projetoModel: ProjetoModel): Promise<void> {
    return this.projetosRef.doc(id).update(projetoModel);
  }

  delete(id: string): Promise<void> {
    return this.projetosRef.doc(id).delete();
  }
}
