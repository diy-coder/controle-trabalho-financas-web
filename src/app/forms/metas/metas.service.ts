import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { TokenService } from 'src/app/core/token/token.service';
import { MetaModel } from 'src/app/models/metaModel';

@Injectable({ providedIn: 'root' })
export class MetaService {
  private dbPath = '/metas';

  metaRef!: AngularFirestoreCollection<MetaModel>;
  userCreation: any;

  constructor(store: AngularFirestore, tokenService: TokenService) {
    this.userCreation = tokenService.getDecodedToken().user_id;
    this.metaRef = store.collection(this.dbPath, (ref) =>
      ref.where('user_creation', '==', this.userCreation)
    );
  }

  getAll(): AngularFirestoreCollection<MetaModel> {
    return this.metaRef;
  }

  getById(identifier: string): AngularFirestoreDocument<MetaModel> {
    return this.metaRef.doc(identifier);
  }

  save(metaModel: MetaModel): Promise<DocumentReference<MetaModel>> {
    if (!metaModel.user_creation || metaModel.user_creation == '') {
      metaModel.user_creation = this.userCreation;
    }
    return this.metaRef.add({ ...metaModel });
  }

  update(id: string, metaModel: MetaModel): Promise<void> {
    return this.metaRef.doc(id).update(metaModel);
  }

  delete(id: string): Promise<void> {
    return this.metaRef.doc(id).delete();
  }
}
