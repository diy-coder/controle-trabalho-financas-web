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
import { FluxoDeCaixaModel } from 'src/app/models/fluxoDeCaixaModel';
import { DateTimeUtils } from 'src/app/utils/data-time.utils';

@Injectable({ providedIn: 'root' })
export class FluxoDeCaixaService {
  private dbPath = '/fluxo_de_caixa';

  fluxoRef!: AngularFirestoreCollection<FluxoDeCaixaModel>;
  userCreation: any;

  constructor(store: AngularFirestore, tokenService: TokenService) {
    this.userCreation = tokenService.getDecodedToken().user_id;
    this.fluxoRef = store.collection(this.dbPath, (ref) =>
      ref.where('user_creation', '==', this.userCreation)
    );
  }

  getAll(): Observable<any> {
    return this.fluxoRef
    .snapshotChanges()
    .pipe(
      map((changes: DocumentChangeAction<FluxoDeCaixaModel>[]) =>
        changes.map((c: DocumentChangeAction<FluxoDeCaixaModel>) => ({
          id: c.payload.doc.id,
          user_creation: c.payload.doc.data().user_creation,
          descricao: c.payload.doc.data().descricao,
          tipoOperacao: c.payload.doc.data().tipoOperacao,
          valor: c.payload.doc.data().valor,
          projeto: c.payload.doc.data().projeto,
          data: DateTimeUtils.firebaseDateToDate(c.payload.doc.data().data),
          style: c.payload.doc.data().tipoOperacao,
        }))
      )
    );
  }

  getById(identifier: string): AngularFirestoreDocument<FluxoDeCaixaModel> {
    return this.fluxoRef.doc(identifier);
  }

  save(
    fluxoDeCaixaModel: FluxoDeCaixaModel
  ): Promise<DocumentReference<FluxoDeCaixaModel>> {
    if (
      !fluxoDeCaixaModel.user_creation ||
      fluxoDeCaixaModel.user_creation == ''
    ) {
      fluxoDeCaixaModel.user_creation = this.userCreation;
    }
    return this.fluxoRef.add({ ...fluxoDeCaixaModel });
  }

  update(id: string, fluxoDeCaixaModel: FluxoDeCaixaModel): Promise<void> {
    return this.fluxoRef.doc(id).update(fluxoDeCaixaModel);
  }

  delete(id: string): Promise<void> {
    return this.fluxoRef.doc(id).delete();
  }
}
