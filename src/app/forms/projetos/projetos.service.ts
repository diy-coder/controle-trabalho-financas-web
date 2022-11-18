import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { TokenService } from 'src/app/core/token/token.service';
import { ProjetoModel } from 'src/app/models/projetoModel';
import { DateTimeUtils } from 'src/app/utils/data-time.utils';

@Injectable({ providedIn: 'root' })
export class ProjetoService {
  private dbPath = '/projetos';

  projetosRef!: AngularFirestoreCollection<ProjetoModel>;
  userCreation: any;

  constructor(store: AngularFirestore, tokenService: TokenService) {
    this.userCreation = tokenService.getDecodedToken().user_id;
    this.projetosRef = store.collection(this.dbPath, (ref) =>
      ref.where('user_creation', '==', this.userCreation)
    );
  }

  getAll(): Observable<ProjetoModel[]> {
    return this.projetosRef.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<ProjetoModel>[]) =>
        changes.map((c: DocumentChangeAction<ProjetoModel>) => ({
          id: c.payload.doc.id,
          user_creation: c.payload.doc.data().user_creation,
          nome: c.payload.doc.data().nome,
          descricao: c.payload.doc.data().descricao,
          observacao: c.payload.doc.data().observacao,
          inicioPrevisto: DateTimeUtils.firebaseDateToDate(
            c.payload.doc.data().inicioPrevisto
          ),
          terminoPrevisto: DateTimeUtils.firebaseDateToDate(
            c.payload.doc.data().terminoPrevisto
          ),
          dificuldade: c.payload.doc.data().dificuldade,
          tecnologias: c.payload.doc.data().tecnologias,
          moeda: c.payload.doc.data().moeda,
          valorEstimado: c.payload.doc.data().valorEstimado,
        }))
      )
    );
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
