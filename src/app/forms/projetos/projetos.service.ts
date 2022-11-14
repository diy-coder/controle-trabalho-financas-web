import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { TokenService } from 'src/app/core/token/token.service';
import { ProjetoModel } from 'src/app/models/projetoModel';

@Injectable({ providedIn: 'root' })
export class ProjetoService {
  private dbPath = '/projetos';

  projetosRef!: AngularFirestoreCollection<ProjetoModel>;
  userCreation: any;

  constructor(private store: AngularFirestore, tokenService: TokenService) {
    this.userCreation = tokenService.getDecodedToken().user_id;
    this.projetosRef = store.collection(this.dbPath, (ref) =>
      ref.where('user_creation', '==', this.userCreation)
    );
  }

  getAll(): AngularFirestoreCollection<ProjetoModel> {
    return this.projetosRef;
  }

  getById(identifier: string): AngularFirestoreDocument<ProjetoModel> {
    return this.projetosRef.doc(identifier);
  }

  save(projetoModel: ProjetoModel): Promise<DocumentReference<ProjetoModel>> {
    if (!projetoModel.user_creation || projetoModel.user_creation == '') {
      projetoModel.user_creation = this.userCreation;
    }
    return this.projetosRef.add({ ...projetoModel });
  }

  update(id: string, projetoModel: ProjetoModel): Promise<void> {
    return this.projetosRef.doc(id).update(projetoModel);
  }

  delete(id: string): Promise<void> {
    return this.projetosRef.doc(id).delete();
  }
}
