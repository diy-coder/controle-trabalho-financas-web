import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { MetaModel } from 'src/app/models/metaModel';

@Injectable({ providedIn: 'root' })
export class MetaService {
  private dbPath = '/metas';

  projetosRef!: AngularFirestoreCollection<MetaModel>;

  constructor(private store: AngularFirestore) {
    this.projetosRef = store.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<MetaModel> {
    return this.projetosRef;
  }

  getById(identifier: string): AngularFirestoreDocument<MetaModel> {
    return this.projetosRef.doc(identifier);
  }

  save(metaModel: MetaModel): Promise<DocumentReference<MetaModel>> {
    return this.projetosRef.add({ ...metaModel });
  }

  update(id: string, metaModel: MetaModel): Promise<void> {
    return this.projetosRef.doc(id).update(metaModel);
  }

  delete(id: string): Promise<void> {
    return this.projetosRef.doc(id).delete();
  }
}
